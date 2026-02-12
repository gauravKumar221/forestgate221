"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuthContext } from "@/context/AuthContext";


const RegisterFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  password: z.string().min(6),
});

export default function RegisterPage() {
  const { toast } = useToast();
  const router = useRouter();
  const { register, loading } = useAuthContext();

  const form = useForm({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: { name: "", email: "", phone: "", password: "" },
  });

  const onRegisterSubmit = async (values) => {
    try {
      const res = await register(values);

      toast({
        title: "Registration successful",
        description: "Please login to continue",
      });

      router.push("/login");
    } catch (err) {
      toast({
        title: "Registration failed",
        description: err.message,
        variant: "destructive",
      });
      if (err.message === "You already exist") {
        setTimeout(() => {
          router.push("/login");
        }, 2000);
        toast({
          title: "Account already exists",
          description: "Redirecting to login...",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div>
      <div className=" bg-white flex mx-w-5xl m-auto justify-center ">

        {/* Left Side - Image */}
     
        <div className="hidden lg:block lg:w-[40%] relative bg-[url('https://images.pexels.com/photos/23533608/pexels-photo-23533608.jpeg')] m-6 rounded-[50px] bg-cover bg-center "></div>

        {/* Right Side - Registration Form */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-6 py-12 lg:px-12">
          <div className="w-full max-w-md">
            {/* Real Nest Logo */}
            <CardFooter className="justify-end p-0 mb-6">
              <Link
                href="/login"
                className=" font-semibold hover:text-primary p-3 px-6 bg-[#1A2E35] text-white rounded-[50px]"
              >
                Login
              </Link>
            </CardFooter>

            {/* Header */}
            <div className="text-center lg:text-left mb-8">
              <h2 className="text-2xl font-semibold text-[#1A2E35] mb-1">
                Register
              </h2>
              <p className="text-gray-600">Create your Real Nest account!</p>
            </div>

            <Card className="border-0 shadow-none">
              <CardContent className="space-y-6 p-0">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onRegisterSubmit)}
                    className="space-y-5"
                  >
                    <FormField
                      name="name"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Full Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="h-12 px-4 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A2E35] focus:border-transparent"
                              placeholder="John Doe"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      name="email"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Your Email
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              {...field}
                              className="h-12 px-4 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A2E35] focus:border-transparent"
                              placeholder="info.madhu786@gmail.com"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      name="phone"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Phone
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="h-12 px-4 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A2E35] focus:border-transparent"
                              placeholder="+1 (555) 000-0000"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      name="password"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Password
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              {...field}
                              className="h-12 px-4 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A2E35] focus:border-transparent"
                              placeholder="••••••••"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full h-12 text-base font-semibold bg-[#1A2E35] hover:bg-[#0F1E24] text-white rounded-lg transition-colors"
                      disabled={loading}
                    >
                      {loading ? "Registering..." : "Register"}
                    </Button>
                  </form>
                </Form>

                {/* Instan Login Section */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">
                      Instan Login
                    </span>
                  </div>
                </div>

                {/* Social Login Buttons */}
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full h-12 text-gray-700 border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-900 font-medium"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Sign in with Google
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
