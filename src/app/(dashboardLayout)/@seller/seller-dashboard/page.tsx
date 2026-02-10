import SellerStatics from "@/components/modules/sellerDashboard/sellerChart";
import { statistics } from "@/services/statistics.service";

const AdminDashboard = async () => {
  const { data, error } = await statistics.getSellerStatistics();

if (!data || error) {
  return (
    <div className="flex items-center justify-center min-h-[300px]">
      <div className="w-full max-w-md rounded-lg border bg-muted/40 p-6 text-center">
        <p className="text-sm text-muted-foreground">
          No statistics data found.
        </p>
      </div>
    </div>
  );
}


  const getData = data?.data;

  return <SellerStatics error={error} data={getData}></SellerStatics>;
};

export default AdminDashboard;
