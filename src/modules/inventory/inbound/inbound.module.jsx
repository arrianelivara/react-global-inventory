import { Button, DataTable, DatePicker, Field, Input, Select, Title, WrapperA } from 'components/index';
import React from 'react';
import lang from "translations";
import { PlusOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";
import { StyleType } from 'enums/index';

const Inbound = () => {
    return (<WrapperA title={lang.inbound}
        actionButtons={
            <div className="mt-md">
                    <Button iconPrefix={<PlusOutlined className="mr-sm" />} className="mr-sm">
                        {lang.add}
                    </Button>
                    <Button iconPrefix={<EditOutlined className="mr-sm"/>} className="mr-sm" 
                            type={StyleType.Secondary}
                        >{lang.update}
                    </Button>
                    <Button iconPrefix={<SaveOutlined className="mr-sm"/>} 
                            type={StyleType.Tertiary}
                        >{lang.save}
                    </Button>
            </div>
        }>
        <div className='my-md grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2'>
            <Field label={lang.invoiceDate}>
                <DatePicker />
            </Field>
            <Field label={lang.invoiceNumber}>
                <Input />
            </Field>
            <Field label={lang.supplier}>
                <Select options={[]}/>
            </Field>
            <Field label={lang.warehouse}>
                <Select options={[]}/>
            </Field>
        </div>
        <DataTable data={[]}/>
        <Title>{lang.transactionHistory}</Title>
        <div className='my-md grid grid-cols-6 gap-2 '>
            <Field label={lang.filterBy}>
                <Select options={[]}/>
            </Field>
            <Field label={lang.search} className="col-span-2">
                <Input />
            </Field>
        </div>

        <DataTable data={[]}/>
    </WrapperA>);
}
 
export default Inbound;