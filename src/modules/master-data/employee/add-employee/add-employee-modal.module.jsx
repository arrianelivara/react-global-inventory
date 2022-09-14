import React from 'react'
import EmployeeModal from '../modal-employee/employee-modal.module';

const AddEmployeeModal = ({ addEmployeeModal }) => {
    return (
        <EmployeeModal employeeModal={addEmployeeModal} />
     );
}
 
export default AddEmployeeModal;