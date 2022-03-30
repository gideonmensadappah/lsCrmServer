import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import {
  Employee,
  EmployeeDocument,
} from '../../schemas/employee/employee.schema';
import { ObjectId } from 'mongodb';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private emplyeeModel: Model<EmployeeDocument>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    try {
      const newEmplyee = await new this.emplyeeModel({
        _id: new Types.ObjectId(),
        ...createEmployeeDto,
      }).save();

      return {
        data: newEmplyee,
        status: 200,
      };
    } catch (err) {
      return {
        data: err,
        status: 500,
      };
    }
  }

  async findAll() {
    try {
      const employees = await this.emplyeeModel.aggregate([
        { $project: { password: 0 } },
      ]);

      return {
        data: employees,
        status: 200,
      };
    } catch (err) {
      return { data: err, status: 500 };
    }
  }

  async findOne(id: string) {
    try {
      const emplyee = await this.emplyeeModel.findById(new ObjectId(id));
      return {
        data: emplyee,
        status: 200,
      };
    } catch (err) {
      return {
        data: err,
        status: 200,
      };
    }
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    try {
      const removedEmplyee = await this.emplyeeModel.updateOne(
        {
          _id: new ObjectId(id),
        },
        updateEmployeeDto,
      );

      if (!removedEmplyee) throw 'server was not able to update';

      return {
        data: removedEmplyee,
        status: 200,
      };
    } catch (err) {
      return {
        data: err,
        status: 500,
      };
    }
  }

  async remove(id: string) {
    try {
      const removedEmplyee = await this.emplyeeModel.deleteOne({
        _id: new ObjectId(id),
      });

      if (!removedEmplyee) throw 'server was not able to delete';

      return {
        data: removedEmplyee,
        status: 200,
      };
    } catch (err) {
      return {
        data: err,
        status: 500,
      };
    }
  }
}
