'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/Sidebar';
import AdminHeader from '@/components/admin/Header';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const user = localStorage.getItem('user');

    if (!user) {
      router.replace('/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(user);
      console.log('User object:', parsedUser);

      if (parsedUser?.role === 'ADMIN') {
        setAuthorized(true);
      } else {
        router.replace('/unauthorized');
      }
    } catch (err) {
      router.replace('/login');
    }
  }, [router]);

  if (authorized === null) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 lg:pl-[4.5rem] xl:pl-72 min-h-[calc(100vh-4rem)]">
          <div className="p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
