export interface User {
  id: string;
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  profilePicture?: {
    contentType: string;
    hasImage: boolean;
  };
}

export interface UserTableProps {
  displayedUsers: User[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
  setItemsPerPage: (items: number) => void;
  filteredUsers: User[];
  users: User[];
  setUsers: (users: User[]) => void;
}
