import React from 'react'
import EmployeeModal from '../modal-employee/employee-modal.module';

const EditEmployeeModal = ({ editEmployeeModal }) => {
    return (
        <EmployeeModal employeeModal={editEmployeeModal} />
     );
}
 
export default EditEmployeeModal;