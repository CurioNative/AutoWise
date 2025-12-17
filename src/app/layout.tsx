import type { Metadata } from 'next';
import { Inter, Source_Code_Pro } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from './contexts/auth-context';
import { AppLayout } from './components/app-layout';
import { BookingProvider } from './contexts/booking-context';
import { cn } from '@/lib/utils';


export const metadata: Metadata = {
  title: 'AutoWise',
  description: 'Intelligent Vehicle Management',
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-code-pro',
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("font-body antialiased", inter.variable, sourceCodePro.variable)}>
        <AuthProvider>
          <BookingProvider>
            <AppLayout>
              {children}
            </AppLayout>
          </BookingProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
