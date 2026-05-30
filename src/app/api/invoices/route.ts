import { NextResponse } from 'next/server';

/**
 * POST /api/invoices
 * Receives and processes the submitted invoice data.
 * @param request The incoming request object containing invoice details.
 * @returns A JSON response indicating success or failure.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Input Validation (Basic check)
    if (!body || !body.gstin || !body.invoiceNo || !body.amount) {
      return NextResponse.json({ error: 'Missing required fields: GSTIN, Invoice Number, and Amount are required.' }, { status: 400 });
    }

    // 2. Business Logic Simulation (e.g., saving to database)
    console.log('Received invoice data:', {
      gstin: body.gstin,
      invoiceNo: body.invoiceNo,
      amount: parseFloat(body.amount),
    });

    // Simulate database interaction delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // 3. Success Response
    return NextResponse.json({
      message: 'Invoice successfully recorded.',
      data: {
        gstin: body.gstin,
        invoiceNo: body.invoiceNo,
        amount: parseFloat(body.amount),
        submittedAt: new Date().toISOString(),
      },
    }, { status: 201 });

  } catch (error) {
    console.error('Error processing invoice submission:', error);
    return NextResponse.json({ error: 'Internal server error while processing the submission.' }, { status: 500 });
  }
}