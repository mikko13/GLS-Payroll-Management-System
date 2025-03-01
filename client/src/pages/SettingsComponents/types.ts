// types.ts
export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export type HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => void;
