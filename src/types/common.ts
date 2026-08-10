export interface ApiResponse<T> {
  success: boolean;

  message: string;

  data: T;
}

export interface DropdownItem {
  id: number;

  name: string;
}