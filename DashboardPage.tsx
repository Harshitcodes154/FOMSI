import { useAppStore } from '@/lib/store';
import { Navigate } from 'react-router-dom';
import { DashboardSidebar } from '@/components/DashboardSidebar';
import CustomerDashboard from '@/components/dashboards/CustomerDashboard';
import EmployeeDashboard from '@/components/dashboards/EmployeeDashboard';
import AdminDashboard from '@/components/dashboards/AdminDashboard';

export default function DashboardPage() {
  const user = useAppStore((s) => s.user);
  if (!user) return <Navigate to="/auth" replace />;

  const DashComponent = user.role === 'admin' ? AdminDashboard : user.role === 'employee' ? EmployeeDashboard : CustomerDashboard;

  return (
    <div className="min-h-screen pt-16 flex">
      <DashboardSidebar />
      <main className="flex-1 p-4 md:p-8 overflow-auto">
        <DashComponent />
      </main>
    </div>
  );
}
