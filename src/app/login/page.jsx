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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
  } from "@/components/ui/dialog";

const LoginFormSchema = z.object({
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters."
    })
});

const ForgotPasswordSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
});

export default function LoginPage() {
    const { toast } = useToast();
    const router = useRouter();
    const headerImage = PlaceHolderImages.find((img) => img.id === 'about-resort');

    const form = useForm({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: { email: "", password: "" },
    });

    const forgotPasswordForm = useForm({
        resolver: zodResolver(ForgotPasswordSchema),
        defaultValues: { email: "" },
    });

    async function onLoginSubmit(data) {
        console.log(data);
        toast({ title: "Login Successful!", description: "Welcome back." });
        router.push('/my-bookings');
    }

    function onForgotPasswordSubmit(data) {
        console.log("Forgot password for:", data.email);
        toast({
            title: "Password Reset Email Sent",
            description: "If an account exists for this email, you will receive a link to reset your password.",
        });
        forgotPasswordForm.reset();
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
                    <Dialog>
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
                                                    <DialogTrigger asChild>
                                                        <Button
                                                            variant="link"
                                                            className="text-sm font-medium text-primary hover:underline p-0 h-auto"
                                                        >
                                                            Forgot Password?
                                                        </Button>
                                                    </DialogTrigger>
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
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Reset Your Password</DialogTitle>
                                <DialogDescription>
                                    Enter your email address and we'll send you a link to reset your password.
                                </DialogDescription>
                            </DialogHeader>
                            <Form {...forgotPasswordForm}>
                                <form onSubmit={forgotPasswordForm.handleSubmit(onForgotPasswordSubmit)} className="space-y-4 pt-4">
                                    <FormField
                                        control={forgotPasswordForm.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input type="email" placeholder="you@example.com" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button type="button" variant="secondary">Cancel</Button>
                                        </DialogClose>
                                        <Button type="submit" disabled={forgotPasswordForm.formState.isSubmitting}>
                                            {forgotPasswordForm.formState.isSubmitting ? "Sending..." : "Send Reset Link"}
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </Form>
                        </DialogContent>
                    </Dialog>
                </div>
            </section>
        </div>
    );
}
