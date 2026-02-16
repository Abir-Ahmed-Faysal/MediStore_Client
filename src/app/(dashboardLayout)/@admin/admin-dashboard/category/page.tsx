import CategoryShowingTable from "@/components/modules/adminDashboard/categoryShowingTable";
import { AddNewCategory } from "@/components/modules/adminDashboard/create-category-dialog";
import { categoryServices } from "@/services/category.service";


const Category = async () => {
  const { data, error } = await categoryServices.getCategories();

  if (!data || error) {
    return (
      <div>
        <h1>internal error</h1>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Categories</h2>

        {/* Add button */}
        <AddNewCategory />
      </div>

      {/* Table */}
      <CategoryShowingTable data={data} />
    </div>
  );
};

export default Category;
