// components/EmployeeList.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';
import Swal from 'sweetalert2';
import Employee from '../model/Employee';

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await EmployeeService.getAllEmployees();
      setEmployees(data);
    };

    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this employee!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    });

    if (result.isConfirmed) {
      await EmployeeService.deleteEmployee(id);
      const updatedEmployees = employees.filter((employee) => employee.employeeId !== id);
      setEmployees(updatedEmployees);
      Swal.fire('Deleted!', 'Employee has been deleted.', 'success');
    }
  };

  return (
    <center>
        <div>
        <h1>Employee List</h1>
        <Link to="/insert"><button> Add Employee </button></Link>
        <br/><br/>
        <table border={1}>
            <thead>
            <tr>
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Department</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {employees.map((employee) => (
                <tr key={employee.employeeId}>
                <td>{employee.employeeId}</td>
                <td>{employee.employeeName}</td>
                <td>{employee.department}</td>
                <td>
                    <Link to={`/update/${employee.employeeId}`} >
                        <button> Edit </button>
                    </Link>&nbsp;
                    <button onClick={() => handleDelete(employee.employeeId)}> Delete </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    </center>
  );
};

export default EmployeeList;
