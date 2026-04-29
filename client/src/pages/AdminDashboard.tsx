/*
 * AdminDashboard.tsx — MP Doors & More
 * Admin interface for managing product images
 * Features: Upload, view, update, delete product images
 */

import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, Upload, Trash2, ArrowLeft, AlertCircle } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import { getLoginUrl } from "@/const";

type Category = "doors" | "windows" | "flooring" | "siding";

const CATEGORIES: { value: Category; label: string }[] = [
  { value: "doors", label: "Doors" },
  { value: "windows", label: "Windows" },
  { value: "flooring", label: "Flooring" },
  { value: "siding", label: "Siding" },
];

// File validation constants
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export default function AdminDashboard() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<Category>("doors");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [fileError, setFileError] = useState<string>("");

  // Fetch images for selected category
  const { data: images, isLoading: imagesLoading, refetch, error: queryError } = trpc.productImages.getByCategory.useQuery(
    { category: selectedCategory },
    { enabled: !!user }
  );

  // Upload mutation
  const uploadMutation = trpc.productImages.upload.useMutation({
    onSuccess: () => {
      toast.success("Image uploaded successfully!");
      setUploadFile(null);
      setProductId("");
      setProductName("");
      setFileError("");
      refetch();
    },
    onError: (error) => {
      toast.error(`Upload failed: ${error.message}`);
    },
  });

  // Delete mutation
  const deleteMutation = trpc.productImages.delete.useMutation({
    onSuccess: () => {
      toast.success("Image deleted successfully!");
      refetch();
    },
    onError: (error) => {
      toast.error(`Delete failed: ${error.message}`);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError("");
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      setFileError(`Invalid file type. Allowed types: JPEG, PNG, WebP, GIF`);
      setUploadFile(null);
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setFileError(`File size exceeds 5MB limit. Current size: ${(file.size / 1024 / 1024).toFixed(2)}MB`);
      setUploadFile(null);
      return;
    }

    setUploadFile(file);
  };

  const handleUpload = async () => {
    setFileError("");
    if (!uploadFile || !productId || !productName) {
      toast.error("Please fill in all fields and select a file");
      return;
    }

    setIsUploading(true);
    try {
      const reader = new FileReader();
      reader.onerror = () => {
        setIsUploading(false);
        toast.error("Failed to read file");
      };
      reader.onload = async (event) => {
        try {
          const base64 = (event.target?.result as string).split(",")[1];
          if (!base64) {
            throw new Error("Failed to encode file");
          }
          await uploadMutation.mutateAsync({
            category: selectedCategory,
            productId,
            productName,
            imageData: base64,
            mimeType: uploadFile.type,
          });
        } catch (error) {
          toast.error(error instanceof Error ? error.message : "Upload failed");
        } finally {
          setIsUploading(false);
        }
      };
      reader.readAsDataURL(uploadFile);
    } catch (error) {
      setIsUploading(false);
      toast.error("Failed to process file");
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this image?")) {
      deleteMutation.mutate({ id });
    }
  };

  // Check authentication
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
        <Loader2 className="animate-spin text-[#a61c00]" size={32} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF7F2] px-4">
        <Card className="p-8 max-w-md">
          <h1 className="font-display font-bold text-2xl text-[#1a2e45] mb-4">Admin Access Required</h1>
          <p className="text-gray-600 mb-6">You need to be logged in to access the admin dashboard.</p>
          <a href={getLoginUrl()} className="inline-block btn-accent">
            Sign In
          </a>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] pt-32 pb-20">
      <div className="container">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-[#a61c00] font-display font-semibold hover:text-[#1a2e45] transition-colors mb-4">
            <ArrowLeft size={16} />
            Back to Home
          </Link>
          <h1 className="font-display font-black text-4xl text-[#1a2e45] mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage product images across all categories</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-white border border-[#e8e0d8]">
              <h2 className="font-display font-bold text-xl text-[#1a2e45] mb-4">Upload Image</h2>

              {/* Category Select */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-[#1a2e45] mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as Category)}
                  className="w-full px-3 py-2 border border-[#e8e0d8] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#a61c00]"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Product ID */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-[#1a2e45] mb-2">Product ID</label>
                <input
                  type="text"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  placeholder="e.g., entry-doors"
                  className="w-full px-3 py-2 border border-[#e8e0d8] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#a61c00]"
                />
              </div>

              {/* Product Name */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-[#1a2e45] mb-2">Product Name</label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="e.g., Entry Doors"
                  className="w-full px-3 py-2 border border-[#e8e0d8] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#a61c00]"
                />
              </div>

              {/* File Input */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-[#1a2e45] mb-2">Image File</label>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 border border-[#e8e0d8] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#a61c00]"
                />
                {uploadFile && <p className="text-xs text-gray-600 mt-1">{uploadFile.name} ({(uploadFile.size / 1024).toFixed(2)} KB)</p>}
                {fileError && (
                  <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-md flex items-start gap-2">
                    <AlertCircle size={16} className="text-red-600 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-red-600">{fileError}</p>
                  </div>
                )}
              </div>

              {/* Upload Button */}
              <Button
                onClick={handleUpload}
                disabled={isUploading || uploadMutation.isPending || !uploadFile || !!fileError}
                className="w-full bg-[#a61c00] hover:bg-[#8b1700] text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading || uploadMutation.isPending ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={16} />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload size={16} className="mr-2" />
                    Upload Image
                  </>
                )}
              </Button>
            </Card>
          </div>

          {/* Images List Section */}
          <div className="lg:col-span-2">
            <Card className="p-6 bg-white border border-[#e8e0d8]">
              <h2 className="font-display font-bold text-xl text-[#1a2e45] mb-4">
                {CATEGORIES.find((c) => c.value === selectedCategory)?.label} Images
              </h2>

              {queryError && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md flex items-start gap-3">
                  <AlertCircle size={18} className="text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-red-600">Error loading images</p>
                    <p className="text-xs text-red-600 mt-1">{queryError.message}</p>
                  </div>
                </div>
              )}

              {imagesLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="animate-spin text-[#a61c00]" size={32} />
                </div>
              ) : !images || images.length === 0 ? (
                <p className="text-gray-600 text-center py-8">No images uploaded for this category yet.</p>
              ) : images.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {images.map((image) => (
                    <div key={image.id} className="border border-[#e8e0d8] rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      {/* Image Thumbnail */}
                      <div className="relative h-40 bg-gray-100 overflow-hidden">
                        <img
                          src={image.imageUrl}
                          alt={image.productName}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Image Info */}
                      <div className="p-4 bg-[#FAF7F2]">
                        <h3 className="font-display font-semibold text-sm text-[#1a2e45] mb-1">
                          {image.productName}
                        </h3>
                        <p className="text-xs text-gray-600 mb-3">
                          ID: {image.productId}
                        </p>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleDelete(image.id)}
                            disabled={deleteMutation.isPending}
                            className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-1 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded transition-colors disabled:opacity-50"
                          >
                            {deleteMutation.isPending ? (
                              <Loader2 className="animate-spin" size={14} />
                            ) : (
                              <>
                                <Trash2 size={14} />
                                Delete
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
