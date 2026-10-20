'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
     Dialog,
     DialogClose,
     DialogContent,
     DialogDescription,
     DialogFooter,
     DialogHeader,
     DialogTitle,
     DialogTrigger,
} from '@/components/ui/dialog';

import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';

import { Input } from '@/components/ui/input';

export function EditUser({ user }) {
     const router = useRouter();

     const [open, setOpen] = useState(false);
     const [loading, setLoading] = useState(false);

     const handleSubmit = async (e) => {
          e.preventDefault();

          const form = e.currentTarget;
          const formData = new FormData(form);
          const data = Object.fromEntries(formData.entries());

          try {
               setLoading(true);

               const res = await fetch(`http://localhost:5000/users/${user._id}`, {
                    method: 'PATCH',
                    headers: {
                         'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
               });

               if (!res.ok) {
                    throw new Error('Failed to update user');
               }

               const result = await res.json();

               console.log('User updated:', result);

               // Close dialog
               setOpen(false);

               // Refresh data
               router.refresh();
          } catch (error) {
               console.error('Update error:', error);
          } finally {
               setLoading(false);
          }
     };

     return (
          <Dialog open={open} onOpenChange={setOpen}>
               <DialogTrigger
                    render={
                         <button
                              type="button"
                              className="w-full cursor-pointer rounded-lg bg-indigo-50 px-4 py-2.5 text-sm font-medium text-indigo-600 transition-colors hover:bg-indigo-100"
                         >
                              Edit
                         </button>
                    }
               />

               <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                         <DialogTitle>Edit User</DialogTitle>

                         <DialogDescription>Update user information below.</DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit}>
                         <FieldGroup className="space-y-5">
                              {/* Name Field */}
                              <Field>
                                   <FieldLabel htmlFor={`name-${user._id}`}>Full Name</FieldLabel>

                                   <Input
                                        id={`name-${user._id}`}
                                        name="name"
                                        type="text"
                                        defaultValue={user.name}
                                        placeholder="Enter full name"
                                        className="h-12 w-full rounded-lg border border-gray-200 bg-gray-50 px-4"
                                   />
                              </Field>

                              {/* Email Field */}
                              <Field>
                                   <FieldLabel htmlFor={`email-${user._id}`}>
                                        Email Address
                                   </FieldLabel>

                                   <Input
                                        id={`email-${user._id}`}
                                        name="email"
                                        type="email"
                                        defaultValue={user.email}
                                        placeholder="name@example.com"
                                        className="h-12 w-full rounded-lg border border-gray-200 bg-gray-50 px-4"
                                   />
                              </Field>
                         </FieldGroup>

                         <DialogFooter className="mt-6">
                              <DialogClose
                                   render={
                                        <Button type="button" variant="outline" disabled={loading}>
                                             Cancel
                                        </Button>
                                   }
                              />

                              <Button
                                   type="submit"
                                   disabled={loading}
                                   className="cursor-pointer bg-indigo-600 text-white hover:bg-indigo-700"
                              >
                                   {loading ? 'Updating...' : 'Save Changes'}
                              </Button>
                         </DialogFooter>
                    </form>
               </DialogContent>
          </Dialog>
     );
}
