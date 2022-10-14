import { Modal } from 'antd';
import { Field, Input, Text, TextArea } from 'components';
import { useForm } from 'hooks/index';
import React, { useMemo } from 'react'
import { initialFormState } from './unit.form.state';
import moment from "moment";
import { DatePicker } from 'components/index';

const UnitModal = ({ unitModal, initialState, handleSubmit }) => {

    const formState = useMemo(() => {
        return initialFormState(initialState ? Object.values(initialState)[0] : {});
    }, [initialState]);

    const { fields, modifyField, getFormValues, clearForm } = useForm({
      initialState: formState,
    });

    return (
        <Modal {...unitModal} onCancel={() => {
                unitModal.close();
                clearForm();
            }} 
            bodyStyle={{
                paddingInline: '2rem'
            }}
            onOk={() => {
                const params = getFormValues();
                const obj = {
                    id: params.id,
                    unit: params.unitName,
                    startDate: params.startDate?.format('YYYY-DD-MM'),
                    endDate: params.endDate?.format('YYYY-DD-MM'),
                }
                handleSubmit(obj);
                unitModal.close();
                clearForm();
            }}
           >
                <Text label>Note: Fields with (<span className='text-red'>*</span>) are required.</Text>
                <div className='mt-md'>
                    <Field {...fields.unitName} required>
                        <Input {...fields.unitName} onChange={modifyField}/>
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
 
export default UnitModal;