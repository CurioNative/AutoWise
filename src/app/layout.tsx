import type { Metadata } from 'next';
import './globals.css';
import { SidebarProvider, Sidebar, SidebarInset, SidebarHeader, SidebarContent, SidebarFooter } from '@/components/ui/sidebar';
import { SidebarNav } from '@/app/components/sidebar-nav';
import { Toaster } from "@/components/ui/toaster";
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import { AiAssistant } from '@/app/components/ai-assistant';
import { AutoWiseIcon } from '@/app/components/icons';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

export const metadata: Metadata = {
  title: 'AutoWise',
  description: 'Intelligent Vehicle Management',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <SidebarProvider>
          <Sidebar>
            <SidebarHeader className="p-4">
              <a href="/" className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
                <AutoWiseIcon className="size-8 text-primary" />
                <span className="text-xl font-semibold text-sidebar-foreground group-data-[collapsible=icon]:hidden">AutoWise</span>
              </a>
            </SidebarHeader>
            <SidebarContent>
              <SidebarNav />
            </SidebarContent>
            <SidebarFooter className="p-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button className="w-full group-data-[collapsible=icon]:w-auto group-data-[collapsible=icon]:p-2 group-data-[collapsible=icon]:h-auto">
                    <MessageSquare />
                    <span className="group-data-[collapsible=icon]:hidden">AI Assistant</span>
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[400px] sm:w-[540px] flex flex-col p-0">
                  <SheetHeader className="p-6">
                    <SheetTitle>AI Assistant</SheetTitle>
                  </SheetHeader>
                  <AiAssistant />
                </SheetContent>
              </Sheet>
            </SidebarFooter>
          </Sidebar>
          <SidebarInset>
            {children}
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
