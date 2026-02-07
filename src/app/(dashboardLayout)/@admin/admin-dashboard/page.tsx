import AdminChart from "@/components/modules/adminDashboard/adminChart";
import { statistics } from "@/services/statistics.service";
import { AdminStatisticsData } from "@/types/adminStatics";
import React from "react";

const AdminDashboard = async () => {
  const { data, error } = await statistics.getAdminStatistics();

  const getData = data?.data as AdminStatisticsData

  return <AdminChart error={error} data={getData}></AdminChart>;
};

export default AdminDashboard;
