import { CreateEmployeeDto } from '../../employee/dto/create-employee.dto';
export type LoginAuth = Pick<CreateEmployeeDto, 'email' | 'password'>;
