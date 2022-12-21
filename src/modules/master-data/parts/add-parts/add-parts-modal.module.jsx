import { createPart } from 'apis/part.api';
import { useApi } from 'hooks/index';
import React from 'react';
import PartsModal from '../modal-parts/parts-modal.module';
const AddPartsModal = ({ addPartsModal, refreshList, requestState }) => {
    const { request } = useApi({
        api: createPart
    });

    const handleSubmit = async (params) => {
        try {
            await request(params);
        } catch (e) {

        }
    };

    return (<PartsModal 
        partsModal={addPartsModal}
        handleSubmit={handleSubmit}
        initialState={null}
        refreshList={refreshList}
        requestState={requestState}
    />);
}
 
export default AddPartsModal;