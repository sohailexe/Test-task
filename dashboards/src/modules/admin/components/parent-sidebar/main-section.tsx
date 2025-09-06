import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { HomeIcon, PersonStanding } from "lucide-react";
import { Link } from 'react-router';
import { useLocation } from 'react-router';

const items = [
  {
    title: "Overview",
    href: "/",
    icon: HomeIcon,
  },
  {
    title: "Add Blog",
    href: "/admin/add-blog",
    icon: HomeIcon,
  },
  {
    title: "Blogs",
    href: "/admin/blogs",
    icon: PersonStanding,
  },
  // {
  //   title: "Users",
  //   href: "/admin/users",
  //   icon: Goal,
  // },
  // {
  //   title: 'Reports',
  //   href: '/parent/reports',
  //   icon: BarChart,
  // },
  // {
  //   title: 'Calendar',
  //   href: '/parent/calendar',
  //   icon: Calendar,
  // },
  // {
  //   title: "Settings",
  //   href: "/parent/settings",
  //   icon: Settings,
  // },
];

const MainSection = () => {
  const location = useLocation();

  console.log('Current pathname:', location.pathname);

  const isActive = (href: string) => {
    if (href === '/') {
      const isRootActive = location.pathname === '/' || location.pathname === '';
      console.log(`Checking root (${href}):`, isRootActive);
      return isRootActive;
    }

    const isStartsWithActive = location.pathname.startsWith(href);
    console.log(`Checking ${href}:`, isStartsWithActive);
    return isStartsWithActive;
  };

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map(item => {
            const isItemActive = isActive(item.href);
            console.log(`Item: ${item.title}, Active: ${isItemActive}`);

            return (
              <SidebarMenuItem key={item.title} className='py-1'>
                <SidebarMenuButton tooltip={item.title} asChild isActive={isItemActive}>
                  <Link to={item.href} className='flex items-center gap-4'>
                    <item.icon
                      className={`h-4 w-4 ${isItemActive ? 'text-primary bg-' : 'text-muted-foreground'}`}
                    />
                    <span
                      className={`text-sm ${isItemActive ? 'font-medium text-foreground' : 'text-muted-foreground'}`}
                    >
                      {item.title}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default MainSection;
