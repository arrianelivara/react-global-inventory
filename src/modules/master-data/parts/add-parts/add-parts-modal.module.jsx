import { createPart } from 'apis/part.api';
import { useApi } from 'hooks/index';
import React from 'react';
import PartsModal from '../modal-parts/parts-modal.module';
const AddPartsModal = ({ addPartsModal }) => {
    const { request } = useApi({
        api: createPart
    });

    const handleSubmit = async (params) => {
        try {
            console.log(params);
            await request(params);
            console.log("created")
        } catch (e) {

        }
    };

    return (<PartsModal 
        partsModal={addPartsModal}
        handleSubmit={handleSubmit}
        initialState={null}
    />);
}
 
export default AddPartsModal;