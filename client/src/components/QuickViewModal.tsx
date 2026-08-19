import { Star, X } from "lucide-react";

export type QuickViewProduct = {
  id: string;
  title: string;
  imageUrl: string;
  images?: string[];
  brand: string;
  description: string;
  features: string[];
  rating: number;
};

/**
 * Shared "quick view" modal UI — used by StormDoorSpecialOrder,
 * PatioDoorSpecialOrder, and any future special-order product page.
 * Falls back to a single-image gallery when `images` isn't provided, and
 * hides the thumbnail strip when there's nothing to switch between.
 */
export default function QuickViewModal({
  product,
  currentImageIndex,
  onSelectImage,
  onClose,
  onGetQuote,
  callPhone = "9034211305",
}: {
  product: QuickViewProduct;
  currentImageIndex: number;
  onSelectImage: (index: number) => void;
  onClose: () => void;
  onGetQuote: (productId: string) => void;
  callPhone?: string;
}) {
  const images = product.images && product.images.length > 0 ? product.images : [product.imageUrl];
  const activeImage = images[currentImageIndex] ?? images[0];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h3 className="font-display font-bold text-xl text-[#1a2e45]">{product.title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors md:p-1">
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image Section */}
            <div className="flex flex-col gap-4">
              <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center overflow-hidden">
                <img
                  key={activeImage}
                  src={activeImage}
                  alt={product.title}
                  className="w-full h-full object-contain transition-opacity duration-500"
                />
              </div>
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => onSelectImage(idx)}
                      className={`flex-shrink-0 px-3 py-2 rounded font-semibold text-sm transition-colors ${
                        currentImageIndex === idx
                          ? "bg-[#a61c00] text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details Section */}
            <div>
              <h4 className="font-display font-bold text-2xl text-[#1a2e45] mb-2">{product.title}</h4>
              <p className="text-[#a61c00] font-semibold mb-4">{product.brand}</p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i <= product.rating ? "fill-[#a61c00] text-[#a61c00]" : "text-gray-300"}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">{product.rating}</span>
              </div>

              <p className="text-gray-700 mb-6">{product.description}</p>

              {/* Features */}
              <div className="mb-6">
                <h5 className="font-semibold text-[#1a2e45] mb-3">Key Features:</h5>
                <ul className="space-y-2">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-gray-700 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#a61c00]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => (window.location.href = `tel:${callPhone}`)}
                  className="flex-1 bg-[#1e3450] hover:bg-[#152a3a] text-white px-4 py-3 rounded font-semibold transition-colors"
                >
                  Call Now
                </button>
                <button
                  onClick={() => {
                    onGetQuote(product.id);
                    onClose();
                  }}
                  className="flex-1 border-2 border-[#a61c00] text-[#a61c00] hover:bg-[#a61c00] hover:text-white px-4 py-3 rounded font-semibold transition-colors"
                >
                  Get Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
