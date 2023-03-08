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
