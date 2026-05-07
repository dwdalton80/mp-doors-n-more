import { Link } from "wouter";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="bg-gray-50 border-b border-gray-200">
      <div className="container px-4 py-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              {item.href ? (
                <Link href={item.href} className="text-[#a61c00] hover:text-[#8a1700] transition">
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-700">{item.label}</span>
              )}
              {index < items.length - 1 && (
                <ChevronRight size={16} className="text-gray-400" />
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
