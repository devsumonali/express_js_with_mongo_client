import Card from '@/components/ui/card';
import FromData from '@/components/ui/FromData';
import type { TUserData } from '@/lib/utils';

export default async function Home(): Promise<React.JSX.Element> {
     const res = await fetch('http://localhost:5000/users', {
          cache: 'no-store',
     });

     if (!res.ok) {
          throw new Error('Failed to fetch users');
     }

     const users: TUserData[] = await res.json();

     return (
          <div>
               <FromData />
               <Card users={users} />
          </div>
     );
}
