/*
 * ProductImagePlaceholder Component
 * Reusable image placeholder for product cards with enhanced hover effects
 * Easy to swap with real images by passing imageUrl prop
 */

interface ProductImagePlaceholderProps {
  imageUrl?: string;
  title: string;
  alt?: string;
}

export default function ProductImagePlaceholder({
  imageUrl,
  title,
  alt = "Product image",
}: ProductImagePlaceholderProps) {
  return (
    <div className="relative h-64 overflow-hidden bg-gradient-to-br from-[#2D4A6B]/10 to-[#a61c00]/10 flex items-center justify-center border-b border-[#e8e0d8] group-hover:from-[#2D4A6B]/20 group-hover:to-[#a61c00]/20 transition-all duration-300 cursor-pointer">
      <style>{`
        @keyframes imageZoom {
          from { transform: scale(1); }
          to { transform: scale(1.12); }
        }
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        .group:hover .product-image {
          animation: imageZoom 600ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .group:hover .product-shimmer {
          animation: shimmer 800ms ease-in-out;
        }
      `}</style>
      {imageUrl ? (
        // Real image with enhanced hover effects
        <>
          <img
            src={imageUrl}
            alt={alt}
            className="product-image w-full h-full object-cover transition-transform duration-600"
          />
          {/* Gradient overlay that appears on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a2e45]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
          {/* Animated shimmer effect on hover */}
          <div className="product-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100" />
        </>
      ) : (
        // Placeholder content with enhanced hover
        <div className="text-center group-hover:scale-110 transition-transform duration-600 ease-out">
          <div className="text-[#2D4A6B] font-display font-bold text-2xl mb-2 group-hover:text-[#1a2e45] transition-colors duration-300">
            {title}
          </div>
          <div className="text-[#a61c00] text-sm font-label tracking-widest uppercase group-hover:text-[#8b1400] transition-colors duration-300">
            Product Image
          </div>
        </div>
      )}
    </div>
  );
}
