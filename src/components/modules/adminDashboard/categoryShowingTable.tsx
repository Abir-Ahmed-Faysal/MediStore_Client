"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Category } from "@/types/category.type";
import { DeleteCategoryButton } from "./delete-category-button";
import { EditCategory } from "./edit-category-dialog";

export default function CategoryShowingTable({ data }: { data: Category[] }) {
   {console.log(data,"form the table data image check ");}
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Icon</TableHead>
          <TableHead>Category Name</TableHead>
          <TableHead>Medicines</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((category) => (
          <TableRow key={category.id}>
            <TableCell>
              
              {category.icon ? (
               
                <img
                  src={category.icon}
                  alt={category.category_name}
                  className="w-10 h-10 rounded object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded bg-muted flex items-center justify-center text-xs">
                  N/A
                </div>
              )}
            </TableCell>

            <TableCell className="font-medium">
              {category.category_name}
            </TableCell>

            <TableCell>
              {category._count.medicines}
            </TableCell>

            <TableCell className="text-center space-x-2">
              <EditCategory category={category} />
              <DeleteCategoryButton categoryId={category.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
