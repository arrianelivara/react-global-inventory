import { Modal } from "antd";
import { useApi } from 'hooks/index';
import React from 'react';
import lang from "translations";
import { Text, Title } from 'components/index';
import { batchDeleteJobRole } from 'apis/job-role.api';

const DeleteJobRoleModal = ({ deleteJobRoleModal, selected, refreshList, requestState }) => {

    // const { request: requestDeleteJobRole } = useApi({
    //     api: deleteJobRole
    // });

    const { request: requestDeleteJobRoles } = useApi({
        api: batchDeleteJobRole
    });

    return (<Modal
        {...deleteJobRoleModal}
        title={lang.deleteJobRole}
        okText={lang.delete}
        cancelText='Cancel'
        onOk={async() => {
            const ids = Object.values(selected).map((s) => s.id);
            try {
                await requestDeleteJobRoles({ ids: ids });
                refreshList(requestState);
                deleteJobRoleModal.close();
            } catch (e){
                console.log("error");
                deleteJobRoleModal.close();
            }
        }}
        onCancel={() => {
            deleteJobRoleModal.close();
        }}
        >
            <Text className="ml-sm my-md ">Are you sure you want to delete the following item/s:</Text>
            {Object.values(selected).map((s) => {
                return <Title className="ml-sm">{`- ${s.jobRoleName}`}</Title>
            })}
        </Modal>);
}
 
export default DeleteJobRoleModal;