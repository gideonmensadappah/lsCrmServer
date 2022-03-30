import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type EmployeeDocument = Employee & Document;

@Schema({ timestamps: true })
export class Employee {
  @Prop({ required: true })
  _id: Types.ObjectId;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  email: string;

  @Prop()
  language: string;

  @Prop()
  password: string;
  @Prop()
  address: string;

  @Prop()
  roll: string;

  @Prop()
  phone: string;

  @Prop()
  img: string;

  @Prop()
  createdAt: Date;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
