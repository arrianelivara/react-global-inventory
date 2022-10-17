import { updateEmployee } from 'apis/employee.api';
import { useApi } from 'hooks/index';
import React from 'react'
import EmployeeModal from '../modal-employee/employee-modal.module';

const EditEmployeeModal = ({ editEmployeeModal, selected, refreshList, requestState }) => {

    const { request } = useApi({
        api: updateEmployee
    });

    const handleSubmit = async (params) => {
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
            initialState={selected}
            handleSubmit={handleSubmit}
            refreshList={refreshList} 
            requestState={requestState}
        />
     );
}
 
export default EditEmployeeModal;