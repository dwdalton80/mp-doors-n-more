import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import {
  createProductImage,
  getProductImagesByCategory,
  getProductImage,
  updateProductImage,
  deleteProductImage,
} from "../db";
import { storagePut } from "../storage";
import { TRPCError } from "@trpc/server";

export const productImagesRouter = router({
  /**
   * Upload a new product image
   * Accepts base64 or buffer data, uploads to S3, and stores metadata in database
   */
  upload: protectedProcedure
    .input(
      z.object({
        category: z.enum(["doors", "windows", "flooring", "siding"]),
        productId: z.string().min(1),
        productName: z.string().min(1),
        imageData: z.string(), // base64 encoded image data
        mimeType: z.string().default("image/jpeg"),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        // Decode base64 to buffer
        const buffer = Buffer.from(input.imageData, "base64");

        // Upload to S3
        const storageKey = `product-images/${input.category}/${input.productId}-${Date.now()}`;
        const { url, key } = await storagePut(storageKey, buffer, input.mimeType);

        // Store metadata in database
        const image = await createProductImage({
          category: input.category,
          productId: input.productId,
          productName: input.productName,
          storageKey: key,
          imageUrl: url,
          mimeType: input.mimeType,
          fileSize: buffer.length,
          uploadedBy: ctx.user.id,
        });

        if (!image) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to save image metadata",
          });
        }

        return image;
      } catch (error) {
        console.error("[Product Images] Upload failed:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error instanceof Error ? error.message : "Upload failed",
        });
      }
    }),

  /**
   * Get all product images for a specific category
   */
  getByCategory: protectedProcedure
    .input(z.object({ category: z.enum(["doors", "windows", "flooring", "siding"]) }))
    .query(async ({ input }) => {
      try {
        return await getProductImagesByCategory(input.category);
      } catch (error) {
        console.error("[Product Images] Get by category failed:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch images",
        });
      }
    }),

  /**
   * Get a specific product image by ID
   */
  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      try {
        const image = await getProductImage(input.id);
        if (!image) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Image not found",
          });
        }
        return image;
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        console.error("[Product Images] Get by ID failed:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch image",
        });
      }
    }),

  /**
   * Update product image metadata
   */
  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        productName: z.string().optional(),
        mimeType: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const updated = await updateProductImage(input.id, {
          productName: input.productName,
          mimeType: input.mimeType,
        });

        if (!updated) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Image not found",
          });
        }

        return updated;
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        console.error("[Product Images] Update failed:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update image",
        });
      }
    }),

  /**
   * Delete a product image
   */
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      try {
        const success = await deleteProductImage(input.id);
        if (!success) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Image not found",
          });
        }
        return { success: true };
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        console.error("[Product Images] Delete failed:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete image",
        });
      }
    }),
});
