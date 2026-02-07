import SellerStatics from "@/components/modules/sellerDashboard/sellerChart";
import { statistics } from "@/services/statistics.service";
import { notFound } from "next/navigation";
import React from "react";

const AdminDashboard = async () => {
  const { data, error } = await statistics.getSellerStatistics();

  console.log(data);

  const getData = data?.data;

  return <SellerStatics error={error} data={getData}></SellerStatics>;
};

export default AdminDashboard;
