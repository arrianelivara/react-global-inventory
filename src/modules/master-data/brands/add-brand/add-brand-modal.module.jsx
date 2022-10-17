import { createBrand } from 'apis/brand.api';
import { useApi } from 'hooks/index';
import React from 'react';
import BrandModal from '../modal-brand/brand-modal.module';
const AddBrandModal = ({ addBrandModal, refreshList, requestState }) => {
    
    const { request } = useApi({
        api: createBrand
    });

    const handleSubmit = async (params) => {
        try {
            await request(params);
        } catch (e) {
            console.log("errorrr");
        }
    };

    return (<BrandModal 
        brandModal={addBrandModal} 
        handleSubmit={handleSubmit} 
        initialState={null}
        refreshList={refreshList}
        requestState={requestState}
        />);
}
 
export default AddBrandModal;