import { Modal } from 'antd';
import { Field, Input, Text, TextArea } from 'components';
import { useForm } from 'hooks/index';
import React, { useMemo } from 'react'
import { initialFormState } from './warehouse.form.state';
import moment from "moment";
import { DatePicker } from 'components/index';

const WarehouseModal = ({ warehouseModal, initialState, handleSubmit }) => {

    const formState = useMemo(() => {
        return initialFormState(initialState ? Object.values(initialState)[0] : {});
    }, [initialState]);

    const { fields, modifyField, getFormValues, clearForm } = useForm({
      initialState: formState,
    });

    return (
        <Modal {...warehouseModal} onCancel={() => {
              warehouseModal.close()
              clearForm();
            }}
            bodyStyle={{
                paddingInline: '2rem'
            }}
            onOk={() => {
                const params = getFormValues();
                const obj = {
                    id: params.id,
                    description: params.description,
                    warehouse: params.warehouseName,
                    start_date: params.startDate?.format('YYYY-MM-DD'),
                    end_date: params.endDate?.format('YYYY-MM-DD'),
                }
                handleSubmit(obj);
                supplierModal.close();
                clearForm();
            }}>
                <Text label>Note: Fields with (<span className='text-red'>*</span>) are required.</Text>
                <div className='mt-md'>
                    <Field {...fields.warehouseName} required>
                        <Input {...fields.warehouseName} onChange={modifyField}/>
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
                        <TextArea {...fields.description} onChange={modifyField}/>
                    </Field>
                </div>
        </Modal>
     );
}
 
export default WarehouseModal;