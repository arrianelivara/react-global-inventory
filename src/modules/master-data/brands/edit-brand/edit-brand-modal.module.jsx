import { updateBrand } from 'apis/brand.api';
import { useApi } from 'hooks/index';
import React from 'react';
import BrandModal from '../modal-brand/brand-modal.module';
const EditBrandModal = ({ editBrandModal, selected, refreshList, requestState }) => {

    const { request } = useApi({
        api: updateBrand
    });

    const handleSubmit = async (params) => {
        try {
            const id = params.id;
            await request({ id, body: params });
        } catch (e) {

        }
    };

    return (<BrandModal 
        brandModal={editBrandModal} 
        initialState={selected}
        handleSubmit={handleSubmit}
        refreshList={refreshList}
        requestState={requestState}
        />);
}
 
export default EditBrandModal;