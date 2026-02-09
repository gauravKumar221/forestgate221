'use client';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { PageHeader } from "@/components/shared/PageHeader";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ProfileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  mobile: z.string().optional(),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  address: z.string().optional(),
});


function ProfileForm() {
    const { toast } = useToast();

    const form = useForm({
        resolver: zodResolver(ProfileFormSchema),
        defaultValues: {
            name: "John Doe",
            mobile: "+91 98765 43210",
            email: "john.doe@example.com",
            address: "123, Mountain View, Main Street, Manali",
        },
    });

    async function onSubmit(data) {
        toast({
            title: "Updating Profile...",
            description: "Your profile is being saved.",
        });
        console.log("Profile data:", data);
        toast({
            title: "Profile Updated!",
            description: "Your profile information has been updated.",
        });
    }
    
    return (
        <Card>
            <CardHeader className="flex flex-row items-center gap-4">
                 <Avatar className="h-16 w-16">
                    <AvatarImage src={`https://i.pravatar.cc/150?u=john.doe@example.com`} />
                    <AvatarFallback>{form.getValues('name')?.substring(0, 2).toUpperCase() || 'HH'}</AvatarFallback>
                </Avatar>
                <div>
                    <CardTitle>My Profile</CardTitle>
                    <CardDescription>Update your personal information and preferences.</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField control={form.control} name="name" render={({ field }) => ( <FormItem> <FormLabel>Full Name</FormLabel> <FormControl><Input placeholder="John Doe" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                            <FormField control={form.control} name="mobile" render={({ field }) => ( <FormItem> <FormLabel>Mobile Number</FormLabel> <FormControl><Input placeholder="+91 987 654 3210" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                        </div>
                        
                        <FormField control={form.control} name="email" render={({ field }) => ( <FormItem> <FormLabel>Email Address</FormLabel> <FormControl><Input placeholder="you@example.com" {...field} /></FormControl> <FormMessage /> </FormItem> )} />

                        <FormField control={form.control} name="address" render={({ field }) => ( <FormItem> <FormLabel>Address</FormLabel> <FormControl><Textarea placeholder="123, Mountain View, Main Street, Manali" {...field} /></FormControl> <FormMessage /> </FormItem> )} />

                        <Button type="submit" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}

export default function ProfilePage() {
    const headerImage = PlaceHolderImages.find((img) => img.id === 'about-resort');
    
    return (
        <div>
            {headerImage && (
                <PageHeader
                title="My Profile"
                subtitle="Manage your account details and preferences."
                imageUrl={headerImage.imageUrl}
                imageHint={headerImage.imageHint}
                />
            )}

            <section>
                <div className="container mx-auto px-4 max-w-2xl">
                   <ProfileForm />
                </div>
            </section>
        </div>
    );
}
