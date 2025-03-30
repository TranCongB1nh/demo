import { useEffect, useRef, useState } from "react";
import { LogOut, Settings, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "@/Redux/actions/userAction";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../../utils/auth";

export function UserDropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector(
    (state: { user: { currentUser: any } }) => state.user.currentUser
  );

  useEffect(() => {
    const storedUser = getUserData();
    if (!currentUser && storedUser) {
      dispatch({ type: "LOGIN_SUCCESS", payload: storedUser });
    }
  }, [currentUser, dispatch]);

  // Hàm xử lý click bên ngoài dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  function handleLogOut() {
    localStorage.removeItem("currentUser");
    dispatch(userLogout());
    navigate("/login", { replace: true });
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center gap-2 px-4 py-2 text-white hover:bg-zinc-800 rounded-md transition"
      >
        <Avatar className="w-8 h-8">
          <AvatarImage src="/path-to-user-image.jpg" alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <span>{currentUser?.username}</span>
      </button>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="absolute bottom-full right-0 mb-2 w-60 bg-zinc-900 border border-zinc-800 rounded-lg shadow-lg z-50">
          {/* Header */}
          <div className="px-4 py-3 border-b border-zinc-800">
            <p className="text-white font-medium">{currentUser?.username}</p>
            <p className="text-zinc-400 text-sm">{currentUser?.email}</p>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <button className="flex items-center gap-3 w-full px-4 py-2 text-zinc-400 hover:bg-zinc-800 hover:text-white">
              <User className="w-5 h-5" />
              Profile
              <span className="ml-auto text-xs opacity-50">⇧⌘P</span>
            </button>
            <button className="flex items-center gap-3 w-full px-4 py-2 text-zinc-400 hover:bg-zinc-800 hover:text-white">
              <Settings className="w-5 h-5" />
              Billing
              <span className="ml-auto text-xs opacity-50">⇧⌘B</span>
            </button>
            <button className="flex items-center gap-3 w-full px-4 py-2 text-zinc-400 hover:bg-zinc-800 hover:text-white">
              ⌘K
              <span className="ml-auto text-xs opacity-50">Command Menu</span>
            </button>

            {/* Theme */}
            <div className="px-4 py-2 flex items-center justify-between">
              <span className="text-zinc-400">Theme</span>
              <select className="bg-zinc-800 text-white px-2 py-1 rounded-md">
                <option>🌙 Dark</option>
                <option>☀️ Light</option>
              </select>
            </div>
          </div>

          {/* Log out */}
          <button
            onClick={handleLogOut}
            className="flex items-center gap-3 w-full px-4 py-2 text-red-400 hover:bg-red-800 hover:text-white border-t border-zinc-800"
          >
            <LogOut className="w-5 h-5" />
            Log Out
            <span className="ml-auto text-xs opacity-50">⌘L</span>
          </button>
        </div>
      )}
    </div>
  );
}
