"use client";

import { useRouter } from "next/navigation";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import axios from "axios";

const LogoutItem = () => {
  const router = useRouter();

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
      router.push("/login");
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  return (
    <DropdownMenuItem onClick={handleLogout}>
      <LogOut className="mr-2 h-4 w-4" />
      Logout
    </DropdownMenuItem>
  );
};

export default LogoutItem;
