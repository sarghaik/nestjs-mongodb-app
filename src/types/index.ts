export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface Company {
  id: string;
  name: string;
  address: string;
  contactNumber: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  companyId: string;
  userId: string;
}