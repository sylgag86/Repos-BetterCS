import { users, lenders, lenderSchemas, applications, type User, type InsertUser, type Lender, type InsertLender, type InsertLenderSchema, type Application, type InsertApplication } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  // Lender methods
  getLender(id: string): Promise<Lender | undefined>;
  getAllLenders(): Promise<Lender[]>;
  getBetterList100Lenders(): Promise<Lender[]>;
  createLender(lender: InsertLender): Promise<Lender>;
  // Schema methods
  createLenderSchema(schemaData: InsertLenderSchema): Promise<string>;
  getLenderSchema(lenderId: string): Promise<string | undefined>;
  // Application methods
  createApplication(application: InsertApplication): Promise<Application>;
  getAllApplications(): Promise<Application[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getLender(id: string): Promise<Lender | undefined> {
    const [lender] = await db.select().from(lenders).where(eq(lenders.lenderId, id));
    return lender || undefined;
  }

  async getAllLenders(): Promise<Lender[]> {
    return await db.select().from(lenders);
  }

  async getBetterList100Lenders(): Promise<Lender[]> {
    return await db.select().from(lenders).where(eq(lenders.betterList100, true));
  }

  async createLender(lender: InsertLender): Promise<Lender> {
    const [createdLender] = await db
      .insert(lenders)
      .values(lender)
      .returning();
    return createdLender;
  }

  async createLenderSchema(schemaData: InsertLenderSchema): Promise<string> {
    const [schema] = await db
      .insert(lenderSchemas)
      .values(schemaData)
      .returning();
    return schema.schemaJson;
  }

  async getLenderSchema(lenderId: string): Promise<string | undefined> {
    const [schema] = await db
      .select()
      .from(lenderSchemas)
      .where(eq(lenderSchemas.lenderId, lenderId));
    return schema ? schema.schemaJson : undefined;
  }

  async createApplication(application: InsertApplication): Promise<Application> {
    const [createdApplication] = await db
      .insert(applications)
      .values(application)
      .returning();
    return createdApplication;
  }

  async getAllApplications(): Promise<Application[]> {
    return await db.select().from(applications);
  }
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private lendersStore: Map<string, Lender>;
  private lenderSchemaStore: Map<string, string>;
  private applicationsStore: Map<number, Application>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.lendersStore = new Map();
    this.lenderSchemaStore = new Map();
    this.applicationsStore = new Map();
    this.currentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = {
      ...insertUser,
      id,
      email: insertUser.email ?? null,
      firstName: insertUser.firstName ?? null,
      lastName: insertUser.lastName ?? null,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async getLender(id: string): Promise<Lender | undefined> {
    return this.lendersStore.get(id);
  }

  async getAllLenders(): Promise<Lender[]> {
    return Array.from(this.lendersStore.values());
  }

  async getBetterList100Lenders(): Promise<Lender[]> {
    return Array.from(this.lendersStore.values()).filter(
      (lender) => lender.betterList100
    );
  }

  async createLender(lender: InsertLender): Promise<Lender> {
    const createdLender: Lender = {
      ...lender,
      id: this.lendersStore.size + 1,
      creditMin: (lender as any).creditMin ?? null,
      maxFunding: (lender as any).maxFunding ?? null,
      approvalTime: (lender as any).approvalTime ?? null,
      features: (lender as any).features ?? null,
      affiliateLink: (lender as any).affiliateLink ?? null,
      betterList100: (lender as any).betterList100 ?? true,
      featured: (lender as any).featured ?? false,
      description: (lender as any).description ?? null,
      logoUrl: (lender as any).logoUrl ?? null,
      reviewSnippet: (lender as any).reviewSnippet ?? null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.lendersStore.set(lender.lenderId, createdLender);
    return createdLender;
  }

  async createLenderSchema(schemaData: InsertLenderSchema): Promise<string> {
    this.lenderSchemaStore.set(schemaData.lenderId, schemaData.schemaJson);
    return schemaData.schemaJson;
  }

  async getLenderSchema(lenderId: string): Promise<string | undefined> {
    return this.lenderSchemaStore.get(lenderId);
  }

  async createApplication(insertApplication: InsertApplication): Promise<Application> {
    const id = this.currentId++;
    const application: Application = {
      ...insertApplication,
      id,
      ein: insertApplication.ein ?? null,
      timeInBusiness: insertApplication.timeInBusiness ?? null,
      annualRevenue: insertApplication.annualRevenue ?? null,
      creditScore: insertApplication.creditScore ?? null,
      additionalInfo: insertApplication.additionalInfo ?? null,
      hasBusinessPlan: insertApplication.hasBusinessPlan ?? false,
      hasTaxReturns: insertApplication.hasTaxReturns ?? false,
      hasFinancialStatements: insertApplication.hasFinancialStatements ?? false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.applicationsStore.set(id, application);
    return application;
  }

  async getAllApplications(): Promise<Application[]> {
    return Array.from(this.applicationsStore.values());
  }
}

// Use database storage when in production, otherwise use memory storage
const isProduction = process.env.NODE_ENV === 'production';
export const storage = isProduction ? new DatabaseStorage() : new MemStorage();
