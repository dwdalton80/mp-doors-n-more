import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { FileDown, Loader2 } from "lucide-react";

export default function ReportGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState<"executive" | "detailed" | "conversion" | "custom">("executive");
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const { data: templatesData } = trpc.reports.getTemplates.useQuery();
  const generateReportMutation = trpc.reports.generateReport.useMutation();

  const handleMetricToggle = (metricId: string) => {
    setSelectedMetrics((prev) =>
      prev.includes(metricId) ? prev.filter((m) => m !== metricId) : [...prev, metricId]
    );
  };

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    try {
      const result = await generateReportMutation.mutateAsync({
        template: selectedTemplate,
        customMetrics: selectedTemplate === "custom" ? selectedMetrics : undefined,
      });

      if (result.success) {
        // Convert array back to Uint8Array and create blob
        const uint8Array = new Uint8Array(result.pdfBytes);
        const blob = new Blob([uint8Array], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = result.fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        setIsOpen(false);
      }
    } catch (error) {
      console.error("Failed to generate report:", error);
      alert("Failed to generate report. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 bg-[#a61c00] hover:bg-[#8b1600] text-white">
          <FileDown className="w-4 h-4" />
          Generate Report
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#1e3450]">Generate Custom Report</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Template Selection */}
          <div>
            <h3 className="text-lg font-semibold text-[#1e3450] mb-3">Select Report Template</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {templatesData?.templates.map((template) => (
                <Card
                  key={template.id}
                  className={`p-4 cursor-pointer transition border-2 ${
                    selectedTemplate === template.id
                      ? "border-[#a61c00] bg-red-50"
                      : "border-gray-200 hover:border-[#a61c00]"
                  }`}
                  onClick={() => {
                    setSelectedTemplate(template.id as any);
                    setSelectedMetrics([]);
                  }}
                >
                  <h4 className="font-semibold text-[#1e3450]">{template.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Custom Metrics Selection */}
          {selectedTemplate === "custom" && (
            <div>
              <h3 className="text-lg font-semibold text-[#1e3450] mb-3">Select Metrics to Include</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {templatesData?.availableMetrics.map((metric) => (
                  <div key={metric.id} className="flex items-center space-x-2 p-3 bg-gray-50 rounded">
                    <Checkbox
                      id={metric.id}
                      checked={selectedMetrics.includes(metric.id)}
                      onCheckedChange={() => handleMetricToggle(metric.id)}
                    />
                    <label htmlFor={metric.id} className="text-sm font-medium cursor-pointer">
                      {metric.label}
                    </label>
                  </div>
                ))}
              </div>
              {selectedMetrics.length === 0 && (
                <p className="text-sm text-amber-600 mt-2">Please select at least one metric</p>
              )}
            </div>
          )}

          {/* Report Preview */}
          <div>
            <h3 className="text-lg font-semibold text-[#1e3450] mb-3">Report Preview</h3>
            <Card className="p-4 bg-gray-50">
              <p className="text-sm text-gray-700">
                <strong>Template:</strong>{" "}
                {templatesData?.templates.find((t) => t.id === selectedTemplate)?.name}
              </p>
              {selectedTemplate === "custom" && (
                <p className="text-sm text-gray-700 mt-2">
                  <strong>Metrics:</strong>{" "}
                  {selectedMetrics.length > 0
                    ? selectedMetrics
                        .map(
                          (id) =>
                            templatesData?.availableMetrics.find((m) => m.id === id)?.label
                        )
                        .join(", ")
                    : "None selected"}
                </p>
              )}
              <p className="text-sm text-gray-700 mt-2">
                <strong>Format:</strong> PDF
              </p>
              <p className="text-sm text-gray-700 mt-2">
                <strong>Generated:</strong> {new Date().toLocaleDateString()}
              </p>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end pt-4">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isGenerating}
            >
              Cancel
            </Button>
            <Button
              onClick={handleGenerateReport}
              disabled={
                isGenerating ||
                (selectedTemplate === "custom" && selectedMetrics.length === 0)
              }
              className="bg-[#a61c00] hover:bg-[#8b1600] text-white flex items-center gap-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <FileDown className="w-4 h-4" />
                  Download PDF Report
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
