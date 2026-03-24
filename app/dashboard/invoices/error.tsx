'use client'; // We define the component as a client component 
// This since we want to use the useEffect hook, hooks are only available in client components.
 
import { useEffect } from 'react';
 
// The arguments of the function mean the following
// error: The error prop must be an error, and may include an optional digest field.
// the & symbol here is used tom combine the optional digest field with the Error type, allowing the error object to have both standard error properties and an optional digest property.
// reset: The reset prop is a function that takes no arguments and returns void. This function can be called to attempt to recover from the error, such as by re-rendering the component or retrying a failed operation.
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);
 
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center">Something went wrong!</h2>
      <button
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          () => reset()
        }
      >
        Try again
      </button>
    </main>
  );
}