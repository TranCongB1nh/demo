import { SignupForm } from "@/components/signup-form";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Signup() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center p-6 md:p-10 bg-background text-foreground transition-colors duration-300">
      <div className="w-full max-w-lg">
        <SignupForm />
      </div>
      <Button
        onClick={toggleTheme}
        className="absolute bottom-2 right-2 p-5 rounded-full bg-background border-2 border-gray-400 shadow-lg hover:bg-opacity-20 hover:scale-110 transition-all"
      >
        {theme === "dark" ? <Moon className="text-gray-200" size={32} /> : <Sun className="text-gray-800" size={32} />}
      </Button>
    </div>
  );
}
