import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
 
export default async function Page() {
  const customers = await fetchCustomers(); // Fetch clients in SQL
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' }, // Link to the invoices list page, our previous page.
          {
            label: 'Create Invoice', // Current page, so we set active to true and omit the href.
            href: '/dashboard/invoices/create', 
            active: true, 
          },
        ]}
      />
      <Form customers={customers} />   {/*Customer data is passed to form*/}
    </main>
  );
}