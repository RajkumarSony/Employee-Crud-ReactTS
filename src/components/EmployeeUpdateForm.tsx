// components/EmployeeUpdateForm.tsx
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';
import Swal from 'sweetalert2';
import Employee from '../model/Employee';

const EmployeeUpdateForm: React.FC = () => {
  const { employeeId } = useParams<{ employeeId: string }>();

  const [employee, setEmployee] = useState<Employee>({
    employeeId: 0,
    employeeName: '',
    department: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await EmployeeService.getEmployeeById(Number(employeeId));
        setEmployee(data || { employeeId: 0, employeeName: '', department: '' });
      } catch (error) {
        console.error('Error fetching employee:', error);
      }
    };

    fetchData();
  }, [employeeId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedEmployee = await EmployeeService.updateEmployee(
        Number(employeeId),
        employee
      );
      Swal.fire('Success!', 'Employee has been updated successfully.', 'success');
    } catch (error) {
      console.error('Error updating employee:', error);
      Swal.fire('Error!', 'Failed to update employee.', 'error');
    }
    navigate('/');
  };

  return (
    <center>
        <div>
        <h1>Edit Employee</h1>
        <form onSubmit={handleSubmit}>
            <div>
            <table>
                <tr>
                    <th><label htmlFor="employeeName"> Employee Name </label></th>
                    <td>
                        <input type="text" id="employeeName" name="employeeName" value={employee.employeeName}
                            onChange={handleChange} required/>
                    </td>
                </tr>
                <tr>
                    <th><label htmlFor="department"> Department </label></th>
                    <td>
                        <input type="text" id="department" name="department" value={employee.department}
                            onChange={handleChange} required/>
                    </td>
                </tr>
                <br/>
            </table>
            <div>
                <button type="submit">Update Employee </button>
                <br/>
                <Link to="/"> Cancel </Link>
            </div>
            </div>
        </form>
        </div>
    </center>
  );
};

export default EmployeeUpdateForm;
