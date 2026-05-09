import { sqliteTable, text, integer, real, index } from "drizzle-orm/sqlite-core";

export const analyticsEvents = sqliteTable(
  "analytics_events",
  {
    id: text("id").primaryKey(),
    eventType: text("event_type").notNull(), // 'quote_request', 'contact_form', 'phone_call', 'page_view'
    eventName: text("event_name").notNull(), // Descriptive name
    productName: text("product_name"), // For product-specific events
    userEmail: text("user_email"),
    userPhone: text("user_phone"),
    pageUrl: text("page_url"),
    referrer: text("referrer"),
    userAgent: text("user_agent"),
    ipAddress: text("ip_address"),
    metadata: text("metadata"), // JSON string for additional data
    createdAt: integer("created_at").notNull(), // Unix timestamp in milliseconds
  },
  (table) => ({
    eventTypeIdx: index("event_type_idx").on(table.eventType),
    createdAtIdx: index("created_at_idx").on(table.createdAt),
    productNameIdx: index("product_name_idx").on(table.productName),
  })
);

export const analyticsMetrics = sqliteTable(
  "analytics_metrics",
  {
    id: text("id").primaryKey(),
    date: text("date").notNull(), // YYYY-MM-DD format
    totalVisitors: integer("total_visitors").default(0),
    pageViews: integer("page_views").default(0),
    bounceRate: real("bounce_rate").default(0),
    avgSessionDuration: integer("avg_session_duration").default(0), // in seconds
    quoteRequests: integer("quote_requests").default(0),
    contactFormSubmissions: integer("contact_form_submissions").default(0),
    phoneCallsTracked: integer("phone_calls_tracked").default(0),
    topPage: text("top_page"),
    topTrafficSource: text("top_traffic_source"),
    createdAt: integer("created_at").notNull(),
    updatedAt: integer("updated_at").notNull(),
  },
  (table) => ({
    dateIdx: index("date_idx").on(table.date),
  })
);
