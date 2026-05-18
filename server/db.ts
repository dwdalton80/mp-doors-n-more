import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, productImages, InsertProductImage, ProductImage, analyticsEvents } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function createProductImage(image: InsertProductImage): Promise<ProductImage | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create product image: database not available");
    return null;
  }

  try {
    await db.insert(productImages).values(image);
    // Fetch the most recently created image for this product
    const result = await db.select().from(productImages)
      .where(eq(productImages.productId, image.productId))
      .limit(1);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("[Database] Failed to create product image:", error);
    throw error;
  }
}

export async function getProductImagesByCategory(category: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get product images: database not available");
    return [];
  }

  try {
    return await db.select().from(productImages).where(eq(productImages.category, category as any));
  } catch (error) {
    console.error("[Database] Failed to get product images:", error);
    throw error;
  }
}

export async function getProductImage(id: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get product image: database not available");
    return null;
  }

  try {
    const result = await db.select().from(productImages).where(eq(productImages.id, id)).limit(1);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("[Database] Failed to get product image:", error);
    throw error;
  }
}

export async function updateProductImage(id: number, updates: Partial<InsertProductImage>) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update product image: database not available");
    return null;
  }

  try {
    await db.update(productImages).set(updates).where(eq(productImages.id, id));
    return await getProductImage(id);
  } catch (error) {
    console.error("[Database] Failed to update product image:", error);
    throw error;
  }
}

export async function deleteProductImage(id: number): Promise<boolean> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot delete product image: database not available");
    return false;
  }

  try {
    await db.delete(productImages).where(eq(productImages.id, id));
    return true;
  } catch (error) {
    console.error("[Database] Failed to delete product image:", error);
    throw error;
  }
}

// Analytics event tracking functions
export async function logAnalyticsEvent(event: {
  eventType: "quote_request" | "contact_form" | "phone_call" | "page_view" | "facebook_click" | "google_review_click";
  eventName: string;
  productName?: string | null;
  userEmail?: string | null;
  userPhone?: string | null;
  pageUrl?: string | null;
  referrer?: string | null;
  userAgent?: string | null;
  ipAddress?: string | null;
  metadata?: string | null;
}): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot log analytics event: database not available");
    return;
  }

  try {
    // Generate a simple UUID-like ID
    const id = `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    await db.insert(analyticsEvents).values({
      id,
      eventType: event.eventType,
      eventName: event.eventName,
      productName: event.productName,
      userEmail: event.userEmail,
      userPhone: event.userPhone,
      pageUrl: event.pageUrl,
      referrer: event.referrer,
      userAgent: event.userAgent,
      ipAddress: event.ipAddress,
      metadata: event.metadata,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error("[Database] Failed to log analytics event:", error);
    // Don't throw - analytics failures shouldn't break the app
  }
}

export async function logQuoteRequest(data: {
  userEmail?: string;
  userPhone?: string;
  productName?: string;
  pageUrl?: string;
  referrer?: string;
  userAgent?: string;
  ipAddress?: string;
}): Promise<void> {
  return logAnalyticsEvent({
    eventType: "quote_request",
    eventName: "Quote Request Submitted",
    productName: data.productName,
    userEmail: data.userEmail,
    userPhone: data.userPhone,
    pageUrl: data.pageUrl,
    referrer: data.referrer,
    userAgent: data.userAgent,
    ipAddress: data.ipAddress,
  });
}

export async function logContactForm(data: {
  userEmail?: string;
  userPhone?: string;
  pageUrl?: string;
  referrer?: string;
  userAgent?: string;
  ipAddress?: string;
}): Promise<void> {
  return logAnalyticsEvent({
    eventType: "contact_form",
    eventName: "Contact Form Submitted",
    userEmail: data.userEmail,
    userPhone: data.userPhone,
    pageUrl: data.pageUrl,
    referrer: data.referrer,
    userAgent: data.userAgent,
    ipAddress: data.ipAddress,
  });
}

export async function logPhoneCall(data: {
  userPhone?: string;
  pageUrl?: string;
  referrer?: string;
  userAgent?: string;
  ipAddress?: string;
}): Promise<void> {
  return logAnalyticsEvent({
    eventType: "phone_call",
    eventName: "Phone Call Tracked",
    userPhone: data.userPhone,
    pageUrl: data.pageUrl,
    referrer: data.referrer,
    userAgent: data.userAgent,
    ipAddress: data.ipAddress,
  });
}
