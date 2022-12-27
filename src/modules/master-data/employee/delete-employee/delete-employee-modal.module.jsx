import { batchDeleteEmployee, deleteEmployee } from 'apis/employee.api';
import { Modal } from "antd";
import { useApi } from 'hooks/index';
import React from 'react';
import lang from "translations";
import { Text, Title } from 'components/index';

const DeleteEmployeeModal = ({ deleteEmployeeModal, selected, refreshList, requestState }) => {

    // const { request: requestDeleteEmployee } = useApi({
    //     api: deleteBrand
    // });

    const { request: requestDeleteEmployees } = useApi({
        api: batchDeleteEmployee
    });

    return (<Modal
        {...deleteEmployeeModal}
        title={lang.deleteEmployee}
        okText={lang.delete}
        cancelText='Cancel'
        onOk={() => {
            const ids = Object.values(selected).map((s) => s.id);
            try {
                requestDeleteEmployees({ ids: ids });
                refreshList(requestState);
                deleteEmployeeModal.close();
            } catch (e){
                console.log("error");
                deleteEmployeeModal.close();
            }
        }}
        onCancel={() => {
            deleteEmployeeModal.close();
        }}
        >
            <Text className="ml-sm my-md ">Are you sure you want to delete the following employee/s:</Text>
            {Object.values(selected).map((s) => {
                return <Title className="ml-sm">{`- ${s.firstName} ${s.lastName} (${s.employeeNo})`}</Title>
            })}
        </Modal>);
}
 
export default DeleteEmployeeModal;