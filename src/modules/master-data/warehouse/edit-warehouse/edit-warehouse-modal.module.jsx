import { updateWarehouse } from 'apis/warehouse.api';
import { useApi } from 'hooks/index';
import React from 'react';
import WarehouseModal from '../modal-warehouse/warehouse-modal.module';
const EditWarehouseModal = ({ editWarehouseModal, selected }) => {

    const { request } = useApi({
        api: updateWarehouse
    });

    const handleSubmit = async (params) => {
        try {
            const id = params.id;
            console.log(id, params)
            await request({ id, body: params });
            console.log("updated")
        } catch (e) {

        }
    };

    return (<WarehouseModal 
        warehouseModal={editWarehouseModal}
        handleSubmit={handleSubmit}
        initialState={selected}/>);
}
 
export default EditWarehouseModal;