import { Modal } from 'antd';
import { Field, Input, Text, TextArea } from 'components';
import React from 'react'

const SupplierModal = ({ supplierModal }) => {
    return (
        <Modal {...supplierModal} onCancel={() => supplierModal.close()} 
            bodyStyle={{
                paddingInline: '2rem'
            }}>
                <Text label>Note: Fields with (<span className='text-red'>*</span>) are required.</Text>
                <div className='mt-md'>
                    <Field label="Supplier ID" required>
                        <Input />
                    </Field>
                    <Field label="Supplier Name" required>
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
 
export default SupplierModal;