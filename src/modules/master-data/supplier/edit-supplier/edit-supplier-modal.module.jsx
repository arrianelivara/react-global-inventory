import { updateSupplier } from 'apis/supplier.api';
import { useApi } from 'hooks/index';
import React from 'react';
import SupplierModal from '../modal-supplier/supplier-modal.module';
const EditSupplierModal = ({ editSupplierModal, selected, refreshList, requestState }) => {
    
    const { request } = useApi({
        api: updateSupplier
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

    return (<SupplierModal 
        supplierModal={editSupplierModal}
        handleSubmit={handleSubmit}
        initialState={selected}
        refreshList={refreshList}
        requestState={requestState}
    />);
}
 
export default EditSupplierModal;