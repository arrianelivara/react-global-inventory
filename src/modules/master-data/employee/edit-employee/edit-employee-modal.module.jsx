import { getEmployeeById, updateEmployee } from 'apis/employee.api';
import { useApi } from 'hooks/index';
import { employeeData } from 'mappers/employee.mapper';
import React, { useEffect } from 'react'
import EmployeeModal from '../modal-employee/employee-modal.module';

const EditEmployeeModal = ({ editEmployeeModal, refreshList, requestState, initialState = {}, ...props }) => {
    
    const { request } = useApi({
        api: updateEmployee
    });

    const handleSubmit = async (params) => {
        console.log(params)
        try {
            const id = params.id;
            console.log(id, params)
            await request({ id, body: params });
            console.log("updated")
        } catch (e) {

        }
    };
    
    return (
        <EmployeeModal 
            employeeModal={editEmployeeModal} 
            initialState={initialState}
            handleSubmit={handleSubmit}
            refreshList={refreshList} 
            requestState={requestState}
            {...props}
        />
     );
}
 
export default EditEmployeeModal;