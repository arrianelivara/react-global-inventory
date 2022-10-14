import { Modal } from 'antd';
import { Field, Input, Text, TextArea } from 'components';
import { DatePicker } from 'components/index';
import { useForm } from 'hooks/index';
import React, { useMemo } from 'react'
import { initialFormState } from './supplier.form.state';
import moment from "moment";

const SupplierModal = ({ supplierModal, initialState, handleSubmit }) => {

    const formState = useMemo(() => {
        return initialFormState(initialState ? Object.values(initialState)[0] : {});
    }, [initialState]);

    const { fields, modifyField, getFormValues, clearForm } = useForm({
      initialState: formState,
    });

    return (
        <Modal {...supplierModal} onCancel={() => { 
                supplierModal.close();
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
                    supplier: params.supplierName,
                    start_date: params.startDate?.format('YYYY-DD-MM'),
                    end_date: params.endDate?.format('YYYY-DD-MM'),
                }
                handleSubmit(obj);
                supplierModal.close();
                clearForm();
            }}>
                <Text label>Note: Fields with (<span className='text-red'>*</span>) are required.</Text>
                <div className='mt-md'>
                    <Field {...fields.supplierName} required>
                        <Input {...fields.supplierName} onChange={modifyField}/>
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
 
export default SupplierModal;