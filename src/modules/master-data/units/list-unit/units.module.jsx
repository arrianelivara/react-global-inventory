import { DataTable, WrapperA, Button } from 'components';
import { useForm, useModal } from 'hooks';
import initialFormState from 'modules/master-data/common/warehouse-state.module';
import WarehouseSelection from 'modules/master-data/common/warehouse.module';
import React, { useMemo } from 'react';
import lang from 'translations';
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { StyleType } from 'enums';
import AddUnitModal from '../add-unit/add-unit-modal.module';
import EditUnitModal from '../edit-unit/edit-unit-modal.module';
import { columns } from './columns';

const Units = () => {
    const addUnitModal = useModal();
    const editUnitModal = useModal();

    const formState = useMemo(() => {
        return initialFormState();
    }, []);

    const { fields, modifyField } = useForm({ initialState: formState })

    return (
        <WrapperA title={lang.units} 
            description={lang.listOfUnits}
            actionButtons={
                <div className="mt-md">
                    <Button iconPrefix={<PlusOutlined className="mr-sm" />} className="mr-sm"
                        onClick={() => {
                            addUnitModal.show({
                                title: lang.addNewUnit,
                                okText: lang.add,
                                width: "50%"
                            })
                        }}>
                        {lang.add}
                    </Button>
                    <Button iconPrefix={<EditOutlined className="mr-sm"/>} 
                            type={StyleType.Secondary}
                            onClick={() => {
                                editUnitModal.show({
                                    title: lang.updateExistingUnit,
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
            <AddUnitModal addUnitModal={addUnitModal} />
            <EditUnitModal editUnitModal={editUnitModal} />
        </WrapperA>);
}
 
export default Units;