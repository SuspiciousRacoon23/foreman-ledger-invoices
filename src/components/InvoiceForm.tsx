'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface InvoiceFormProps {}

const InvoiceForm: React.FC<InvoiceFormProps> = () => {
  const [formData, setFormData] = useState({
    gstin: '',
    invoiceNo: '',
    amount: '',
    // Add other necessary fields if required, e.g., date, customerId
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (message) {
      setMessage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/invoices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Invoice submitted successfully!' });
        // Optionally reset form data here
        setFormData({ gstin: '', invoiceNo: '', amount: '' });
      } else {
        const errorData = await response.json();
        setMessage({ type: 'error', text: errorData.error || 'Failed to submit invoice.' });
      }
    } catch (error) {
      console.error('Submission error:', error);
      setMessage({ type: 'error', text: 'Network error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Submit New Invoice</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* GSTIN Field */}
            <div>
              <label htmlFor="gstin" className="block text-sm font-medium text-gray-700">
                GSTIN
              </label>
              <Input
                id="gstin"
                name="gstin"
                type="text"
                value={formData.gstin}
                onChange={handleChange}
                required
                placeholder="Enter GSTIN"
              />
            </div>

            {/* Invoice Number Field */}
            <div>
              <label htmlFor="invoiceNo" className="block text-sm font-medium text-gray-700">
                Invoice Number
              </label>
              <Input
                id="invoiceNo"
                name="invoiceNo"
                type="text"
                value={formData.invoiceNo}
                onChange={handleChange}
                required
                placeholder="INV-2024-001"
              />
            </div>

            {/* Amount Field */}
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                Total Amount (INR)
              </label>
              <Input
                id="amount"
                name="amount"
                type="number"
                value={formData.amount}
                onChange={handleChange}
                required
                placeholder="0.00"
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Submitting...' : 'Submit Invoice'}
            </Button>
          </form>

          {message && (
            <div className={`mt-4 p-3 rounded ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {message.text}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoiceForm;