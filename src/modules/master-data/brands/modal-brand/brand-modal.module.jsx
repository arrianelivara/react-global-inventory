import { Modal } from 'antd';
import { Field, Input, Text, TextArea } from 'components';
import { DatePicker } from 'components/index';
import { useForm } from 'hooks/index';
import React, { useMemo } from 'react'
import { initialFormState } from './brand.form.state';
import moment from 'moment';

const BrandModal = ({ brandModal, initialState, handleSubmit, refreshList, requestState }) => {

    const formState = useMemo(() => {
        return initialFormState(initialState ? Object.values(initialState)[0] : {});
    }, [initialState]);

    const { fields, modifyField, getFormValues, clearForm } = useForm({
      initialState: formState,
    });

    return (
        <Modal {...brandModal} onCancel={() => brandModal.close()} 
            bodyStyle={{
                paddingInline: '2rem'
            }}
            onOk={async () => {
                const params = getFormValues();
                const obj = {
                    id: params.id,
                    brand: params.brandName,
                    description: params.description,
                    start_date: params.startDate?.format('YYYY-MM-DD'),
                    end_date: params.endDate?.format('YYYY-MM-DD'),
                }
                await handleSubmit(obj);
                brandModal.close();
                clearForm();
                refreshList(requestState);
            }}
            >
                <Text label>Note: Fields with (<span className='text-red'>*</span>) are required.</Text>
                <div className='mt-md'>
                    <Field {...fields.brandName} required>
                        <Input {...fields.brandName} onChange={modifyField}/>
                    </Field>
                </div>
                <div className='mt-sm'>
                    <Field {...fields.description}>
                        <TextArea {...fields.description} onChange={modifyField}/>
                    </Field>
                </div>
                <div className='mt-sm grid md:grid-cols-2 gap-3'>
                    <Field {...fields.startDate} required>
                        <DatePicker {...fields.startDate} onChange={(name, value) => {
                                let startD = value;
                                if (!value) {
                                    startD = null;
                                } else {
                                    startD = moment(startD)
                                }
                                modifyField("startDate", { value: startD });
                            }}/>
                        </Field>
                        <Field {...fields.endDate}>
                            <DatePicker {...fields.endDate} onChange={(name, value) => {
                                let startD = fields.startDate.value;
                                let endD = value;
                                if (!value) {
                                    modifyField("endDate", { value: null });
                                } else {
                                    endD = moment(value);
                                    const num = endD.diff(startD, "days");
                                    if (num < 1 || isNaN(num)) {
                                        modifyField("endDate", { value: null });
                                    } else {
                                        modifyField("endDate", { value: endD });
                                    }
                                }
                            }}/>
                        </Field>
                </div>
        </Modal>
     );
}
 
export default BrandModal;