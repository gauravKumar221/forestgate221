"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { CalendarIcon, Users } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

const BookingFormSchema = z.object({
  checkIn: z.date({
    required_error: "Check-in date is required.",
  }),
  checkOut: z.date({
    required_error: "Check-out date is required.",
  }),
  guests: z.string().min(1, "Number of guests is required."),
})

export function BookingForm() {
    const router = useRouter()

    const form = useForm({
        resolver: zodResolver(BookingFormSchema),
        defaultValues: {
            guests: "2",
        },
    })

    function onSubmit(data) {
        const params = new URLSearchParams()
        params.append("checkIn", format(data.checkIn, "yyyy-MM-dd"))
        params.append("checkOut", format(data.checkOut, "yyyy-MM-dd"))
        params.append("guests", data.guests)
        router.push(`/booking?${params.toString()}`)
    }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-9 gap-4 items-end">
        <div className="md:col-span-2 lg:col-span-3">
            <FormField
            control={form.control}
            name="checkIn"
            render={({ field }) => (
                <FormItem className="flex flex-col">
                <FormLabel>Check-in</FormLabel>
                <Popover>
                    <PopoverTrigger asChild>
                    <FormControl>
                        <Button
                        variant={"outline"}
                        className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                        )}
                        >
                        {field.value ? (
                            format(field.value, "PPP")
                        ) : (
                            <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                    </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0))
                        }
                        initialFocus
                    />
                    </PopoverContent>
                </Popover>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <div className="md:col-span-2 lg:col-span-3">
             <FormField
            control={form.control}
            name="checkOut"
            render={({ field }) => (
                <FormItem className="flex flex-col">
                <FormLabel>Check-out</FormLabel>
                <Popover>
                    <PopoverTrigger asChild>
                    <FormControl>
                        <Button
                        variant={"outline"}
                        className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                        )}
                        >
                        {field.value ? (
                            format(field.value, "PPP")
                        ) : (
                            <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                    </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => {
                            const checkInDate = form.getValues("checkIn");
                            if (!checkInDate) {
                                return date < new Date(new Date().setHours(0, 0, 0, 0));
                            }
                            return date <= checkInDate;
                        }
                        }
                        initialFocus
                    />
                    </PopoverContent>
                </Popover>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <div className="md:col-span-2 lg:col-span-1">
             <FormField
                control={form.control}
                name="guests"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Guests</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <Users className="h-4 w-4 opacity-50 mr-2" />
                            <SelectValue placeholder="Guests" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {[1, 2, 3, 4, 5, 6].map(g => <SelectItem key={g} value={String(g)}>{g}</SelectItem>)}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
            />
        </div>

        <Button type="submit" className="w-full md:col-span-2 lg:col-span-2 h-10">Check Availability</Button>
      </form>
    </Form>
  )
}
