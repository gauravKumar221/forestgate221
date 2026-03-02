'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { format, parseISO } from 'date-fns';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MoreHorizontal, Eye, CheckCircle, XCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const allBookings = [
  {
    id: 'HH-CANCELLABLE',
    userName: 'Rohan Mehta',
    userEmail: 'rohan.mehta@example.com',
    bookingType: 'Deluxe Room',
    checkIn: new Date(new Date().setDate(new Date().getDate() + 15)).toISOString().split('T')[0],
    checkOut: new Date(new Date().setDate(new Date().getDate() + 20)).toISOString().split('T')[0],
    guests: 2,
    totalPrice: 75000,
    status: 'Upcoming',
  },
  {
    id: 'HH-NON-CANCELLABLE',
    userName: 'Priya Desai',
    userEmail: 'priya.desai@example.com',
    bookingType: 'Entire Resort',
    checkIn: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString().split('T')[0],
    checkOut: new Date(new Date().setDate(new Date().getDate() + 9)).toISOString().split('T')[0],
    guests: 15,
    totalPrice: 228000,
    status: 'Upcoming',
  },
  {
    id: 'HH-3G8H9I',
    userName: 'The Sharma Family',
    userEmail: 'sharma.family@example.com',
    bookingType: 'Family Room',
    checkIn: '2024-05-20',
    checkOut: '2024-05-25',
    guests: 4,
    totalPrice: 100000,
    status: 'Completed',
  },
  {
    id: 'HH-K2L3M4',
    userName: 'Anjali Verma',
    userEmail: 'anjali.verma@example.com',
    bookingType: 'Single Room',
    checkIn: '2024-04-15',
    checkOut: '2024-04-18',
    guests: 1,
    totalPrice: 30000,
    status: 'Cancelled',
  },
   {
    id: 'HH-5N6O7P',
    userName: 'Vikram Singh',
    userEmail: 'vikram.singh@example.com',
    bookingType: 'Double Room',
    checkIn: '2024-06-10',
    checkOut: '2024-06-15',
    guests: 2,
    totalPrice: 60000,
    status: 'Completed',
  },
];

export default function AdminOrdersPage() {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookingsList, setBookingsList] = useState(allBookings);

  const getBadgeVariant = (status) => {
    switch (status) {
      case 'Completed':
        return 'default';
      case 'Upcoming':
        return 'secondary';
      case 'Cancelled':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const updateStatus = (id, newStatus) => {
    setBookingsList(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-headline">Manage Orders</h1>
      </div>
      
      <Card>
          <CardHeader>
              <CardTitle>Guest Bookings</CardTitle>
              <CardDescription>View and manage all reservations made by guests.</CardDescription>
          </CardHeader>
          <CardContent>
              <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Booking ID</TableHead>
                            <TableHead>Guest</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Dates</TableHead>
                            <TableHead>Total Price</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bookingsList.map((booking) => (
                            <TableRow key={booking.id}>
                                <TableCell className="font-medium">{booking.id}</TableCell>
                                <TableCell>
                                    <div className="font-medium">{booking.userName}</div>
                                    <div className="text-sm text-muted-foreground">{booking.userEmail}</div>
                                </TableCell>
                                <TableCell>{booking.bookingType}</TableCell>
                                <TableCell>
                                    <div className="text-xs text-muted-foreground">In: {format(parseISO(booking.checkIn), 'MMM dd, yyyy')}</div>
                                    <div className="text-xs text-muted-foreground">Out: {format(parseISO(booking.checkOut), 'MMM dd, yyyy')}</div>
                                </TableCell>
                                <TableCell>₹{booking.totalPrice.toLocaleString()}</TableCell>
                                <TableCell>
                                    <Badge variant={getBadgeVariant(booking.status)}>
                                        {booking.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem onClick={() => setSelectedBooking(booking)}>
                                                <Eye className="mr-2 h-4 w-4" /> View Details
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={() => updateStatus(booking.id, 'Completed')}>
                                                <CheckCircle className="mr-2 h-4 w-4 text-primary" /> Mark Completed
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => updateStatus(booking.id, 'Cancelled')}>
                                                <XCircle className="mr-2 h-4 w-4 text-destructive" /> Cancel Booking
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
              </div>
          </CardContent>
      </Card>

      <Dialog open={!!selectedBooking} onOpenChange={(isOpen) => !isOpen && setSelectedBooking(null)}>
            <DialogContent className="sm:max-w-[625px]">
            {selectedBooking && (
                <>
                <DialogHeader>
                    <DialogTitle>Booking Details</DialogTitle>
                    <DialogDescription>
                    Full information for booking ID: {selectedBooking.id}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 items-center gap-4">
                        <p className="text-sm text-muted-foreground">Guest Name</p>
                        <p className="font-medium">{selectedBooking.userName}</p>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                        <p className="text-sm text-muted-foreground">Guest Email</p>
                        <p className="font-medium">{selectedBooking.userEmail}</p>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 items-center gap-4">
                        <p className="text-sm text-muted-foreground">Accommodation</p>
                        <p className="font-medium">{selectedBooking.bookingType}</p>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                        <p className="text-sm text-muted-foreground">Stay Dates</p>
                        <p className="font-medium">
                            {format(parseISO(selectedBooking.checkIn), 'MMM dd')} - {format(parseISO(selectedBooking.checkOut), 'MMM dd, yyyy')}
                        </p>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                        <p className="text-sm text-muted-foreground">Number of Guests</p>
                        <p className="font-medium">{selectedBooking.guests}</p>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 items-center gap-4">
                        <p className="text-sm text-muted-foreground">Total Paid</p>
                        <p className="font-bold text-xl">₹{selectedBooking.totalPrice.toLocaleString()}</p>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                        <p className="text-sm text-muted-foreground">Current Status</p>
                        <Badge variant={getBadgeVariant(selectedBooking.status)} className="w-fit">
                            {selectedBooking.status}
                        </Badge>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" variant="secondary" onClick={() => setSelectedBooking(null)}>
                        Close
                    </Button>
                </DialogFooter>
                </>
            )}
            </DialogContent>
      </Dialog>
    </div>
  );
}
