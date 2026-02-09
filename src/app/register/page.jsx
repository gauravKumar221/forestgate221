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

const RegisterFormSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters."
    })
});

export default function RegisterPage() {
    const { toast } = useToast();
    const router = useRouter();
    const headerImage = PlaceHolderImages.find((img) => img.id === 'about-resort');
    
    const form = useForm({
        resolver: zodResolver(RegisterFormSchema),
        defaultValues: { name: "", email: "", password: "" },
    });

    async function onRegisterSubmit(data) {
        console.log(data);
        toast({ title: "Registration Successful!", description: "Welcome to Himachal Haven. Please log in." });
        router.push('/login');
    }

    return (
        <div>
            {headerImage && (
                <PageHeader
                title="Register"
                subtitle="Create your account to manage bookings and preferences."
                imageUrl={headerImage.imageUrl}
                imageHint={headerImage.imageHint}
                />
            )}

            <section>
                <div className="container mx-auto px-4 max-w-lg">
                    <Card>
                        <CardHeader>
                            <CardTitle>Create an Account</CardTitle>
                            <CardDescription>Join us and start planning your perfect getaway.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onRegisterSubmit)} className="space-y-6">
                                    <FormField control={form.control} name="name" render={({ field }) => ( <FormItem> <FormLabel>Full Name</FormLabel> <FormControl><Input placeholder="John Doe" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                                    <FormField control={form.control} name="email" render={({ field }) => ( <FormItem> <FormLabel>Email</FormLabel> <FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                                    <FormField control={form.control} name="password" render={({ field }) => ( <FormItem> <FormLabel>Password</FormLabel> <FormControl><Input type="password" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                                    <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                                        {form.formState.isSubmitting ? 'Registering...' : 'Register'}
                                    </Button>
                                </form>
                            </Form>
                        </CardContent>
                        <CardFooter className="justify-center">
                            <p className="text-sm text-muted-foreground">
                                Already have an account? <Link href="/login" className="text-primary hover:underline">Login here</Link>
                            </p>
                        </CardFooter>
                    </Card>
                </div>
            </section>
        </div>
    );
}
