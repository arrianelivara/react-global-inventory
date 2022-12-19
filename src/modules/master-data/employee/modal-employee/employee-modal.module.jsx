import { Modal } from 'antd';
import { DatePicker, Field, Input, Select, Text, TextArea } from 'components';
import lang from "translations"
import React, { useMemo, useCallback } from 'react'
import { useForm, useApi,useMount } from 'hooks/index';
import { initialFormState } from './employee-form.state';
import moment from "moment";
import { searchJobRole } from 'apis/job-role.api';
import { jobRolesOptions } from 'mappers/job-role.mapper';
import { searchWarehouse } from 'apis/warehouse.api';
import { warehouseOptions } from 'mappers/warehouse.mapper';

const EmployeeModal = ({ initialState, employeeModal, handleSubmit, refreshList, requestState }) => {

    const formState = useMemo(() => {
        return initialFormState(initialState || {});
    }, [initialState]);
  
    const { fields, modifyField, getFormValues, clearForm } = useForm({
      initialState: formState,
    });

    const { request,
        mappedData, loading } = useApi({
        api: searchJobRole,
        isArray: true,
        mapper: jobRolesOptions
    });

    const { request: requestWarehouses, loading: loadingWarehouse ,
        mappedData: warehouseData } = useApi({
        api: searchWarehouse,
        isArray: true,
        mapper: warehouseOptions
    });

    const fetchWarehouses = useCallback(
        (requestState) => {
            requestWarehouses(requestState);
        },
        [request]
    );

    useMount(() => {
        fetchJobRoles(requestState);
        fetchWarehouses(requestState);
    });

    const fetchJobRoles = useCallback(
        (requestState) => {
            request(requestState);
        },
        [request]
    );

    return (
        <Modal {...employeeModal} onCancel={() => employeeModal.close()} 
            bodyStyle={{
                paddingInline: '2rem'
            }}
            onOk={async() => {
                const params = getFormValues();
                const obj = {
                    id: params.id,
                    employee_id: params.employeeNo,
                    first_name: params.firstName,
                    middle_name: params.middleName,
                    last_name: params.lastName,
                    remarks: params.remarks,
                    start_date: params.startDate?.format('YYYY-MM-DD'),
                    end_date: params.endDate?.format('YYYY-MM-DD'),
                    email: params.email,
                    job_role: params.jobRole,
                    warehouse: params.warehouse
                }
                await handleSubmit(obj);
                employeeModal.close();
                clearForm();
                refreshList(requestState);
            }}>
                <Text label>Note: Fields with (<span className='text-red'>*</span>) are required.</Text>
                <div className='mt-md grid md:grid-cols-4 gap-3'>
                    <Field  {...fields.employeeNo} required>
                        <Input {...fields.employeeNo} onChange={modifyField}/>
                    </Field>
                    <Field {...fields.firstName} required>
                        <Input {...fields.firstName} onChange={modifyField}/>
                    </Field>
                    <Field  {...fields.middleName}>
                        <Input {...fields.middleName} onChange={modifyField} />
                    </Field>
                    <Field {...fields.lastName} onChange={modifyField} required>
                        <Input {...fields.lastName} onChange={modifyField}/>
                    </Field>
                </div>
                <div className='mt-sm grid md:grid-cols-4 gap-3'>
                    <Field {...fields.jobRole} className="col-span-2" required>
                        <Select loading={loading} {...fields.jobRole} onChange={modifyField} text={lang.selectJobRole} options={mappedData}></Select>
                    </Field>
                    <Field {...fields.warehouse} className="col-span-2" required>
                        <Select loading={loadingWarehouse} {...fields.warehouse} onChange={modifyField} text={lang.selectWarehouse} options={warehouseData}></Select>
                    </Field>
                </div>
                <Field {...fields.email} className="mt-sm" required>
                    <Input {...fields.email} onChange={modifyField}/>
                </Field>
                <div className='mt-sm'>
                    <Field {...fields.remarks} >
                        <TextArea {...fields.remarks} onChange={modifyField}/>
                    </Field>
                </div>
                <div className='mt-sm grid md:grid-cols-2 gap-3'>
                    <Field {...fields.startDate} required>
                        <DatePicker {...fields.startDate} disabled onChange={(name, value) => {
                                let startD = value;
                                if (!value) {
                                    startD = null;
                                } else {
                                    startD = moment(value)
                                }
                                modifyField("startDate", { value: value });
                            }}/>
                        </Field>
                        <Field {...fields.endDate}>
                            <DatePicker {...fields.endDate} onChange={(name, value) => {
                                let startD = fields.startDate.value;
                                let endD = value;
                                if (!value) {
                                    endD = null;
                                } else {
                                    endD = moment(value);
                                    if (endD.diff(startD, "days") < 1) {
                                        return;
                                    } else {
                                        modifyField("endDate", { value: endD });
                                    }
                                }
                            }}/>
                    </Field>
                </div>
                
        </Modal>
     );
}
 
export default EmployeeModal;