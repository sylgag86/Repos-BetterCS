import { pgTable, serial, text, integer, doublePrecision, boolean, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").unique().notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  email: text("email").unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

// Lenders schema
export const lenders = pgTable("lenders", {
  id: serial("id").primaryKey(),
  lenderId: text("lender_id").unique().notNull(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  rating: doublePrecision("rating").notNull(),
  reviews: integer("reviews").notNull(),
  creditMin: integer("credit_min"),
  maxFunding: integer("max_funding"),
  approvalTime: text("approval_time"),
  features: text("features").array(),
  affiliateLink: text("affiliate_link"),
  betterList100: boolean("better_list_100").default(true),
  featured: boolean("featured").default(false),
  slug: text("slug").notNull(),
  website: text("website").notNull(),
  description: text("description"),
  logoUrl: text("logo_url"),
  reviewSnippet: text("review_snippet"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

// Schema for lender schema data
export const lenderSchemas = pgTable("lender_schemas", {
  id: serial("id").primaryKey(),
  lenderId: text("lender_id").notNull().references(() => lenders.lenderId),
  schemaJson: text("schema_json").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

// Applications table to store form submissions
export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  // Personal Information
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  
  // Business Information
  businessName: varchar("business_name", { length: 255 }).notNull(),
  businessType: varchar("business_type", { length: 100 }).notNull(),
  ein: varchar("ein", { length: 20 }),
  address: varchar("address", { length: 255 }).notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  state: varchar("state", { length: 50 }).notNull(),
  zipCode: varchar("zip_code", { length: 10 }).notNull(),
  
  // Funding Details
  fundingAmount: varchar("funding_amount", { length: 100 }).notNull(),
  fundingPurpose: varchar("funding_purpose", { length: 255 }).notNull(),
  timeInBusiness: varchar("time_in_business", { length: 100 }),
  annualRevenue: varchar("annual_revenue", { length: 100 }),
  creditScore: varchar("credit_score", { length: 50 }),
  
  // Additional Information
  hasBusinessPlan: boolean("has_business_plan").default(false),
  hasTaxReturns: boolean("has_tax_returns").default(false),
  hasFinancialStatements: boolean("has_financial_statements").default(false),
  additionalInfo: text("additional_info"),
  
  // Agreement
  agreeToTerms: boolean("agree_to_terms").notNull(),
  
  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Schema validator
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  firstName: true,
  lastName: true,
  email: true,
  passwordHash: true,
});

export const insertLenderSchema = createInsertSchema(lenders).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertLenderSchemaData = createInsertSchema(lenderSchemas).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertApplicationSchema = createInsertSchema(applications).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertLender = z.infer<typeof insertLenderSchema>;
export type Lender = typeof lenders.$inferSelect;
export type InsertLenderSchema = z.infer<typeof insertLenderSchemaData>;
export type LenderSchema = typeof lenderSchemas.$inferSelect;
export type InsertApplication = z.infer<typeof insertApplicationSchema>;
export type Application = typeof applications.$inferSelect;