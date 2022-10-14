import { updatePart } from 'apis/part.api';
import { useApi } from 'hooks/index';
import React from 'react';
import PartsModal from '../modal-parts/parts-modal.module';

const EditPartsModal = ({ editPartsModal, selected }) => {
    const { request } = useApi({
        api: updatePart
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
    return (<PartsModal 
        partsModal={editPartsModal}
        handleSubmit={handleSubmit}
        initialState={selected}
    />);
}
 
export default EditPartsModal;