import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  Employee,
  EmployeeDocument,
} from '../../schemas/employee/employee.schema';

import { LoginAuth } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Employee.name) private emplyeeModel: Model<EmployeeDocument>,
  ) {}

  async findOne(employee: LoginAuth) {
    try {
      const { email, password } = employee;
      const findEmployee = await this.emplyeeModel.findOne({ email, password });
      if (!findEmployee) throw new NotFoundException('user was nont found!');
      return {
        data: findEmployee,
        status: 200,
      };
    } catch (err) {
      return {
        data: err,
        status: 403,
      };
    }
  }
}
