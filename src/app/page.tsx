import Card from '@/components/ui/card';
import FromData from '@/components/ui/FromData';

export default async function Home() {
     const res = await fetch('http://localhost:5000/users');
     const users = await res.json();

     return (
          <div>
               <FromData />
               <Card users={users} />
          </div>
     );
}
