export interface Employee {
    id: string;
    lastName: string;
    firstName: string;
    middleName: string;
    gender: string;
    position: string;
    department: string;
    dateStarted: string;
    rate: string;
    civilStatus: string;
    birthDate: string;
    sss: string;
    hdmf: string;
    philhealth: string;
    tin: string;
    emailAddress: string;
    permanentAddress: string;
    contactNumber: string;
    status: string;
    remarks: string;
  }
  
  export interface EmployeeTableProps {
    displayedEmployees: Employee[];
    currentPage: number;
    setCurrentPage: (page: number) => void;
    itemsPerPage: number;
    setItemsPerPage: (items: number) => void;
    filteredEmployees: Employee[];
    employees: Employee[];
    setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
  }