export type Course = {
  id: string;
  name: string;
  type: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
  active: true;
  adminId: string;
  info?: any;
  createdAt: Date;
  updatedAt: Date;
};

export type Company = {
  contactEmail: string | null;
  contactName: string | null;
  createdAt: string;
  id: string;
  name: string;
  telephoneNumber: string | null;
  updatedAt: string;
  address: string | null;
};

export type Result = {
  candidateId: string;
  course: Course[] | any;
  courseId: string;
  createdAt: string;
  id: string;
  updatedAt: string;
  expiryDate: string | null;
  passDate: string | null;
};
