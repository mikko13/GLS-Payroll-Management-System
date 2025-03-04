// server/src/models/Employee.ts - Fixed Mongoose model for Employee
import mongoose, { Document, Schema } from "mongoose";

// Interface for Employee document
export interface IEmployee extends Document {
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
  createdAt: Date;
  updatedAt: Date;
}

// Employee Schema
const EmployeeSchema: Schema = new Schema(
  {
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    middleName: { type: String },
    gender: {
      type: String,
      required: true,
    },
    position: { type: String, required: true },
    department: { type: String, required: true },
    dateStarted: { type: String, required: true },
    rate: { type: String, required: true },
    civilStatus: {
      type: String,
      required: true,
    },
    birthDate: { type: String, required: true },
    sss: { type: String },
    hdmf: { type: String },
    philhealth: { type: String },
    tin: { type: String },
    emailAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    contactNumber: { type: String, required: true },
    status: {
      type: String,
      required: true,
    },
    remarks: { type: String },
  },
  { timestamps: true }
);

// Create and export the model
const EmployeeModel = mongoose.model<IEmployee>("Employee", EmployeeSchema);
export default EmployeeModel;
