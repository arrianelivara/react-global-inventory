import { Modal } from 'antd';
import { Field, Input, Text, TextArea } from 'components';
import React, { useMemo } from 'react'
import { initialFormState } from './parts.form.state';
import { useApi, useForm, useMount } from 'hooks/index';
import moment from "moment";
import { DatePicker, Select } from 'components/index';
import { getAllBrands } from 'apis/brand.api';
import { brandOptions } from 'mappers/brand.mapper';
const PartsModal = ({ partsModal, handleSubmit, initialState, refreshList, requestState }) => {

    const formState = useMemo(() => {
        return initialFormState(initialState ? Object.values(initialState)[0] : {});
    }, [initialState]);

    const { fields, modifyField, getFormValues, clearForm } = useForm({
      initialState: formState,
    });

    const { request, loading ,
        mappedData } = useApi({
        api: getAllBrands,
        isArray: true,
        mapper: brandOptions
    });


    useMount(() => {
        request();
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
                    brand: params.brand
                }
                await handleSubmit(obj);
                partsModal.close();
                clearForm();
                refreshList(requestState);
            }}
            >
                <Text label>Note: Fields with (<span className='text-red'>*</span>) are required.</Text>
                <div className='mt-md grid md:grid-cols-2 gap-3'>
                    <Field {...fields.partNo} required>
                        <Input {...fields.partNo} onChange={modifyField}/>
                    </Field>
                    <Field {...fields.description} required>
                        <Input {...fields.description} onChange={modifyField} />
                    </Field>
                </div>
                <div className='mt-sm'>
                    <Field {...fields.brand}>
                        <Select {...fields.brand} loading={loading} options={mappedData} onChange={modifyField}/>
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
 
export default PartsModal;