import { updateJobRole } from 'apis/job-role.api';
import { useApi } from 'hooks/index';
import React from 'react';
import JobRoleModal from '../modal-job-role/job-role-modal.module';

const EditJobRoleModal = ({ editJobRoleModal, selected, refreshList, requestState }) => {
    const { request } = useApi({
        api: updateJobRole
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

    return (<JobRoleModal 
        jobRoleModal={editJobRoleModal}
        handleSubmit={handleSubmit}
        initialState={selected}
        refreshList={refreshList} 
        requestState={requestState} />);
}
 
export default EditJobRoleModal;