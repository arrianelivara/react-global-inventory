import React from 'react';
import { createSupplier } from 'apis/supplier.api';
import { useApi } from 'hooks/index';
import SupplierModal from '../modal-supplier/supplier-modal.module';
const AddSupplierModal = ({ addSupplierModal, refreshList, requestState }) => {
    const { request } = useApi({
        api: createSupplier
    });

    const handleSubmit = async (params) => {
        try {
            console.log(params);
            await request(params);
            console.log("created")
            await refreshList(requestState);
        } catch (e) {

        }
    };

    return (<SupplierModal supplierModal={addSupplierModal} handleSubmit={handleSubmit} />);
}
 
export default AddSupplierModal;