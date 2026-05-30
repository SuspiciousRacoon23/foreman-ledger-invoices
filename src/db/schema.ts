import { pgTable, uuid, varchar, integer, timestamp } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const invoices = pgTable('invoices', {
    id: uuid('id').primaryKey(),
    gstin: varchar('gstin', { length: 15 }).notNull(),
    invoiceNo: varchar('invoice_no', { length: 50 }).notNull().unique(),
    amountPaise: integer('amount_paise').notNull(),
    taxPaise: integer('tax_paise').notNull(),
    createdAt: timestamp('created_at').default(sql`now()`).notNull(),
});