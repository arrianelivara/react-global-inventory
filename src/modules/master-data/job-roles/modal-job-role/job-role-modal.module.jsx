import { Modal } from 'antd';
import { DatePicker, Field, Input, Select, Text, TextArea } from 'components';
import lang from "translations"
import React from 'react'

const JobRoleModal = ({ jobRoleModal }) => {
    return (
        <Modal {...jobRoleModal} onCancel={() => jobRoleModal.close()} 
            bodyStyle={{
                paddingInline: '2rem'
            }}>
                <Text label>Note: Fields with (<span className='text-red'>*</span>) are required.</Text>
                <div className='mt-md'>
                    <Field label="Job Role ID" required>
                        <Input />
                    </Field>
                    <Field label="Job Role Name" required>
                        <Input />
                    </Field>
                </div>
                <div className='mt-sm'>
                    <Field label="Description">
                        <TextArea />
                    </Field>
                </div>
        </Modal>
     );
}
 
export default JobRoleModal;