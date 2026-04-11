import AdminChart from "@/components/modules/adminDashboard/adminChart";
import { statistics } from "@/services/statistics.service";
import { AdminStatisticsData } from "@/types/adminStatics";

const AdminDashboard = async () => {
  const { data, error } = await statistics.getAdminStatistics();

  if (error) {
    return (
      <div className="rounded-lg border-2 border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/10 p-8 text-center">
        <p className="text-red-700 dark:text-red-400 font-medium">Failed to load admin statistics</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 p-12 text-center">
        <p className="text-slate-500 dark:text-slate-400 font-medium">No data found</p>
      </div>
    );
  }

  const getData = data?.data as AdminStatisticsData;

  return <AdminChart error={error} data={getData} />;
};

export default AdminDashboard;
