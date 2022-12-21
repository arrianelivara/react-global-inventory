import { updatePart } from 'apis/part.api';
import { useApi } from 'hooks/index';
import React from 'react';
import PartsModal from '../modal-parts/parts-modal.module';

const EditPartsModal = ({ editPartsModal, selected, refreshList, requestState }) => {
    const { request } = useApi({
        api: updatePart
    });

    const handleSubmit = async (params) => {
        try {
            const id = params.id;
            await request({ id, body: params });
        } catch (e) {

        }
    };
    return (<PartsModal 
        partsModal={editPartsModal}
        handleSubmit={handleSubmit}
        initialState={selected}
        refreshList={refreshList}
        requestState={requestState}
    />);
}
 
export default EditPartsModal;