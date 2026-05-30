import InvoiceForm from '@/components/InvoiceForm';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center py-12">
      <h1 className="text-3xl font-bold mb-8">Invoice Submission Portal</h1>
      <InvoiceForm />
    </main>
  );
}