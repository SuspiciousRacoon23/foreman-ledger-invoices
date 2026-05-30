-- UP Migration: Create the invoices table
BEGIN;

CREATE TABLE invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    gstin VARCHAR(15) NOT NULL,
    invoice_no VARCHAR(50) NOT NULL UNIQUE,
    amount_paise INTEGER NOT NULL,
    tax_paise INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE invoices IS 'Stores detailed invoice records.';
COMMENT ON COLUMN invoices.gstin IS 'The GSTIN of the associated entity.';
COMMENT ON COLUMN invoices.invoice_no IS 'Unique invoice number.';
COMMENT ON COLUMN invoices.amount_paise IS 'Total amount of the invoice in paise.';
COMMENT ON COLUMN invoices.tax_paise IS 'Tax amount included in the invoice in paise.';

COMMIT;

-- DOWN Migration: Drop the invoices table
BEGIN;

DROP TABLE IF EXISTS invoices;

COMMIT;