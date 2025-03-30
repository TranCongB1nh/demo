"use client";
import {
  Sun,
  ChevronLeft,
  Home,
  LogOut,
  MessageSquare,
  Moon,
  Plus,
  Settings,
  Users,
  Monitor,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "@/Redux/actions/userAction";
import { useTheme } from "@/context/ThemeContext";
import { getUserData } from "../utils/auth";

export function CustomSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const currentUser = useSelector(
    (state: { user: { currentUser: any } }) => state.user.currentUser
  );

  useEffect(() => {
    const storedUser = getUserData();
    if (!currentUser && storedUser) {
      dispatch({ type: "LOGIN_SUCCESS", payload: storedUser }); // Cập nhật Redux state
    }
  }, [currentUser, dispatch]);

  function handleLogOut() {
    localStorage.removeItem("currentUser");
    dispatch(userLogout());
    navigate("/login", { replace: true });
  }
  return (
    <Sidebar
      className={`border-r border-zinc-800 bg-black transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <SidebarHeader className="p-0">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-white flex items-center justify-center">
              <span className="text-black font-bold">A</span>
            </div>
            {!collapsed && (
              <span className="font-semibold text-white">Acme</span>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-white"
            onClick={() => setCollapsed(!collapsed)}
          >
            <ChevronLeft
              className={`h-6 w-6 transition-transform ${
                collapsed ? "rotate-180" : ""
              }`}
            />
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-0 py-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive
              className="rounded-none px-4 py-2 h-auto bg-zinc-900 hover:bg-zinc-800 text-white flex items-center gap-3"
            >
              <a href="#">
                <Home className="h-5 w-5" />
                {!collapsed && <span>Home</span>}
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="rounded-none px-4 py-2 h-auto hover:bg-zinc-800 text-zinc-400 hover:text-white flex items-center gap-3"
            >
              <a href="#">
                <Users className="h-5 w-5" />
                {!collapsed && <span>Contacts</span>}
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="rounded-none px-4 py-2 h-auto hover:bg-zinc-800 text-zinc-400 hover:text-white flex items-center gap-3"
            >
              <a href="#">
                <Settings className="h-5 w-5" />
                {!collapsed && <span>Settings</span>}
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <div className="mt-8">
          <div className="px-4">
            {!collapsed && (
              <h3 className="text-sm font-medium text-zinc-500 mb-2">
                Favorites
              </h3>
            )}
            <div className="space-y-1">
              {/* Google */}
              <div className="flex items-center gap-3 p-2 rounded-md hover:bg-zinc-800 cursor-pointer">
                <div className="h-6 w-6 rounded-full overflow-hidden flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="h-6 w-6">
                    <path
                      d="M22.5 12c0 5.799-4.701 10.5-10.5 10.5S1.5 17.799 1.5 12 6.201 1.5 12 1.5 22.5 6.201 22.5 12z"
                      fill="#fff"
                    />
                    <path
                      d="M12 7.895v8.21c2.33-1.31 4-4.13 4-4.13s-1.67-2.82-4-4.08z"
                      fill="#EA4335"
                    />
                    <path
                      d="M12 7.895l-4 4.08s1.67 2.82 4 4.13v-8.21z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M8 11.975l-3.79.08C4.21 14.895 7.31 18 12 18v-4.08l-4-3.945z"
                      fill="#34A853"
                    />
                    <path
                      d="M16 11.975l3.79.08c0-2.84-3.1-5.945-7.79-5.945v4.08l4 3.945z"
                      fill="#4285F4"
                    />
                  </svg>
                </div>
                {!collapsed && <span className="text-zinc-300">Google</span>}
              </div>

              {/* Microsoft */}
              <div className="flex items-center gap-3 p-2 rounded-md hover:bg-zinc-800 cursor-pointer">
                <div className="h-6 w-6 rounded-full overflow-hidden flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="h-6 w-6">
                    <rect width="24" height="24" fill="#F25022" />
                    <rect x="12" width="12" height="12" fill="#7FBA00" />
                    <rect y="12" width="12" height="12" fill="#00A4EF" />
                    <rect x="12" y="12" width="12" height="12" fill="#FFB900" />
                  </svg>
                </div>
                {!collapsed && <span className="text-zinc-300">Microsoft</span>}
              </div>

              {/* Airbnb */}
              <div className="flex items-center gap-3 p-2 rounded-md hover:bg-zinc-800 cursor-pointer">
                <div className="h-6 w-6 rounded-full bg-[#FF5A5F] flex items-center justify-center overflow-hidden">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 text-white">
                    <path
                      fill="currentColor"
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"
                    />
                  </svg>
                </div>
                {!collapsed && <span className="text-zinc-300">Airbnb</span>}
              </div>
            </div>
          </div>
        </div>
      </SidebarContent>

      <SidebarFooter className="mt-auto px-0 py-2">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 px-4 py-2 h-auto rounded-none text-zinc-400 hover:text-white hover:bg-zinc-800 flex items-center"
        >
          <Plus className="h-5 w-5" />
          {!collapsed && <span>Invite member</span>}
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start gap-3 px-4 py-2 h-auto rounded-none text-zinc-400 hover:text-white hover:bg-zinc-800 flex items-center"
        >
          <MessageSquare className="h-5 w-5" />
          {!collapsed && <span>Feedback</span>}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 px-4 py-2 h-auto rounded-none text-zinc-300 hover:text-white hover:bg-zinc-800 flex items-center"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback className="bg-zinc-700 text-zinc-300">
                  CT
                </AvatarFallback>
              </Avatar>
              {!collapsed && <span className="text-sm">{currentUser?.username || "Guest"}</span>}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-64 bg-zinc-900 border-zinc-800 text-zinc-300"
            align="start"
            sideOffset={0}
          >
            <div className="px-4 py-3 border-b border-zinc-800">
              <p className="font-medium">{currentUser?.username || "Guest"}</p>
              <p className="text-xs text-zinc-500">{currentUser?.email || "No email available"}</p>
            </div>

            <DropdownMenuItem className="px-4 py-2 focus:bg-zinc-800 focus:text-white cursor-pointer flex justify-between">
              <span>Profile</span>
              <span className="text-xs text-zinc-500">⌘P</span>
            </DropdownMenuItem>

            <DropdownMenuItem className="px-4 py-2 focus:bg-zinc-800 focus:text-white cursor-pointer flex justify-between">
              <span>Billing</span>
              <span className="text-xs text-zinc-500">⌘B</span>
            </DropdownMenuItem>

            <DropdownMenuItem className="px-4 py-2 focus:bg-zinc-800 focus:text-white cursor-pointer flex justify-between">
              <span>Command Menu</span>
              <span className="text-xs text-zinc-500">⌘K</span>
            </DropdownMenuItem>

            <DropdownMenu>
              <DropdownMenuTrigger className="px-4 py-2 flex justify-between items-center w-full text-zinc-300 hover:text-white hover:bg-zinc-800">
                <span className="flex items-center gap-2">
                  {theme === "light" && <Sun className="h-4 w-4" />}
                  {theme === "dark" && <Moon className="h-4 w-4" />}
                  {theme === "system" && <Monitor className="h-4 w-4" />}
                  <span>Theme</span>
                </span>
                <span className="text-xs">
                  {theme.charAt(0).toUpperCase() + theme.slice(1)}
                </span>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-40 bg-zinc-900 border-zinc-800 text-zinc-300">
                <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                  <DropdownMenuRadioItem value="light">
                    <div className="flex items-center gap-2">
                      <Sun className="h-4 w-4" />
                      <span>Light</span>
                    </div>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="dark">
                    <div className="flex items-center gap-2">
                      <Moon className="h-4 w-4" />
                      <span>Dark</span>
                    </div>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="system">
                    <div className="flex items-center gap-2">
                      <Monitor className="h-4 w-4" />
                      <span>System</span>
                    </div>
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenuSeparator className="bg-zinc-800" />

            <DropdownMenuItem
              onClick={handleLogOut}
              className="px-4 py-2 focus:bg-zinc-800 focus:text-white cursor-pointer flex justify-between text-red-500 hover:text-red-400"
            >
              <div className="flex items-center gap-2">
                <LogOut className="h-5 w-5" />
                <span>Log out</span>
              </div>
              <span className="text-xs text-zinc-500">⌘L</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
