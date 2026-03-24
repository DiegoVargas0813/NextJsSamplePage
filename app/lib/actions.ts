'use server'; // This marks all exported functions as Server Actions. Any any non-used ones are removed from server bundle.
// A function within a component can be turned into a server action by adding the property inside the action.

import { z } from 'zod'; 
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
// we're importing the 'z' object, which is the main entry point for defining schemas and performing validation with Zod.
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' }); // Connection to the database.
// Url extracted from the environment variable POSTGRES_URL, and we specify that SSL is required for the connection.

const FormSchema = z.object({
  id: z.string(), // We use Zod to enforce that id is a string.
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

// The omit method creates a new schema by excluding the id and data field marking them with true.
// We omit them since they will be generated inside the DB.
const CreateInvoice = FormSchema.omit({ id: true, date: true });


export async function createInvoice(formData: FormData) {
    // We use the parse method to valide the form data against the CreateInvoice schema.
    const { customerId, amount, status } = CreateInvoice.parse({
        customerId: formData.get('customerId'), // We retrieve the customerId from the form data and validate it as a string.
        amount: formData.get('amount'),
        status: formData.get('status'),
    });
    const amountInCents = amount * 100; // Convert dollars to cents for storage in the database
    const date = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

    await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;

    revalidatePath('/dashboard/invoices'); // After the invoice is created, we call revalidatePath to refresh the invoices list page.
    redirect('/dashboard/invoices');
}

// Use Zod to update the expected types
const UpdateInvoice = FormSchema.omit({ id: true, date: true });
 
// ...
 
export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({ // Validation function.
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  const amountInCents = amount * 100;
 
  await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;
 
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  await sql`DELETE FROM invoices WHERE id = ${id}`;
  revalidatePath('/dashboard/invoices');
}