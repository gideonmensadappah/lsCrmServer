import { CreateEmployeeDto } from '../dto/create-employee.dto';

export type Roll = 'Admin' | 'HR' | 'DEV' | '';

export class Employee extends CreateEmployeeDto {
  _id?: string;
  address?: string;
  roll: Roll;
  phone: string;
  img?: string;
  createdAt?: string;
}
