'use client';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

const FromData = () => {
     const router = useRouter();

     const handleSubmit = async (e) => {
          e.preventDefault();

          const form = e.currentTarget;
          const formData = new FormData(form);
          const data = Object.fromEntries(formData.entries());

          try {
               const res = await fetch('http://localhost:5000/users', {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
               });

               if (!res.ok) {
                    throw new Error('Failed to add user');
               }

               const result = await res.json();

               // Reset form
               form.reset();

               // Refresh server component data
               router.refresh();
          } catch (error) {
               console.error(error);
          }
     };

     return (
          <div className="mx-auto mt-10 max-w-5xl px-4">
               <div className="mx-auto max-w-xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                    {/* Form Header */}
                    <div className="mb-6 flex items-center gap-4">
                         <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                              <span className="text-2xl font-bold">+</span>
                         </div>

                         <div>
                              <h2 className="text-xl font-bold text-gray-900">Add New User</h2>
                              <p className="mt-1 text-sm text-gray-500">
                                   Fill in the details to create a new user.
                              </p>
                         </div>
                    </div>

                    <div className="mb-6 border-t border-gray-100" />

                    {/* Form */}
                    <form onSubmit={handleSubmit}>
                         <FieldGroup className="space-y-5">
                              {/* Name Field */}
                              <Field>
                                   <FieldLabel
                                        htmlFor="fieldgroup-name"
                                        className="mb-2 text-sm font-semibold text-gray-700"
                                   >
                                        Full Name
                                   </FieldLabel>

                                   <Input
                                        id="fieldgroup-name"
                                        name="name"
                                        type="text"
                                        placeholder="Enter your full name"
                                        className="h-12 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 text-gray-900 transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                   />
                              </Field>

                              {/* Email Field */}
                              <Field>
                                   <FieldLabel
                                        htmlFor="fieldgroup-email"
                                        className="mb-2 text-sm font-semibold text-gray-700"
                                   >
                                        Email Address
                                   </FieldLabel>

                                   <Input
                                        id="fieldgroup-email"
                                        type="email"
                                        name="email"
                                        placeholder="name@example.com"
                                        className="h-12 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 text-gray-900 transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                   />
                              </Field>

                              {/* Submit Button */}
                              <Field className="pt-2">
                                   <Button
                                        type="submit"
                                        className="h-12 w-full cursor-pointer rounded-lg bg-indigo-600 font-semibold text-white shadow-sm transition-all hover:bg-indigo-700 hover:shadow-md"
                                   >
                                        Add User
                                   </Button>
                              </Field>
                         </FieldGroup>
                    </form>
               </div>
          </div>
     );
};

export default FromData;
