'use client';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useState, useEffect } from 'react';

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
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";


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

const OTPSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

const NewPasswordSchema = z.object({
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
    confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters." })
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
});


export default function LoginPage() {
    const { toast } = useToast();
    const router = useRouter();
    const headerImage = PlaceHolderImages.find((img) => img.id === 'about-resort');

    const [resetStep, setResetStep] = useState('email'); // 'email', 'otp', or 'newPassword'
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const form = useForm({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: { email: "", password: "" },
    });

    const forgotPasswordForm = useForm({
        resolver: zodResolver(ForgotPasswordSchema),
        defaultValues: { email: "" },
    });

    const otpForm = useForm({
        resolver: zodResolver(OTPSchema),
        defaultValues: { pin: "" },
    });

    const newPasswordForm = useForm({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: { password: "", confirmPassword: "" },
    });

    // Reset flow when dialog closes
    useEffect(() => {
        if (!isDialogOpen) {
            // Delay to allow animation
            setTimeout(() => {
                setResetStep('email');
                forgotPasswordForm.reset();
                otpForm.reset();
                newPasswordForm.reset();
            }, 200);
        }
    }, [isDialogOpen, forgotPasswordForm, otpForm, newPasswordForm]);

    async function onLoginSubmit(data) {
        console.log(data);
        toast({ title: "Login Successful!", description: "Welcome back." });
        router.push('/my-bookings');
    }

    function onForgotPasswordSubmit(data) {
        console.log("Forgot password for:", data.email);
        toast({
            title: "OTP Sent",
            description: `An OTP has been sent to ${data.email}.`,
        });
        setResetStep('otp');
    }

    function onOtpSubmit(data) {
        console.log("OTP submitted:", data.pin);
        // Dummy validation for demo purposes - always succeeds
        toast({
            title: "OTP Verified!",
            description: "Please enter your new password.",
        });
        setResetStep('newPassword');
    }
    
    function onNewPasswordSubmit(data) {
        console.log("New password set:", data.password);
        toast({
            title: "Password Reset Successful!",
            description: "You can now log in with your new password.",
        });
        setIsDialogOpen(false); // Close the dialog on final success
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
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                             {resetStep === 'email' && (
                                <>
                                    <DialogHeader>
                                        <DialogTitle>Reset Your Password</DialogTitle>
                                        <DialogDescription>
                                            Enter your email address and we'll send you an OTP to reset your password.
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
                                                    {forgotPasswordForm.formState.isSubmitting ? "Sending..." : "Send OTP"}
                                                </Button>
                                            </DialogFooter>
                                        </form>
                                    </Form>
                                </>
                            )}
                            {resetStep === 'otp' && (
                                <>
                                    <DialogHeader>
                                        <DialogTitle>Enter OTP</DialogTitle>
                                        <DialogDescription>
                                            Please enter the 6-digit OTP sent to your email.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <Form {...otpForm}>
                                        <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-6">
                                            <div className="flex justify-center">
                                                <FormField
                                                    control={otpForm.control}
                                                    name="pin"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="sr-only">One-Time Password</FormLabel>
                                                            <FormControl>
                                                                <InputOTP maxLength={6} {...field}>
                                                                    <InputOTPGroup>
                                                                        <InputOTPSlot index={0} />
                                                                        <InputOTPSlot index={1} />
                                                                        <InputOTPSlot index={2} />
                                                                        <InputOTPSlot index={3} />
                                                                        <InputOTPSlot index={4} />
                                                                        <InputOTPSlot index={5} />
                                                                    </InputOTPGroup>
                                                                </InputOTP>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <DialogFooter>
                                                <Button type="button" variant="secondary" onClick={() => setResetStep('email')}>Back</Button>
                                                <Button type="submit" disabled={otpForm.formState.isSubmitting}>
                                                    {otpForm.formState.isSubmitting ? "Verifying..." : "Verify OTP"}
                                                </Button>
                                            </DialogFooter>
                                        </form>
                                    </Form>
                                </>
                            )}
                            {resetStep === 'newPassword' && (
                                <>
                                    <DialogHeader>
                                        <DialogTitle>Set New Password</DialogTitle>
                                        <DialogDescription>
                                            Enter and confirm your new password.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <Form {...newPasswordForm}>
                                        <form onSubmit={newPasswordForm.handleSubmit(onNewPasswordSubmit)} className="space-y-4 pt-4">
                                            <FormField
                                                control={newPasswordForm.control}
                                                name="password"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>New Password</FormLabel>
                                                        <FormControl>
                                                            <Input type="password" placeholder="••••••••" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={newPasswordForm.control}
                                                name="confirmPassword"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Confirm New Password</FormLabel>
                                                        <FormControl>
                                                            <Input type="password" placeholder="••••••••" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <DialogFooter>
                                                <Button type="button" variant="secondary" onClick={() => setResetStep('otp')}>Back</Button>
                                                <Button type="submit" disabled={newPasswordForm.formState.isSubmitting}>
                                                    {newPasswordForm.formState.isSubmitting ? "Saving..." : "Reset Password"}
                                                </Button>
                                            </DialogFooter>
                                        </form>
                                    </Form>
                                </>
                            )}
                        </DialogContent>
                    </Dialog>
                </div>
            </section>
        </div>
    );
}
