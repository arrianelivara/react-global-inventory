import { createJobRole } from 'apis/job-role.api';
import { useApi } from 'hooks/index';
import React from 'react';
import JobRoleModal from '../modal-job-role/job-role-modal.module';

const AddJobRoleModal = ({ addJobRoleModal, refreshList, requestState }) => {
    const { request } = useApi({
        api: createJobRole
    });

    const handleSubmit = async (params) => {
        try {
            console.log(params);
            await request(params);
            console.log("created")
            await refreshList(requestState);
        } catch (e) {

        }
    };
    return (<JobRoleModal 
        jobRoleModal={addJobRoleModal} 
        handleSubmit={handleSubmit} 
        initialState={null}
        />);
}
 
export default AddJobRoleModal;