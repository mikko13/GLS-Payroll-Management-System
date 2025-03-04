// server/src/controllers/employeeController.ts - Fixed controller functions
import { Request, Response } from "express";
import EmployeeModel from "../models/Employee";

// Get all employees
export const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await EmployeeModel.find().sort({ createdAt: -1 });
    res.status(200).json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: "Failed to fetch employees", error });
  }
};

// Get employee by ID
export const getEmployeeById = async (req: Request, res: Response) => {
  try {
    const employee = await EmployeeModel.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(employee);
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).json({ message: "Failed to fetch employee", error });
  }
};

// Create new employee
export const createEmployee = async (req: Request, res: Response) => {
  try {
    const newEmployee = new EmployeeModel(req.body);
    await newEmployee.save();

    res.status(201).json({
      message: "Employee created successfully",
      employee: newEmployee,
    });
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(400).json({ message: "Failed to create employee", error });
  }
};

// Update employee
export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({
      message: "Employee updated successfully",
      employee: updatedEmployee,
    });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(400).json({ message: "Failed to update employee", error });
  }
};

// Delete employee
export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const deletedEmployee = await EmployeeModel.findByIdAndDelete(
      req.params.id
    );

    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({
      message: "Employee deleted successfully",
      employee: deletedEmployee,
    });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ message: "Failed to delete employee", error });
  }
};
