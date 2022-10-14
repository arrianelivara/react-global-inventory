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
            console.log(params);
            await request(params);
            console.log("created");
            await refreshList(requestState);
        } catch (e) {

        }
    };

    return (<WarehouseModal 
        warehouseModal={addWarehouseModal}
        handleSubmit={handleSubmit}
        />);
}
 
export default AddWarehouseModal;