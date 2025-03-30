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
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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
        <div className="absolute right-0 mt-2 w-full bg-zinc-900 border border-zinc-800 rounded-md shadow-lg z-50 bottom-12">
          <button className="flex items-center gap-2 w-full px-4 py-2 text-zinc-400 hover:bg-zinc-800 hover:text-white">
            <User className="w-5 h-5" />
            Profile
          </button>
          <button className="flex items-center gap-2 w-full px-4 py-2 text-zinc-400 hover:bg-zinc-800 hover:text-white">
            <Settings className="w-5 h-5" />
            Settings
          </button>
          <button
            onClick={handleLogOut}
            className="flex items-center gap-2 w-full px-4 py-2 text-red-400 hover:bg-red-800 hover:text-white"
          >
            <LogOut className="w-5 h-5" />
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}
