import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db'; // Assuming db client is initialized here
import { invoices } from '@/db/schema';

// 1. Define the Zod schema for input validation
const invoiceSchema = z.object({
    gstin: z.string().min(1).max(15),
    invoiceNo: z.string().min(1).max(50),
    amountPaise: z.number().int().positive(),
    taxPaise: z.number().int().nonnegative(),
});

export async function POST(req: NextRequest) {
    try {
        // 2. Parse and validate the request body
        const body = await req.json();
        const validationResult = invoiceSchema.safeParse(body);

        if (!validationResult.success) {
            // Return 400 Bad Request with validation errors
            return NextResponse.json(
                { error: "Validation failed", details: validationResult.error.issues },
                { status: 400 }
            );
        }

        const validatedData = validationResult.data;

        // 3. Insert data into the database
        // We use the validated data directly for insertion.
        const result = await db.insert(invoices).values({
            gstin: validatedData.gstin,
            invoiceNo: validatedData.invoiceNo,
            amountPaise: validatedData.amountPaise,
            taxPaise: validatedData.taxPaise,
        }).returning({ id: invoices.id }); // Return the newly created ID

        // 4. Return success response
        return NextResponse.json({
            message: "Invoice created successfully",
            invoiceId: result[0].id,
        }, { status: 201 });

    } catch (error) {
        console.error("Error processing invoice POST request:", error);
        
        // Handle database or general errors
        return NextResponse.json(
            { error: "Internal Server Error", details: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
}