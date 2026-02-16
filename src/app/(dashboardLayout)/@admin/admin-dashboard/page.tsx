import AdminChart from "@/components/modules/adminDashboard/adminChart";
import { statistics } from "@/services/statistics.service";
import { AdminStatisticsData } from "@/types/adminStatics";

const AdminDashboard = async () => {
  const { data, error } = await statistics.getAdminStatistics();

  if (error) {
  return <div>Failed to load admin statistics</div>;
}
if (!data) {
  return <div>No data found</div>;
}


  const getData = data?.data as AdminStatisticsData

  return <AdminChart error={error} data={getData}></AdminChart>;
};

export default AdminDashboard;
