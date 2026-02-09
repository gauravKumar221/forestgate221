'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { format, parseISO, subDays } from 'date-fns';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';


const subscribers = [
  {
    id: 'sub-1',
    email: 'subscriber.one@example.com',
    subscribedAt: subDays(new Date(), 2).toISOString(),
  },
  {
    id: 'sub-2',
    email: 'another.fan@example.com',
    subscribedAt: subDays(new Date(), 5).toISOString(),
  },
  {
    id: 'sub-3',
    email: 'travel.lover@example.com',
    subscribedAt: subDays(new Date(), 10).toISOString(),
  },
  {
    id: 'sub-4',
    email: 'mountain.explorer@example.com',
    subscribedAt: subDays(new Date(), 15).toISOString(),
  },
    {
    id: 'sub-5',
    email: 'newsletter.reader@example.com',
    subscribedAt: subDays(new Date(), 20).toISOString(),
    },
];

export default function SubscribersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">Subscribers</h1>
      
      <Card>
          <CardHeader>
              <CardTitle>All Subscribers</CardTitle>
              <CardDescription>A list of all users subscribed to the newsletter.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative w-full overflow-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Email</TableHead>
                            <TableHead className="text-right">Subscription Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {subscribers.map((subscriber) => (
                            <TableRow key={subscriber.id}>
                                <TableCell>
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-9 w-9">
                                          <AvatarFallback>{subscriber.email.charAt(0).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        <div className="font-medium">{subscriber.email}</div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    {format(parseISO(subscriber.subscribedAt), 'MMM dd, yyyy')}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
          </CardContent>
      </Card>
    </div>
  );
}
