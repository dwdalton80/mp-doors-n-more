import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Product images table for managing product photos
 * Stores metadata and S3 URLs for product images across all categories
 */
export const productImages = mysqlTable("productImages", {
  id: int("id").autoincrement().primaryKey(),
  /** Product category: doors, windows, flooring, siding */
  category: mysqlEnum("category", ["doors", "windows", "flooring", "siding"]).notNull(),
  /** Product ID within the category (e.g., "entry-doors", "double-hung") */
  productId: varchar("productId", { length: 64 }).notNull(),
  /** Display name of the product */
  productName: varchar("productName", { length: 255 }).notNull(),
  /** S3 storage key for the image file */
  storageKey: varchar("storageKey", { length: 512 }).notNull(),
  /** Public CDN URL to the image */
  imageUrl: text("imageUrl").notNull(),
  /** MIME type of the image (e.g., "image/jpeg", "image/png") */
  mimeType: varchar("mimeType", { length: 64 }).default("image/jpeg"),
  /** File size in bytes */
  fileSize: int("fileSize"),
  /** User who uploaded the image */
  uploadedBy: int("uploadedBy").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ProductImage = typeof productImages.$inferSelect;
export type InsertProductImage = typeof productImages.$inferInsert;