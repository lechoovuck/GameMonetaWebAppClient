// SERVER INTERFACES
export interface ISubcategoryRes {
  subcategories: Subcategory[];
  success: boolean;
}

export interface ISubcategoryByIdRes {
  data: Subcategory;
  success: boolean;
}
