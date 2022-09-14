import { Button, DataTable, WrapperA } from 'components';
import { useForm, useModal } from 'hooks';
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import WarehouseSelection from 'modules/master-data/common/warehouse.module';
import React, { useMemo } from 'react';
import lang from "translations";
import { StyleType } from 'enums';
import initialFormState from 'modules/master-data/common/warehouse-state.module';
import AddJobRoleModal from '../add-job-role/add-job-role-modal.module';
import EditJobRoleModal from '../edit-job-role/edit-job-role-modal.module';
import { columns } from './columns';

const JobRoles = () => {
    const addJobRoleModal = useModal();
    const editJobRoleModal = useModal();

    const formState = useMemo(() => {
        return initialFormState();
    }, []);

    const { fields, modifyField } = useForm({ initialState: formState })

    return (<WrapperA 
        title={lang.jobRoles} 
        description={lang.listOfJobRoles}
        actionButtons={
            <div className="mt-md">
                <Button iconPrefix={<PlusOutlined className="mr-sm" />} className="mr-sm"
                    onClick={() => {
                        addJobRoleModal.show({
                            title: lang.addJobRole,
                            okText: lang.add,
                            width: "50%"
                        })
                    }}>
                    {lang.add}
                </Button>
                <Button iconPrefix={<EditOutlined className="mr-sm"/>} 
                        type={StyleType.Secondary}
                        onClick={() => {
                            editJobRoleModal.show({
                                title: lang.updateExistingJobRole,
                                okText: lang.save,
                                width: "50%"
                            })
                        }}
                    >{lang.update}
                </Button>
            </div>
        }
        filterButtons={
            <WarehouseSelection field={fields.warehouse} modifyField={modifyField}/>
        }>
        <DataTable data={[]} columns={columns}/>
        <AddJobRoleModal addJobRoleModal={addJobRoleModal}/>
        <EditJobRoleModal  editJobRoleModal={editJobRoleModal}/>
    </WrapperA>);
}
 
export default JobRoles;