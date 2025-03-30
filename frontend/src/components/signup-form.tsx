import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaMicrosoft } from "react-icons/fa";
import { CheckIcon, Dot } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "@/Redux/actions/userAction";

export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { registrationMessage, error } = useSelector((state: any) => state.user);

  const conditions = [
    {
      text: "Mix of uppercase & lowercase letters",
      isValid: /[a-z]/.test(password) && /[A-Z]/.test(password),
    },
    {
      text: "Minimum 8 characters long",
      isValid: password.length >= 8,
    },
    {
      text: "Contain at least 1 number",
      isValid: /\d/.test(password),
    },
  ];

  const isPasswordValid = conditions.every((condition) => condition.isValid);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPasswordValid) {
      setPasswordError(true);
      return;
    }
    setPasswordError(false);
    setLoading(true);
    dispatch(userRegister(username, email, password));
  };

  useEffect(() => {
    if (registrationMessage) {
      setLoading(false);
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    }
    if (error) {
      setLoading(false);
    }
  }, [registrationMessage]);

  return (
    <div
      className={cn("flex flex-col justify-center gap-6", className)}
      {...props}
    >
      <Card className="bg-white dark:bg-[#18181B]">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Signup</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Already have an account?{" "}
            <a
              href="/login"
              className="underline underline-offset-4 text-black dark:text-white"
            >
              Log in
            </a>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label className="text-lg" htmlFor="email">
                  Name
                </Label>
                <div className="relative">
                  <Input
                    id="username"
                    type="text"
                    required
                    className="h-12 text-lg"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label className="text-lg" htmlFor="email">
                  Email
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    required
                    className="h-12 text-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label className="text-lg" htmlFor="password">
                    Password
                  </Label>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="h-12 text-lg pr-12"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700 p-3 rounded-lg transition"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
                  </Button>
                </div>
                {passwordError && (
                  <p className="text-red-500">Password does not meet requirements.</p>
                )}
              </div>
              <ul className="text-lg">
                {conditions.map((condition, index) => (
                  <li
                    key={index}
                    className={`flex items-center gap-2 px-2 py-1 rounded-md ${
                      condition.isValid
                        ? "text-green-400"
                        : "text-gray-400"
                    }`}
                  >
                    {condition.isValid ? (
                      <CheckIcon size={16} className="text-green-400" />
                    ) : (
                      <Dot size={16} className="text-gray-400" />
                    )}
                    {condition.text}
                  </li>
                ))}
              </ul>
              {registrationMessage && <p className="text-green-500">{registrationMessage}</p>}
              {error && <p className="text-red-500">{error}</p>}
              <Button type="submit" className="w-full h-12 text-lg">
                {loading ? "Signing up..." : "Create account"}
              </Button>
              <div className="relative flex items-center gap-x-1">
                <div className="flex-1 border-t border-gray-500"></div>
                <p className="px-1 text-lg text-muted-foreground">
                  Or continue with
                </p>
                <div className="flex-1 border-t border-gray-500"></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="flex items-center justify-center w-full h-12 text-lg gap-2"
                >
                  <FcGoogle size={22} />
                  Google
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center justify-center w-full h-12 text-lg gap-2"
                >
                  <FaMicrosoft size={22} className="text-blue-600" />
                  Microsoft
                </Button>
              </div>
            </div>
            <div className="mt-6 text-md text-muted-foreground">
              By signing up, you agree to our{" "}
              <a
                href="#"
                className="underline underline-offset-4 text-black dark:text-white"
              >
                Terms of Use
              </a>
              {" "}and Privacy Policy. Need help?{" "}
              <a
                href="#"
                className="underline underline-offset-4 text-black dark:text-white"
              >
                Get in touch.
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
