import { createWarehouse } from 'apis/warehouse.api';
import { useApi } from 'hooks/index';
import React from 'react';
import WarehouseModal from '../modal-warehouse/warehouse-modal.module';
const AddWarehouseModal = ({ addWarehouseModal, refreshList, requestState }) => {
    
    const { request } = useApi({
        api: createWarehouse
    });

    const handleSubmit = async (params) => {
        try {
            await request(params);
        } catch (e) {

        }
    };

    return (<WarehouseModal 
        warehouseModal={addWarehouseModal}
        handleSubmit={handleSubmit}
        refreshList={refreshList}
        requestState={requestState}
        />);
}
 
export default AddWarehouseModal;