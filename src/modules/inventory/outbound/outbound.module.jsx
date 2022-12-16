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

    const { fields, modifyField, modifyForm, getFormValues, clearForm, validateField } = useForm({
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

    const formField = useMemo(() => {
        const formItems = {};
        [
          "invoiceDate",
          "invoiceNumber",
          "supplier",
          "warehouse",
          "parts",
        ].forEach((key) => {
          formItems[key] = {
            ...fields[key],
            onChange: modifyField,
            validateField: () => {
              validateField(key, fields[key]);
            },
        };
        });
        return formItems;
      }, [fields, modifyField, validateField]);
    
    const { 
        invoiceDate, 
        parts,
        invoiceNumber,
        supplier,
        warehouse
    } = formField;

    return (<WrapperA title={lang.outbound}
        actionButtons={
            <div className="mt-md">
                <Button iconPrefix={<PlusOutlined className="mr-sm" />} className="mr-sm"
                    onClick={() => {
                        const existingParts = fields.parts.value;
                        modifyField([parts.name], { value: [...existingParts, PartField] });
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
            <Field {...invoiceDate} label={lang.invoiceDate}>
                <DatePicker {...invoiceDate} onChange={modifyField}/>
            </Field>
            <Field {...invoiceNumber} label={lang.invoiceNumber}>
                <Input {...invoiceNumber} onChange={modifyField} />
            </Field>
            <Field {...supplier} label={lang.supplier}>
                <Select {...supplier} onChange={modifyField} options={supplierList} loading={fetchingSupplier}/>
            </Field>
            <Field label={lang.warehouse}>
                <Select {...warehouse} onChange={modifyField} options={mappedData} loading={loading}/>
            </Field>
        </div>
        {parts.value.length > 0  ?
            parts.value.map((field, index) => {
            const onChange = (changes) => {
                const v = parts.value;
                const indexValue = v[index];
                v[index] = {
                    ...indexValue,
                    ...changes,
                };
                modifyForm({
                    [parts.name]: {
                        value: v,
                    }
                });
            };
            return <div key={index} className='flex content-center justify-between gap-2 drop-shadow-md my-sm bg-white p-md rounded-md border-slate-400'>
                <div>
                    <Title className="mt-lg">{index + 1}</Title>
                </div>
                <Field {...field.partNo} label="Part No.">
                    <Input {...field.partNo} onChange={(name, { value }) => {
                        onChange({
                            partNo: {
                                value,
                            }
                        })
                    }}/>
                </Field>
                <Field {...field.description} label="Description">
                    <Input {...field.description} onChange={(name, { value }) => {
                        onChange({
                            description: {
                                value,
                            }
                        })
                    }}/>
                </Field>
                <Field  {...field.brand} label="Brand">
                    <Select  {...field.brand} onChange={(name, { value }) => {
                        onChange({
                            brand: {
                                value,
                            }
                        })
                    }}/>
                </Field>
                <Field  {...field.remainingStocks} label="Remaining Stocks">
                    <Input {...field.remainingStocks} inputType="number" onChange={(name, { value }) => {
                        onChange({
                            remainingStocks: {
                                value,
                            }
                        })
                    }}/>
                </Field>
                <Field {...field.quantity} label="Quantity">
                    <Input {...field.quantity} inputType="number" onChange={(name, { value }) => {
                        onChange({
                            quantity: {
                                value,
                            }
                        })
                    }}/>
                </Field>
                <Field {...field.unit} label="Unit">
                    <Select {...field.unit} onChange={(name, { value }) => {
                        onChange({
                            unit: {
                                value,
                            }
                        })
                    }}/>
                </Field>
                <div key={index}>
                    <Button className="bottom-0 mt-[24px] p-sm" onClick={() => {
                        const v = parts.value.filter((item, itemIndex) => {
                            return index !== itemIndex;
                          });
    
                        modifyForm({
                            [parts.name]: {
                              value: v,
                            }
                        });
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