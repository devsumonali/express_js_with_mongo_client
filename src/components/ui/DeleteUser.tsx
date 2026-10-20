'use client';

import { Loader2, Trash2 } from 'lucide-react';
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

const DeleteUser = ({ id }) => {
     const router = useRouter();

     const [open, setOpen] = useState(false);
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState('');

     const handleDeleteUser = async () => {
          try {
               setLoading(true);
               setError('');

               const res = await fetch(`http://localhost:5000/users/${id}`, {
                    method: 'DELETE',
               });

               if (!res.ok) {
                    throw new Error('Failed to delete user');
               }

               const result = await res.json();

               // Close dialog
               setOpen(false);

               // Refresh user list
               router.refresh();
          } catch (error) {
               console.error('Delete error:', error);
               setError('Unable to delete user. Please try again.');
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
                              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
                         >
                              <Trash2 size={16} />
                              Delete
                         </button>
                    }
               />

               <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                         <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600">
                              <Trash2 size={24} />
                         </div>

                         <DialogTitle className="text-xl font-semibold">Delete User?</DialogTitle>

                         <DialogDescription>
                              Are you sure you want to delete this user? This action cannot be
                              undone.
                         </DialogDescription>
                    </DialogHeader>

                    {error && (
                         <p role="alert" className="text-sm text-red-600">
                              {error}
                         </p>
                    )}

                    <DialogFooter className="mt-5">
                         <DialogClose
                              render={
                                   <Button type="button" variant="outline" disabled={loading}>
                                        Cancel
                                   </Button>
                              }
                         />

                         <Button
                              type="button"
                              onClick={handleDeleteUser}
                              disabled={loading}
                              className="cursor-pointer bg-red-600 text-white hover:bg-red-700"
                         >
                              {loading ? (
                                   <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Deleting...
                                   </>
                              ) : (
                                   <>
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Delete User
                                   </>
                              )}
                         </Button>
                    </DialogFooter>
               </DialogContent>
          </Dialog>
     );
};

export default DeleteUser;
