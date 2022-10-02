import { Button, DataTable, WrapperA } from 'components';
import { StyleType } from 'enums';
import React, { useState } from 'react'
import { columns } from './columns';
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { useForm, useModal } from "hooks";
import lang from "translations";
import AddEmployeeModal from '../add-employee/add-employee-modal.module';
import EditEmployeeModal from '../edit-employee/edit-employee-modal.module';
import WarehouseSelection from '../../common/warehouse.module';
import { useMemo } from 'react';
import initialFormState from '../../common/warehouse-state.module';
import { useMount } from 'hooks/index';

const EmployeeList = () => {
    const addEmployeeModal = useModal();
    const editEmployeeModal = useModal();
    const [data, setData] = useState([]);

    const sampleData = [
        {
            employeeNo: '000000001',
            lastName: 'Kathryn',
            middleName: 'Chandria',
            firstName: 'Bernardo',
            jobRole: 'Manager',
            startDate: '06/07/22 11:00AM',
            endDate: '06/07/22 11:00AM'
        },
        {
            employeeNo: '000000002',
            lastName: 'Padilla',
            middleName: 'Ford',
            firstName: 'Daniel',
            jobRole: 'Manager',
            startDate: '06/07/22 11:00AM',
            endDate: '-'
        },
    ]

    const formState = useMemo(() => {
        return initialFormState();
    }, []);

    const { fields, modifyField } = useForm({ initialState: formState })

    useMount(() => {
        setData(sampleData);
    });

    return (
        <WrapperA
            title={lang.employees}
            description={lang.listOfEmployees}
            actionButtons={
                <div className="mt-md">
                    <Button iconPrefix={<PlusOutlined className="mr-sm" />} className="mr-sm"
                        onClick={() => {
                            addEmployeeModal.show({
                                title: lang.registerNewEmployee,
                                okText: lang.add,
                                width: "50%"
                            })
                        }}>
                        {lang.add}
                    </Button>
                    <Button iconPrefix={<EditOutlined className="mr-sm"/>} 
                            type={StyleType.Secondary}
                            onClick={() => {
                                editEmployeeModal.show({
                                    title: lang.updateEmployeeInfo,
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
            <DataTable columns={columns} data={data} pageSize={10} total={sampleData.length}/>
            <AddEmployeeModal addEmployeeModal={addEmployeeModal}/>
            <EditEmployeeModal editEmployeeModal={editEmployeeModal} />
        </WrapperA>
    );
}
 
export default EmployeeList;