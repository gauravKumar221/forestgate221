'use client';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Link from 'next/link';
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PageHeader } from "@/components/shared/PageHeader";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const LoginFormSchema = z.object({
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters."
    })
});

export default function LoginPage() {
    const { toast } = useToast();
    const router = useRouter();
    const headerImage = PlaceHolderImages.find((img) => img.id === 'about-resort');

    const form = useForm({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: { email: "", password: "" },
    });

    async function onLoginSubmit(data) {
        console.log(data);
        toast({ title: "Login Successful!", description: "Welcome back." });
        router.push('/my-bookings');
    }

    return (
        <div>
            {headerImage && (
                <PageHeader
                title="Login"
                subtitle="Access your Himachal Haven account."
                imageUrl={headerImage.imageUrl}
                imageHint={headerImage.imageHint}
                />
            )}

            <section>
                <div className="container mx-auto px-4 max-w-lg">
                    <Card>
                        <CardHeader>
                            <CardTitle>Welcome Back</CardTitle>
                            <CardDescription>Enter your credentials to access your account.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onLoginSubmit)} className="space-y-6">
                                    <FormField control={form.control} name="email" render={({ field }) => ( <FormItem> <FormLabel>Email</FormLabel> <FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                                    <FormField control={form.control} name="password" render={({ field }) => ( 
                                        <FormItem> 
                                            <div className="flex items-center justify-between">
                                                <FormLabel>Password</FormLabel> 
                                                <Link href="/forgot-password"
                                                    className="text-sm font-medium text-primary hover:underline"
                                                >
                                                    Forgot Password?
                                                </Link>
                                            </div>
                                            <FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl> 
                                            <FormMessage /> 
                                        </FormItem> 
                                    )} />
                                    <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                                        {form.formState.isSubmitting ? 'Logging in...' : 'Login'}
                                    </Button>
                                </form>
                            </Form>
                        </CardContent>
                        <CardFooter className="justify-center">
                            <p className="text-sm text-muted-foreground">
                                Don't have an account? <Link href="/register" className="text-primary hover:underline">Register here</Link>
                            </p>
                        </CardFooter>
                    </Card>
                </div>
            </section>
        </div>
    );
}
