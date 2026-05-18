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

/**
 * Analytics events table for tracking user interactions and conversions
 * Stores all events: page views, quote requests, contact submissions, phone calls
 */
export const analyticsEvents = mysqlTable("analyticsEvents", {
  id: varchar("id", { length: 64 }).primaryKey(),
  eventType: mysqlEnum("eventType", ["quote_request", "contact_form", "phone_call", "page_view", "facebook_click", "google_review_click"]).notNull(),
  eventName: varchar("eventName", { length: 255 }).notNull(),
  productName: varchar("productName", { length: 255 }),
  userEmail: varchar("userEmail", { length: 320 }),
  userPhone: varchar("userPhone", { length: 20 }),
  pageUrl: text("pageUrl"),
  referrer: text("referrer"),
  userAgent: text("userAgent"),
  ipAddress: varchar("ipAddress", { length: 45 }),
  metadata: text("metadata"), // JSON string for additional data
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AnalyticsEvent = typeof analyticsEvents.$inferSelect;
export type InsertAnalyticsEvent = typeof analyticsEvents.$inferInsert;

/**
 * Analytics metrics table for storing aggregated daily metrics
 * Stores pre-calculated metrics for dashboard performance
 */
export const analyticsMetrics = mysqlTable("analyticsMetrics", {
  id: varchar("id", { length: 64 }).primaryKey(),
  date: varchar("date", { length: 10 }).notNull(), // YYYY-MM-DD format
  totalVisitors: int("totalVisitors").default(0),
  pageViews: int("pageViews").default(0),
  bounceRate: int("bounceRate").default(0), // Stored as percentage (0-100)
  avgSessionDuration: int("avgSessionDuration").default(0), // in seconds
  quoteRequests: int("quoteRequests").default(0),
  contactFormSubmissions: int("contactFormSubmissions").default(0),
  phoneCallsTracked: int("phoneCallsTracked").default(0),
  facebookClicks: int("facebookClicks").default(0),
  topPage: varchar("topPage", { length: 512 }),
  topTrafficSource: varchar("topTrafficSource", { length: 255 }),
  mobileVisitors: int("mobileVisitors").default(0),
  tabletVisitors: int("tabletVisitors").default(0),
  desktopVisitors: int("desktopVisitors").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AnalyticsMetric = typeof analyticsMetrics.$inferSelect;
export type InsertAnalyticsMetric = typeof analyticsMetrics.$inferInsert;