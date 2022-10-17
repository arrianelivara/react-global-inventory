import { createEmployee } from 'apis/employee.api';
import { useApi } from 'hooks/index';
import React from 'react'
import EmployeeModal from '../modal-employee/employee-modal.module';

const AddEmployeeModal = ({ addEmployeeModal, refreshList, requestState }) => {

    const { request } = useApi({
        api: createEmployee
    });

    const handleSubmit = async (params) => {
        try {
            await request(params);
        } catch (e) {
            console.log("errorrr");
        }
    };

    return (
        <EmployeeModal 
            employeeModal={addEmployeeModal} 
            handleSubmit={handleSubmit} 
            refreshList={refreshList} 
            requestState={requestState}
            initialState={null}
        />
     );
}
 
export default AddEmployeeModal;