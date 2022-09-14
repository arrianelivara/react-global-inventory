import { DataTable, WrapperA, Button } from 'components';
import { useForm, useModal } from 'hooks';
import initialFormState from 'modules/master-data/common/warehouse-state.module';
import WarehouseSelection from 'modules/master-data/common/warehouse.module';
import React, { useMemo } from 'react';
import lang from 'translations';
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { StyleType } from 'enums';
import AddBrandModal from '../add-brand/add-brand-modal.module';
import EditBrandModal from '../edit-brand/edit-brand-modal.module';
import { columns } from './columns';

const Brands = () => {
    const addBrandModal = useModal();
    const editBrandModal = useModal();

    const formState = useMemo(() => {
        return initialFormState();
    }, []);

    const { fields, modifyField } = useForm({ initialState: formState })

    return (
        <WrapperA title={lang.brands} 
            description={lang.listOfBrands}
            actionButtons={
                <div className="mt-md">
                    <Button iconPrefix={<PlusOutlined className="mr-sm" />} className="mr-sm"
                        onClick={() => {
                            addBrandModal.show({
                                title: lang.addNewBrand,
                                okText: lang.add,
                                width: "50%"
                            })
                        }}>
                        {lang.add}
                    </Button>
                    <Button iconPrefix={<EditOutlined className="mr-sm"/>} 
                            type={StyleType.Secondary}
                            onClick={() => {
                                editBrandModal.show({
                                    title: lang.updateExistingBrand,
                                    okText: lang.save,
                                    width: "50%"
                                })
                            }}
                        >{lang.update}
                    </Button>
                </div>}
            filterButtons={
                <WarehouseSelection field={fields.warehouse} modifyField={modifyField}/>
            }>
            <DataTable data={[]} columns={columns}/>
            <AddBrandModal addBrandModal={addBrandModal} />
            <EditBrandModal editBrandModal={editBrandModal} />
        </WrapperA>);
}
 
export default Brands;