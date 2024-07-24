import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut } from "lucide-react";
import axios from "axios";
import LogoutItem from "@/components/profile/LogoutItem";

const Navbar = () => {
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8080/auth/logout",
        {},
        { withCredentials: true }
      );

      // Remove the cookie on the client side
      document.cookie =
        "connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      // Redirect to login page
      window.location.href = "/login";
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  return (
    <div className="p-2 flex flex-row justify-between items-center shadow-md">
      <p className="text-2xl font-medium m-2">SplitBills</p>
      <NavigationMenu className="">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} text-[16px] font-medium`}
              >
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/events" legacyBehavior passHref>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} text-[16px] font-medium`}
              >
                Events
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/stats" legacyBehavior passHref>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} text-[16px] font-medium`}
              >
                Stats
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <DropdownMenu>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} text-[16px] font-medium`}
              >
                <DropdownMenuTrigger className="">Account</DropdownMenuTrigger>
              </NavigationMenuLink>
              <DropdownMenuContent>
                <Link href="/profile" legacyBehavior passHref>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <LogoutItem />
              </DropdownMenuContent>
            </DropdownMenu>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default Navbar;
