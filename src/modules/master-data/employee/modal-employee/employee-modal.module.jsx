import { Modal } from 'antd';
import { DatePicker, Field, Input, Select, Text, TextArea } from 'components';
import lang from "translations"
import React from 'react'

const EmployeeModal = ({ employeeModal }) => {
    return (
        <Modal {...employeeModal} onCancel={() => employeeModal.close()} 
            bodyStyle={{
                paddingInline: '2rem'
            }}>
                <Text label>Note: Fields with (<span className='text-red'>*</span>) are required.</Text>
                <div className='mt-md grid md:grid-cols-4 gap-3'>
                    <Field label="Employee Number" required>
                        <Input />
                    </Field>
                    <Field label="First Name" required>
                        <Input />
                    </Field>
                    <Field label="Middle Name">
                        <Input />
                    </Field>
                    <Field label="Last Name" required>
                        <Input />
                    </Field>
                </div>
                <div className='mt-sm grid md:grid-cols-4 gap-3'>
                    <Field label="Job Role" className="col-span-2" required>
                        <Select text={lang.selectJobRole}></Select>
                    </Field>
                    <Field label="Start Date" required>
                        <DatePicker></DatePicker>
                    </Field>
                    <Field label="End Date">
                        <DatePicker></DatePicker>
                    </Field>
                </div>
                <div className='mt-sm'>
                    <Field label="Remarks">
                        <TextArea />
                    </Field>
                </div>
        </Modal>
     );
}
 
export default EmployeeModal;