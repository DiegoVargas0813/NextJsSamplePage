import '@/app/ui/global.css'; //Importing global styles in top level to ensure they are applied across the entire application
import { inter } from '@/app/ui/fonts'; //Importing custom font on top component to ensure it is available globally

// This is a root layout and is required in next.js. This one will be shared across all pages
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*Class name inter and adding tailwind antialiasing */}
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
