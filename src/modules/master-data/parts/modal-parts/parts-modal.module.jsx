import { Modal } from 'antd';
import { Field, Input, Text, TextArea } from 'components';
import React, { useMemo } from 'react'
import { initialFormState } from './parts.form.state';
import { useForm } from 'hooks/index';
import field from 'enums/field';
import moment from "moment";
import { DatePicker } from 'components/index';
const PartsModal = ({ partsModal, handleSubmit, initialState, refreshList, requestState }) => {

    const formState = useMemo(() => {
        return initialFormState(initialState ? Object.values(initialState)[0] : {});
    }, [initialState]);

    const { fields, modifyField, getFormValues, clearForm } = useForm({
      initialState: formState,
    });

    return (
        <Modal {...partsModal} onCancel={() => partsModal.close()} 
            bodyStyle={{
                paddingInline: '2rem'
            }}
            onOk={async () => {
                const params = getFormValues();
                const obj = {
                    id: params.id,
                    description: params.description,
                    part: params.partNo,
                    start_date: params.startDate?.format('YYYY-MM-DD'),
                    end_date: params.endDate?.format('YYYY-MM-DD'),
                }
                await handleSubmit(obj);
                partsModal.close();
                clearForm();
                refreshList(requestState);
            }}
            >
                <Text label>Note: Fields with (<span className='text-red'>*</span>) are required.</Text>
                <div className='mt-md'>
                    <Field {...fields.partNo} required>
                        <Input {...fields.partNo} onChange={modifyField}/>
                    </Field>
                </div>
                <div className='mt-sm flex gap-2'>
                    <Field {...fields.startDate}>
                        <DatePicker {...fields.startDate} onChange={(name, value) => {
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
                    <Field {...fields.description}>
                        <TextArea {...fields.description} onChange={modifyField} />
                    </Field>
                </div>
        </Modal>
     );
}
 
export default PartsModal;