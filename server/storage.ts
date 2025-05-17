import { users, lenders, lenderSchemas, type User, type InsertUser, type Lender, type InsertLender, type InsertLenderSchema } from "@shared/schema";
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
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private lendersStore: Map<string, Lender>;
  private lenderSchemaStore: Map<string, string>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.lendersStore = new Map();
    this.lenderSchemaStore = new Map();
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
      createdAt: new Date() 
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
      createdAt: new Date(),
      updatedAt: new Date()
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
}

// Use database storage when in production, otherwise use memory storage
const isProduction = process.env.NODE_ENV === 'production';
export const storage = isProduction ? new DatabaseStorage() : new MemStorage();
