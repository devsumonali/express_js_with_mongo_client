import { TUserData } from '@/lib/utils';
import DeleteUser from './DeleteUser';
import { EditUser } from './EditUser';

interface TUserCardProps {
     users: TUserData[];
}

const Card = ({ users }: TUserCardProps) => {
     return (
          <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3">
               {users.map((user) => (
                    <div
                         key={user._id}
                         className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                         {/* User Details */}
                         <div className="flex items-center gap-3">
                              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-lg font-bold text-indigo-600">
                                   {user.name?.charAt(0).toUpperCase()}
                              </div>

                              <div className="min-w-0">
                                   <h2 className="truncate text-lg font-semibold text-gray-900">
                                        {user.name}
                                   </h2>
                                   <p className="truncate text-sm text-gray-500">{user.email}</p>
                              </div>
                         </div>

                         {/* Divider */}
                         <div className="my-5 border-t border-gray-100" />

                         {/* Action Buttons */}
                         <div className="flex gap-3">
                              <EditUser user={user} />
                              <DeleteUser id={user._id} />
                         </div>
                    </div>
               ))}
          </div>
     );
};

export default Card;
