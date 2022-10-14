import { createBrand } from 'apis/brand.api';
import { useApi } from 'hooks/index';
import React from 'react';
import BrandModal from '../modal-brand/brand-modal.module';
const AddBrandModal = ({ addBrandModal }) => {
    
    const { request } = useApi({
        api: createBrand
    });

    const handleSubmit = async (params) => {
        try {
            console.log(params);
            await request(params);
            console.log("created")
        } catch (e) {

        }
    };

    return (<BrandModal brandModal={addBrandModal} handleSubmit={handleSubmit} initialState={null}/>);
}
 
export default AddBrandModal;