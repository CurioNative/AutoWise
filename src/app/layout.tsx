import type { Metadata } from 'next';
import './globals.css';
import { SidebarProvider, Sidebar, SidebarInset, SidebarHeader, SidebarContent, SidebarFooter } from '@/components/ui/sidebar';
import { SidebarNav } from '@/app/components/sidebar-nav';
import { Toaster } from "@/components/ui/toaster";
import { Button } from '@/components/ui/button';
import { LogOut, MessageSquare, User as UserIcon } from 'lucide-react';
import { AiAssistant } from '@/app/components/ai-assistant';
import { AutoWiseIcon } from '@/app/components/icons';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { AuthProvider, useAuth } from './contexts/auth-context';
import { AuthLayout } from './components/auth-layout';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'AutoWise',
  description: 'Intelligent Vehicle Management',
};

function UserMenu() {
  const { user, logout } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-full justify-start text-left h-auto p-2 group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:justify-center">
            <Avatar className="size-6">
                <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground text-xs">
                    <UserIcon className="size-4" />
                </AvatarFallback>
            </Avatar>
           <div className="ml-2 group-data-[collapsible=icon]:hidden">
              <p className="text-sm font-medium text-sidebar-foreground">{user.name}</p>
              <p className="text-xs text-sidebar-foreground/70">{user.role}</p>
           </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" align="end" className="w-56">
        <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

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
        <AuthProvider>
          <AuthLayout>
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
                <SidebarFooter className="p-2 space-y-1">
                   <UserMenu />
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button className="w-full justify-start group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:w-auto group-data-[collapsible=icon]:h-auto group-data-[collapsible=icon]:p-2">
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
          </AuthLayout>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
