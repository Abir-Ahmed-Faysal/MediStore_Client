// shared api response
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// entity
export interface Category {
  id: string;
  category_name: string;
  icon: string;
  _count: {
    medicines: number;
  };
}

// create
export interface CreateCategoryPayload {
  category_name: string;
  icon: string;
}

// update (PATCH → partial)
export type UpdateCategoryPayload = Partial<CreateCategoryPayload>;

// standard service result
export interface ServiceResult<T> {
  data: T | null;
  error: { message: string } | null;
}
