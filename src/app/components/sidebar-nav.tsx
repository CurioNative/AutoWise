'use client';

import { usePathname } from 'next/navigation';
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { LayoutDashboard, Wrench, Calendar, Users, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '../contexts/auth-context';

const navLinks = {
  'vehicle-owner': [
    { href: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/booking', icon: Wrench, label: 'Service Booking' },
  ],
  'service-center': [
    { href: '/service-center/calendar', icon: Calendar, label: 'Predictive Calendar' },
    { href: '/service-center/workload', icon: Users, label: 'Technician Workload' },
  ],
  'oem': [
    { href: '/oem/failures', icon: ShieldAlert, label: 'Failure Analysis' },
  ]
};

const groupLabels: { [key: string]: string } = {
  'service-center': 'Service Center',
  'oem': 'OEM',
};


export function SidebarNav() {
  const pathname = usePathname();
  const { user } = useAuth();

  const isActive = (path: string) => pathname === path;

  if (!user) return null;

  const userLinks = navLinks[user.role] || [];
  const serviceCenterLinks = navLinks['service-center'] || [];
  const oemLinks = navLinks['oem'] || [];

  return (
    <div className="flex flex-col gap-2 p-2">
      {user.role === 'vehicle-owner' && (
        <SidebarGroup>
          <SidebarMenu>
            {userLinks.map(link => (
              <SidebarMenuItem key={link.href}>
                <SidebarMenuButton asChild isActive={isActive(link.href)} tooltip={link.label}>
                  <Link href={link.href}><link.icon /><span>{link.label}</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      )}

      {user.role === 'service-center' && (
         <SidebarGroup>
            <SidebarGroupLabel>{groupLabels['service-center']}</SidebarGroupLabel>
            <SidebarMenu>
              {serviceCenterLinks.map(link => (
                <SidebarMenuItem key={link.href}>
                  <SidebarMenuButton asChild isActive={isActive(link.href)} tooltip={link.label}>
                    <Link href={link.href}><link.icon /><span>{link.label}</span></Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
        </SidebarGroup>
      )}

      {user.role === 'oem' && (
        <SidebarGroup>
            <SidebarGroupLabel>{groupLabels['oem']}</SidebarGroupLabel>
            <SidebarMenu>
              {oemLinks.map(link => (
                <SidebarMenuItem key={link.href}>
                  <SidebarMenuButton asChild isActive={isActive(link.href)} tooltip={link.label}>
                    <Link href={link.href}><link.icon /><span>{link.label}</span></Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
        </SidebarGroup>
      )}
    </div>
  );
}
