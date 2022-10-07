import React from 'react'
import EmployeeModal from '../modal-employee/employee-modal.module';

const AddEmployeeModal = ({ addEmployeeModal, data, setData }) => {

    const handleSubmit = (employeeInfo) => {
        setData([...data, employeeInfo]);
    };

    return (
        <EmployeeModal employeeModal={addEmployeeModal} handleSubmit={handleSubmit} />
     );
}
 
export default AddEmployeeModal;