import { useState } from "react";
import { sendQuoteRequest } from "@/lib/api";

export type QuoteFormData = { name: string; email: string; phone: string; message: string };

const EMPTY_FORM: QuoteFormData = { name: "", email: "", phone: "", message: "" };

/**
 * Shared "get a quote" modal state + submit logic for the special-order
 * product pages (StormDoorSpecialOrder, PatioDoorSpecialOrder, ...).
 */
export function useQuoteModal<T extends { id: string; title: string }>(products: T[]) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<T | null>(null);
  const [formData, setFormData] = useState<QuoteFormData>(EMPTY_FORM);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const open = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;
    setSelectedProduct(product);
    setIsOpen(true);
    setError("");
    setSuccess(false);
  };

  const close = () => setIsOpen(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setIsSubmitting(true);

    try {
      await sendQuoteRequest({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        message: formData.message || undefined,
        product: selectedProduct?.title,
      });

      setSuccess(true);
      setFormData(EMPTY_FORM);
      setTimeout(() => {
        setIsOpen(false);
        setSuccess(false);
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send quote request");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isOpen, selectedProduct, formData, setFormData, error, success, isSubmitting, open, close, submit };
}
