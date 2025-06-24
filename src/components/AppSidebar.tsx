
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Home, User, Settings, CheckSquare, DollarSign, Mail, Users } from 'lucide-react';
import { useAuth } from './AuthProvider';

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
  },
  {
    title: "Task Checklist",
    url: "/tasks",
    icon: CheckSquare,
  },
  {
    title: "Budgeting",
    url: "/budget",
    icon: DollarSign,
  },
  {
    title: "Undangan",
    url: "/invitations",
    icon: Mail,
  },
  {
    title: "RSVP",
    url: "/rsvp",
    icon: Users,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const { user } = useAuth();

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">💒</span>
          <div>
            <h2 className="text-lg font-bold text-rose-600 dark:text-rose-400">
              Wedding Planner
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {user?.name}
            </p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Utama</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center space-x-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <div className="text-xs text-gray-500 text-center">
          © 2024 Wedding Planner
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
