import { Inter } from 'next/font/google'; // Example of using Next.js font optimization with Google Fonts
import { Lusitana } from 'next/font/google'; // Importing another font for demonstration purposes

// We define the const inter to hold the font configuration for the Inter font, specifying that we want to include the 'latin' subset for optimized loading and better performance.
export const inter = Inter({ subsets: ['latin'] }); // Exporting the font configuration to be used across the application, ensuring consistent typography and optimized loading.

export const lusitana = Lusitana({ subsets: ['latin'], weight:["400", "700"] }); // Exporting another font configuration for the Lusitana font, allowing us to use multiple fonts in our application while still benefiting from Next.js's font optimization features.
