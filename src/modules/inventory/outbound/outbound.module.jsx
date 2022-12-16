import { Button, Container, DataTable, DatePicker, Field, Input, Select, Text, Title, WrapperA } from 'components/index';
import React, { useCallback, useMemo } from 'react';
import lang from "translations";
import { PlusOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";
import { StyleType } from 'enums/index';
import { useApi, useForm, useModal, useMount } from 'hooks/index';
import { getAllSupplier, getAllWarehouse } from 'apis/index';
import { initialFormState, PartField } from './outbound-filter.form-state';
import { Modal } from "antd";

const Outbound = () => {
    const updateModal = useModal();
    const { request, mappedData, loading } = useApi({
        api: getAllWarehouse,
        mapper: {
            value: { key: "id" },
            text: { key: "warehouse"}
        },
        isArray: true
    });

    const { request: requestAllSupplier, mappedData: supplierList, fetchingSupplier } = useApi({
        api: getAllSupplier,
        mapper: {
            value: { key: "id" },
            text: { key: "supplier"}
        },
        isArray: true
    });

    useMount(() => {
        fetchWarehouse();
        fetchSupplier();
    });

    const formState = useMemo(() => {
        return initialFormState();
    }, []);

    const { fields, modifyField, getFormValues, clearForm } = useForm({
        initialState: formState,
    });

    const fetchWarehouse = useCallback(async() => {
        await request();
    }, [request]);

    const fetchSupplier = useCallback(async() => {
        await requestAllSupplier();
    }, [request]);

    const filterByList = [
        {
            text: "Invoice No.",
            value: 1,
        },
        {
            text: "Date",
            value: 2,
        },
        {
            text: "User",
            value: 3,
        }
    ];

    return (<WrapperA title={lang.outbound}
        actionButtons={
            <div className="mt-md">
                <Button iconPrefix={<PlusOutlined className="mr-sm" />} className="mr-sm"
                    onClick={() => {
                        const existingParts = fields.parts.value;
                        modifyField("parts", { value: [...existingParts, PartField] });
                    }}>
                    {lang.add}
                </Button>
                <Button iconPrefix={<EditOutlined className="mr-sm"/>} className="mr-sm" 
                    type={StyleType.Secondary}
                    onClick={() => {
                        updateModal.show({
                            onOk: () => {
                                updateModal.close();
                            },
                            onCancel: () => {
                                updateModal.close()
                            }
                        })
                    }}
                >{lang.update}
                </Button>
                <Button iconPrefix={<SaveOutlined className="mr-sm"/>} 
                        type={StyleType.Tertiary}
                    >{lang.save}
                </Button>
            </div>
        }>
        <div className='my-md grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2'>
            <Field {...fields.invoiceDate} label={lang.invoiceDate}>
                <DatePicker {...fields.invoiceDate} onChange={modifyField}/>
            </Field>
            <Field {...fields.invoiceNumber} label={lang.invoiceNumber}>
                <Input {...fields.invoiceNumber} onChange={modifyField} />
            </Field>
            <Field {...fields.supplier} label={lang.supplier}>
                <Select {...fields.supplier} onChange={modifyField} options={supplierList} loading={fetchingSupplier}/>
            </Field>
            <Field label={lang.warehouse}>
                <Select {...fields.warehouse} onChange={modifyField} options={mappedData} loading={loading}/>
            </Field>
        </div>
        {fields.parts.value.length > 0  ?
            fields.parts.value.map((field, index) => {
            return <div key={index} className='flex content-center justify-between gap-2 drop-shadow-md my-sm bg-white p-md rounded-md border-slate-400'>
                <div>
                    <Text>{index + 1}</Text>
                </div>
                <Field {...field.partNo}>
                    <Input {...field.partNo} onChange={modifyField}/>
                </Field>
                <Field {...field.description}>
                    <Input {...field.description} onChange={modifyField}/>
                </Field>
                <Field  {...field.brand}>
                    <Select  {...field.brand} onChange={modifyField}/>
                </Field>
                <Field  {...field.remainingStocks}>
                    <Input {...field.remainingStocks} inputType="number" onChange={modifyField}/>
                </Field>
                <Field {...field.quantity}>
                    <Input {...field.quantity} inputType="number" onChange={modifyField}/>
                </Field>
                <Field {...field.unit}>
                    <Select {...field.unit} onChange={modifyField}/>
                </Field>
                <div key={index}>
                    <Button className="bottom-0" onClick={() => {
                        console.log("delete")
                    }}>Delete</Button>
                </div>
            </div>
        }) : 
        <Container className="my-md bg-white text-center min-h-page flex items-center border rounded">
            <div className="m-auto p-lg">
                <Text size="text-md" color="text-gray-500">Click Add or Update to Get Started.</Text>
            </div>
        </Container>}
        <Title>{lang.transactionHistory}</Title>
        <div className='my-md grid grid-cols-6 gap-2 '>
            <Field label={lang.filterBy}>
                <Select options={filterByList} value={1}/>
            </Field>
            <Field label={lang.search} className="col-span-2">
                <Input />
            </Field>
        </div>

        <DataTable data={[]}/>
        <Modal {...updateModal} 
            title='Enter Invoice Number'
            okText='Submit'
            cancelText='Cancel'
        >
            <Input className="mt-md" />
        </Modal>
    </WrapperA>);
}
 
export default Outbound;