import { Modal } from 'antd';
import { DatePicker, Field, Input, Select, Text, TextArea } from 'components';
import lang from "translations"
import React, { useMemo, useCallback } from 'react'
import { useForm, useApi,useMount } from 'hooks/index';
import { initialFormState } from './employee-form.state';
import moment from "moment";
import { searchJobRole } from 'apis/job-role.api';
import { jobRolesOptions } from 'mappers/job-role.mapper';

const EmployeeModal = ({ initialState, employeeModal, handleSubmit, refreshList, requestState }) => {

    const formState = useMemo(() => {
        return initialFormState(initialState ? Object.values(initialState)[0] : {});
    }, [initialState]);

    const { fields, modifyField, getFormValues, clearForm } = useForm({
      initialState: formState,
    });

    const { request, loading ,
        result: searchJobRolesResult = { metadata: [], total: 0, numPages: 0 },
        mappedData } = useApi({
        api: searchJobRole,
        isArray: true,
        mapper: jobRolesOptions
    });

    useMount(() => {
        fetchJobRoles(requestState);
    });

    const fetchJobRoles = useCallback(
        (requestState) => {
            request(requestState);
        },
        [request]
    );

    const prepareJobRoles = useCallback(() => {
        return mappedData;
    }, [mappedData]);

    const jobRoles = useMemo(() => {
        return prepareJobRoles();
    }, [prepareJobRoles]);

    return (
        <Modal {...employeeModal} onCancel={() => employeeModal.close()} 
            bodyStyle={{
                paddingInline: '2rem'
            }}
            onOk={() => {
                const params = getFormValues();
                const obj = {
                    employee_id: params.employeeNo,
                    first_name: params.firstName,
                    middle_name: params.middleName,
                    last_name: params.lastName,
                    remarks: params.remarks,
                    start_date: params.startDate?.format('YYYY-MM-DD'),
                    end_date: params.endDate?.format('YYYY-MM-DD'),
                }
                handleSubmit(obj);
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
                        <Select {...fields.jobRole} onChange={modifyField} text={lang.selectJobRole} options={mappedData}></Select>
                    </Field>
                    <Field {...fields.startDate} required>
                    <DatePicker {...fields.startDate} disabled onChange={(name, value) => {
                            let startD = value;
                            if (!value) {
                                startD = null;
                            } else {
                                startD = moment(startD)
                            }
                            modifyField("startDate", { value: startD });
                        }}></DatePicker>
                    </Field>
                    <Field {...fields.endDate}>
                        <DatePicker {...fields.endDate} onChange={(name, value) => {
                            let endD = value;
                            if (!value) {
                                endD = null;
                            } else {
                                endD = moment(endD)
                            }
                            modifyField("endDate", { value: endD });
                        }}></DatePicker>
                    </Field>
                </div>
                <div className='mt-sm'>
                    <Field {...fields.remarks}>
                        <TextArea {...fields.remarks} onChange={modifyField}/>
                    </Field>
                </div>
        </Modal>
     );
}
 
export default EmployeeModal;