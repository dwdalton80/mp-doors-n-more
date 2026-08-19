import { Loader2, X } from "lucide-react";
import type { QuoteFormData } from "@/hooks/useQuoteModal";

/**
 * Shared "get a quote" modal UI — pairs with the useQuoteModal hook.
 * Used by StormDoorSpecialOrder, PatioDoorSpecialOrder, and any future
 * special-order product page.
 */
export default function QuoteModal({
  productTitle,
  formData,
  onFormDataChange,
  error,
  success,
  isSubmitting,
  onClose,
  onSubmit,
}: {
  productTitle?: string;
  formData: QuoteFormData;
  onFormDataChange: (data: QuoteFormData) => void;
  error: string;
  success: boolean;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-lg max-w-md w-full" onClick={(e) => e.stopPropagation()}>
        <div className="bg-[#1e3450] text-white p-6 flex justify-between items-center">
          <h3 className="font-bold text-lg">Get Quote for {productTitle}</h3>
          <button onClick={onClose} className="p-1 hover:bg-[#152a3a] rounded transition-colors">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={onSubmit} className="p-6 space-y-4">
          {success && (
            <div className="p-3 bg-green-100 text-green-800 rounded text-sm">
              Quote request sent successfully! We'll be in touch soon.
            </div>
          )}
          {error && <div className="p-3 bg-red-100 text-red-800 rounded text-sm">{error}</div>}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => onFormDataChange({ ...formData, name: e.target.value })}
              disabled={isSubmitting}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1e3450] disabled:bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => onFormDataChange({ ...formData, email: e.target.value })}
              disabled={isSubmitting}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1e3450] disabled:bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => onFormDataChange({ ...formData, phone: e.target.value })}
              disabled={isSubmitting}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1e3450] disabled:bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Message</label>
            <textarea
              value={formData.message}
              onChange={(e) => onFormDataChange({ ...formData, message: e.target.value })}
              rows={4}
              disabled={isSubmitting}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1e3450] disabled:bg-gray-100"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#a61c00] hover:bg-[#8a1700] disabled:bg-gray-400 text-white font-bold py-2 rounded transition-colors flex items-center justify-center gap-2"
          >
            {isSubmitting && <Loader2 size={16} className="animate-spin" />}
            {isSubmitting ? "Sending..." : "Submit Quote Request"}
          </button>
        </form>
      </div>
    </div>
  );
}
