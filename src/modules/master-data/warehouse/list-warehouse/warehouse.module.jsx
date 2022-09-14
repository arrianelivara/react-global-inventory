import { DataTable, WrapperA, Button } from 'components';
import { useForm, useModal } from 'hooks';
import initialFormState from 'modules/master-data/common/warehouse-state.module';
import WarehouseSelection from 'modules/master-data/common/warehouse.module';
import React, { useMemo } from 'react';
import lang from 'translations';
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { StyleType } from 'enums';
import AddWarehouseModal from '../add-warehouse/add-warehouse-modal.module';
import EditWarehouseModal from '../edit-warehouse/edit-warehouse-modal.module';
import { columns } from './columns';

const Warehouse = () => {
    const addWarehouseModal = useModal();
    const editWarehouseModal = useModal();

    const formState = useMemo(() => {
        return initialFormState();
    }, []);

    const { fields, modifyField } = useForm({ initialState: formState })

    return (
        <WrapperA title={lang.warehouse} 
            description={lang.listOfWarehouse}
            actionButtons={
                <div className="mt-md">
                    <Button iconPrefix={<PlusOutlined className="mr-sm" />} className="mr-sm"
                        onClick={() => {
                            addWarehouseModal.show({
                                title: lang.addNewWarehouse,
                                okText: lang.add,
                                width: "50%"
                            })
                        }}>
                        {lang.add}
                    </Button>
                    <Button iconPrefix={<EditOutlined className="mr-sm"/>} 
                            type={StyleType.Secondary}
                            onClick={() => {
                                editWarehouseModal.show({
                                    title: lang.updateExistingWarehouse,
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
            <AddWarehouseModal addWarehouseModal={addWarehouseModal} />
            <EditWarehouseModal editWarehouseModal={editWarehouseModal} />
        </WrapperA>);
}
 
export default Warehouse;