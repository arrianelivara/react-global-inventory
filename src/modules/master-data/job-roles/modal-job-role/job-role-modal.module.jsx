import { Modal } from 'antd';
import { DatePicker, Field, Input, Text, TextArea } from 'components';
import { useForm } from 'hooks/index';
import React, { useMemo } from 'react'
import { initialFormState } from './job-role.form.state';
import moment from "moment";

const JobRoleModal = ({ jobRoleModal, initialState, handleSubmit }) => {
    const formState = useMemo(() => {
        return initialFormState(initialState ? Object.values(initialState)[0] : {});
    }, [initialState]);

    const { fields, modifyField, getFormValues, clearForm } = useForm({
      initialState: formState,
    });

    return (
        <Modal {...jobRoleModal} onCancel={() => jobRoleModal.close()} 
            bodyStyle={{
                paddingInline: '2rem'
            }}
            onOk={() => {
                const params = getFormValues();
                const obj = {
                    description: params.description,
                    job_role: params.jobRoleName,
                    start_date: params.startDate?.format('YYYY-DD-MM'),
                    end_date: params.endDate?.format('YYYY-DD-MM'),
                }
                handleSubmit(obj);
                jobRoleModal.close();
                clearForm();
            }}>
                <Text label>Note: Fields with (<span className='text-red'>*</span>) are required.</Text>
                <div className='mt-md'>
                    <Field {...fields.jobRoleName} required>
                        <Input {...fields.jobRoleName} onChange={modifyField} />
                    </Field>
                </div>
                <div className='mt-sm flex gap-2'>
                    <Field {...fields.startDate} required>
                        <DatePicker {...fields.startDate} onChange={(name, value) => {
                            modifyField("startDate", { value: moment(value) });
                        }}></DatePicker>
                    </Field>
                    <Field {...fields.endDate}>
                        <DatePicker {...fields.endDate} onChange={(name, value) => {
                            modifyField("endDate", { value: moment(value) });
                        }}></DatePicker>
                    </Field>
                </div>
                <div className='mt-sm'>
                    <Field {...fields.description}>
                        <TextArea {...fields.description} onChange={modifyField} />
                    </Field>
                </div>
        </Modal>
     );
}
 
export default JobRoleModal;