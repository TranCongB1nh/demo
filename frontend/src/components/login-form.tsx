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
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaMicrosoft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "@/Redux/actions/userAction";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, error } = useSelector((state: any) => state.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (error) {
      setErrorMessage(error);
      setIsLoading(false);
    }
  }, [error]);

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      await dispatch(userLogin(email, password));
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage("Email or password is not correct.");
    } finally {
      setIsLoading(false);
    }
  };

  // const onSubmit = (e) => {
  //   dispatch(userLogin(email, password))
  //     .then(() => {
  //       navigate("/dashboard");
  //     })
  //     .catch((error) => {
  //       if (error.response) {
  //         setErrorMessage("Email or password is not correct.");
  //       }
  //     });
  // };

  return (
    <div
      className={cn("flex flex-col justify-center gap-6", className)}
      {...props}
    >
      <Card className="bg-white dark:bg-[#18181B]">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Log in</CardTitle>
          <CardDescription className="text-md text-muted-foreground">
            Enter your details below to sign into your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label className="text-lg" htmlFor="email">
                  Email
                </Label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={22}
                  />
                  <Input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 text-lg pl-10"
                  />
                </div>
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label className="text-lg" htmlFor="password">
                    Password
                  </Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-lg underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={22}
                  />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 text-lg pl-10 pr-12"
                  />
                  <Button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700 p-3 rounded-lg transition"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
                  </Button>
                </div>
              </div>
              {errorMessage && (
                <div className="bg-destructive text-white text-lg p-3 rounded-lg text-center">
                  ⚠ {errorMessage}
                </div>
              )}
              <Button
                type="submit"
                className="w-full h-12 text-lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={20} />
                  </>
                ) : (
                  "Log in"
                )}
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

            <div className="mt-6 text-center text-lg text-muted-foreground">
              Don&apos;t have an account?{" "}
              <a
                href="/signup"
                className="underline underline-offset-4 text-black dark:text-white"
              >
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
