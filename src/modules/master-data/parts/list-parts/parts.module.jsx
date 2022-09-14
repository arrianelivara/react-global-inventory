import { DataTable, WrapperA, Button } from 'components';
import { useForm, useModal } from 'hooks';
import initialFormState from 'modules/master-data/common/warehouse-state.module';
import WarehouseSelection from 'modules/master-data/common/warehouse.module';
import React, { useMemo } from 'react';
import lang from 'translations';
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import AddPartsModal from '../add-parts/add-parts-modal.module';
import EditPartsModal from '../edit-parts/edit-parts-modal.module';
import { StyleType } from 'enums';
import { columns } from './columns';

const Parts = () => {
    const addPartsModal = useModal();
    const editPartsModal = useModal();

    const formState = useMemo(() => {
        return initialFormState();
    }, []);

    const { fields, modifyField } = useForm({ initialState: formState })

    return (
        <WrapperA title={lang.parts} 
            description={lang.listOfParts}
            actionButtons={
                <div className="mt-md">
                    <Button iconPrefix={<PlusOutlined className="mr-sm" />} className="mr-sm"
                        onClick={() => {
                            addPartsModal.show({
                                title: lang.addNewPart,
                                okText: lang.add,
                                width: "50%"
                            })
                        }}>
                        {lang.add}
                    </Button>
                    <Button iconPrefix={<EditOutlined className="mr-sm"/>} 
                            type={StyleType.Secondary}
                            onClick={() => {
                                editPartsModal.show({
                                    title: lang.updateExistingPart,
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
            <AddPartsModal addPartsModal={addPartsModal} />
            <EditPartsModal editPartsModal={editPartsModal} />
        </WrapperA>);
}
 
export default Parts;