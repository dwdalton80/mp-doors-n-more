import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, productImages, InsertProductImage, ProductImage } from "../drizzle/schema";
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
