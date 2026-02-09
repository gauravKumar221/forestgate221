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
import { format, parseISO, subDays } from 'date-fns';
import { DollarSign, Users, Calendar, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

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


const chartData = [
  { date: format(subDays(new Date(), 6), 'MMM d'), bookings: 5 },
  { date: format(subDays(new Date(), 5), 'MMM d'), bookings: 7 },
  { date: format(subDays(new Date(), 4), 'MMM d'), bookings: 6 },
  { date: format(subDays(new Date(), 3), 'MMM d'), bookings: 9 },
  { date: format(subDays(new Date(), 2), 'MMM d'), bookings: 8 },
  { date: format(subDays(new Date(), 1), 'MMM d'), bookings: 11 },
  { date: format(new Date(), 'MMM d'), bookings: 10 },
];

export default function AdminDashboardPage() {
  const [selectedBooking, setSelectedBooking] = useState(null);

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

  const totalRevenue = allBookings.filter(b => b.status !== 'Cancelled').reduce((acc, b) => acc + b.totalPrice, 0);
  const totalBookings = allBookings.length;
  const upcomingBookings = allBookings.filter(b => b.status === 'Upcoming').length;
  const activeGuests = allBookings.filter(b => b.status === 'Upcoming').reduce((acc, b) => acc + b.guests, 0);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+5.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBookings}</div>
            <p className="text-xs text-muted-foreground">+12.1% from last month</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingBookings}</div>
            <p className="text-xs text-muted-foreground">+3 since yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Guests</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeGuests}</div>
            <p className="text-xs text-muted-foreground">+10 since last hour</p>
          </CardContent>
        </Card>
      </div>

       <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Booking Analytics</CardTitle>
              <CardDescription>Daily booking trends for the last 7 days.</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" tickLine={false} axisLine={false} dy={10} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}/>
                  <YAxis tickLine={false} axisLine={false} dx={-10} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      borderColor: 'hsl(var(--border))',
                      borderRadius: 'var(--radius)',
                    }}
                  />
                  <Line type="monotone" dataKey="bookings" stroke="hsl(var(--primary))" strokeWidth={2} dot={{r: 4, fill: 'hsl(var(--primary))'}} activeDot={{ r: 6 }}/>
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
               <CardDescription>The 5 most recent bookings.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {allBookings.slice(0, 5).map((booking) => (
                  <div key={booking.id} className="flex items-center gap-4">
                     <Avatar className="h-9 w-9">
                        <AvatarImage src={`https://i.pravatar.cc/150?u=${booking.userEmail}`} />
                        <AvatarFallback>{booking.userName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium leading-none">{booking.userName}</p>
                      <p className="text-sm text-muted-foreground">{booking.userEmail}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-sm font-medium">₹{booking.totalPrice.toLocaleString()}</p>
                        <p
                          className={`text-xs font-medium ${
                            booking.status === 'Completed'
                              ? 'text-primary'
                              : booking.status === 'Upcoming'
                              ? 'text-muted-foreground'
                              : 'text-destructive'
                          }`}
                        >
                          {booking.status}
                        </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
       </div>
      
       <Card>
          <CardHeader>
              <CardTitle>All Bookings</CardTitle>
              <CardDescription>A complete list of all bookings. Click an item to see details.</CardDescription>
          </CardHeader>
          <CardContent>
              {/* Desktop Table View */}
              <div className="hidden md:block">
                  <Table>
                      <TableHeader>
                          <TableRow>
                              <TableHead>Booking ID</TableHead>
                              <TableHead>User</TableHead>
                              <TableHead>Booking Type</TableHead>
                              <TableHead>Dates</TableHead>
                              <TableHead>Price</TableHead>
                              <TableHead className="text-right">Status</TableHead>
                          </TableRow>
                      </TableHeader>
                      <TableBody>
                          {allBookings.map((booking) => (
                              <TableRow
                                  key={booking.id}
                                  onClick={() => setSelectedBooking(booking)}
                                  className="cursor-pointer"
                              >
                                  <TableCell className="font-medium">{booking.id}</TableCell>
                                  <TableCell>
                                      <div className="font-medium">{booking.userName}</div>
                                      <div className="text-sm text-muted-foreground">{booking.userEmail}</div>
                                  </TableCell>
                                  <TableCell>{booking.bookingType}</TableCell>
                                  <TableCell>
                                      {format(parseISO(booking.checkIn), 'MMM dd, yyyy')} -{' '}
                                      {format(parseISO(booking.checkOut), 'MMM dd, yyyy')}
                                  </TableCell>
                                  <TableCell>₹{booking.totalPrice.toLocaleString()}</TableCell>
                                  <TableCell className="text-right">
                                      <Badge variant={getBadgeVariant(booking.status)}>
                                          {booking.status}
                                      </Badge>
                                  </TableCell>
                              </TableRow>
                          ))}
                      </TableBody>
                  </Table>
              </div>
              {/* Mobile Card View */}
              <div className="grid grid-cols-1 gap-4 md:hidden">
                  {allBookings.map((booking) => (
                      <Card 
                          key={booking.id} 
                          onClick={() => setSelectedBooking(booking)}
                          className="cursor-pointer"
                      >
                          <CardHeader>
                              <div className="flex justify-between items-start">
                                  <div>
                                      <CardTitle className="text-lg">{booking.userName}</CardTitle>
                                      <CardDescription>{booking.id}</CardDescription>
                                  </div>
                                  <Badge variant={getBadgeVariant(booking.status)}>
                                      {booking.status}
                                  </Badge>
                              </div>
                          </CardHeader>
                          <CardContent className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                  <span className="text-muted-foreground">Booking Type</span>
                                  <span className="font-medium">{booking.bookingType}</span>
                              </div>
                              <div className="flex justify-between">
                                  <span className="text-muted-foreground">Check-in</span>
                                  <span className="font-medium">{format(parseISO(booking.checkIn), 'MMM dd, yyyy')}</span>
                              </div>
                              <div className="flex justify-between">
                                  <span className="text-muted-foreground">Check-out</span>
                                  <span className="font-medium">{format(parseISO(booking.checkOut), 'MMM dd, yyyy')}</span>
                              </div>
                              <div className="flex justify-between">
                                  <span className="text-muted-foreground">Price</span>
                                  <span className="font-bold">₹{booking.totalPrice.toLocaleString()}</span>
                              </div>
                          </CardContent>
                      </Card>
                  ))}
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
                    Detailed information for booking ID: {selectedBooking.id}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 items-center gap-4">
                        <p className="text-sm text-muted-foreground">User Name</p>
                        <p className="font-medium">{selectedBooking.userName}</p>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                        <p className="text-sm text-muted-foreground">User Email</p>
                        <p className="font-medium">{selectedBooking.userEmail}</p>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 items-center gap-4">
                        <p className="text-sm text-muted-foreground">Booking Type</p>
                        <p className="font-medium">{selectedBooking.bookingType}</p>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                        <p className="text-sm text-muted-foreground">Check-in</p>
                        <p className="font-medium">{format(parseISO(selectedBooking.checkIn), 'MMM dd, yyyy')}</p>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                        <p className="text-sm text-muted-foreground">Check-out</p>
                        <p className="font-medium">{format(parseISO(selectedBooking.checkOut), 'MMM dd, yyyy')}</p>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                        <p className="text-sm text-muted-foreground">Guests</p>
                        <p className="font-medium">{selectedBooking.guests}</p>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 items-center gap-4">
                        <p className="text-sm text-muted-foreground">Total Price</p>
                        <p className="font-bold text-lg">₹{selectedBooking.totalPrice.toLocaleString()}</p>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                        <p className="text-sm text-muted-foreground">Status</p>
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
