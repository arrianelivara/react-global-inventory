import { updateWarehouse } from 'apis/warehouse.api';
import { useApi } from 'hooks/index';
import React from 'react';
import WarehouseModal from '../modal-warehouse/warehouse-modal.module';
const EditWarehouseModal = ({ editWarehouseModal, selected, refreshList, requestState }) => {

    const { request } = useApi({
        api: updateWarehouse
    });

    const handleSubmit = async (params) => {
        try {
            const id = params.id;
            await request({ id, body: params });
        } catch (e) {

        }
    };

    return (<WarehouseModal 
        warehouseModal={editWarehouseModal}
        handleSubmit={handleSubmit}
        initialState={selected}
        refreshList={refreshList}
        requestState={requestState}
    />);
}
 
export default EditWarehouseModal;