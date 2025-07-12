// SERVER INTERFACES
export interface ICategoryAllRes {
  categories: Category[];
  success: boolean;
}

export interface ICategoryByIdRes {
  data: Category;
  success: boolean;
}
