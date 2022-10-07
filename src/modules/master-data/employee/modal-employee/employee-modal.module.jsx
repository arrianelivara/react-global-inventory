import { Modal } from 'antd';
import { DatePicker, Field, Input, Select, Text, TextArea } from 'components';
import lang from "translations"
import React, { useMemo } from 'react'
import { useForm } from 'hooks/index';
import { initialFormState } from './employee-form.state';

const EmployeeModal = ({ initialState, employeeModal, handleSubmit }) => {

    const formState = useMemo(() => {
        return initialFormState(initialState);
    }, [initialState]);

    const { fields, modifyField, getFormValues, clearForm } = useForm({
      initialState: formState,
    });

    const jobRole = [
        {
           value: "Manager",
           text: "Manager" 
        },
        {
            value: "Staff",
            text: "Staff" 
        }
    ]

    return (
        <Modal {...employeeModal} onCancel={() => employeeModal.close()} 
            bodyStyle={{
                paddingInline: '2rem'
            }}
            onOk={() => {
                const params = getFormValues();
                
                const obj = {
                    ...params,
                    startDate: params.startDate?.format("YYYY-DD-MM"),
                    endDate: params.endDate?.format("YYYY-DD-MM"),
                }
                handleSubmit(obj);
                employeeModal.close();
                clearForm();
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
                        <Select {...fields.jobRole} onChange={modifyField} text={lang.selectJobRole} options={jobRole}></Select>
                    </Field>
                    <Field {...fields.startDate} required>
                        <DatePicker {...fields.startDate} onChange={(name, value) => {
                            modifyField("startDate", { value: value });
                        }}></DatePicker>
                    </Field>
                    <Field {...fields.endDate}>
                        <DatePicker {...fields.endDate} onChange={modifyField}></DatePicker>
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