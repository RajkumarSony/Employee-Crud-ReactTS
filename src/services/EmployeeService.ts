// services/EmployeeService.ts
import axios from 'axios';
import Employee from '../model/Employee';

const API_BASE_URL = 'http://localhost:8080'; // Replace with your Java API base URL

const EmployeeService = {
  getAllEmployees: async (): Promise<Employee[]> => {
    const response = await axios.get<Employee[]>(`${API_BASE_URL}/api/employees`);
    return response.data;
  },

  getEmployeeById: async (id: number): Promise<Employee | null> => {
    try {
      const response = await axios.get<Employee>(`${API_BASE_URL}/api/employees/${id}`);
      return response.data;
    } catch (error) {
      return null;
    }
  },

  createEmployee: async (employee: Employee): Promise<Employee> => {
    const response = await axios.post<Employee>(`${API_BASE_URL}/api/employees`, employee);
    return response.data;
  },

  updateEmployee: async (id: number, updatedEmployee: Employee): Promise<Employee | null> => {
    try {
      const response = await axios.put<Employee>(`${API_BASE_URL}/api/employees/${id}`, updatedEmployee);
      return response.data;
    } catch (error) {
      return null;
    }
  },

  deleteEmployee: async (id: number): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/api/employees/${id}`);
  },
};

export default EmployeeService;
