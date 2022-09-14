import { Modal } from 'antd';
import { Field, Input, Text, TextArea } from 'components';
import React from 'react'

const WarehouseModal = ({ warehouseModal }) => {
    return (
        <Modal {...warehouseModal} onCancel={() => warehouseModal.close()} 
            bodyStyle={{
                paddingInline: '2rem'
            }}>
                <Text label>Note: Fields with (<span className='text-red'>*</span>) are required.</Text>
                <div className='mt-md'>
                    <Field label="Warehouse ID" required>
                        <Input />
                    </Field>
                    <Field label="Warehouse Name" required>
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
 
export default WarehouseModal;