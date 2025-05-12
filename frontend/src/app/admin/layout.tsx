import { ReactNode } from 'react';
import AdminSidebar from '@/components/admin/Sidebar';
import AdminHeader from '@/components/admin/Header';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 lg:pl-[4.5rem] xl:pl-72 min-h-[calc(100vh-4rem)]">
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}