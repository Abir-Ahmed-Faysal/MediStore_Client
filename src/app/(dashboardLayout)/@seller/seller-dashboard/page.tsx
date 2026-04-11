import SellerStatics from "@/components/modules/sellerDashboard/sellerChart";
import { statistics } from "@/services/statistics.service";

const SellerDashboard = async () => {
  const { data, error } = await statistics.getSellerStatistics();

  if (error) {
    return (
      <div className="rounded-lg border-2 border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/10 p-8 text-center">
        <p className="text-red-700 dark:text-red-400 font-medium">Failed to load seller statistics</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 p-12 text-center">
        <p className="text-slate-500 dark:text-slate-400 font-medium">No statistics data found</p>
      </div>
    );
  }

  const getData = data?.data;

  return <SellerStatics error={error} data={getData} />;
};

export default SellerDashboard;
