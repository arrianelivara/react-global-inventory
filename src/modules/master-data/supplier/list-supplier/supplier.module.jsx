import { DataTable, WrapperA, Button } from 'components';
import { useForm, useModal } from 'hooks';
import initialFormState from 'modules/master-data/common/warehouse-state.module';
import WarehouseSelection from 'modules/master-data/common/warehouse.module';
import React, { useMemo } from 'react';
import lang from 'translations';
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { StyleType } from 'enums';
import AddSupplierModal from '../add-supplier/add-supplier-modal.module';
import EditSupplierModal from '../edit-supplier/edit-supplier-modal.module';
import { columns } from './columns';

const Supplier = () => {
    const addSupplierModal = useModal();
    const editSupplierModal = useModal();

    const formState = useMemo(() => {
        return initialFormState();
    }, []);

    const { fields, modifyField } = useForm({ initialState: formState })

    return (
        <WrapperA title={lang.supplier} 
            description={lang.listOfSuppliers}
            actionButtons={
                <div className="mt-md">
                    <Button iconPrefix={<PlusOutlined className="mr-sm" />} className="mr-sm"
                        onClick={() => {
                            addSupplierModal.show({
                                title: lang.addNewSupplier,
                                okText: lang.add,
                                width: "50%"
                            })
                        }}>
                        {lang.add}
                    </Button>
                    <Button iconPrefix={<EditOutlined className="mr-sm"/>} 
                            type={StyleType.Secondary}
                            onClick={() => {
                                editSupplierModal.show({
                                    title: lang.updateExistingSupplier,
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
            <DataTable data={[]} columns={columns} />
            <AddSupplierModal addSupplierModal={addSupplierModal} />
            <EditSupplierModal editSupplierModal={editSupplierModal} />
        </WrapperA>);
}
 
export default Supplier;