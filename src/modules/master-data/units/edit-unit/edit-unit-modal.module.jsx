import { updateUnit } from 'apis/unit.api';
import { useApi } from 'hooks/index';
import React from 'react';
import UnitModal from '../modal-unit/unit-modal.module';
const EditUnitModal = ({ editUnitModal, selected,refreshList, requestState }) => {
    const { request } = useApi({
        api: updateUnit
    });

    const handleSubmit = async (params) => {
        try {
            const id = params.id;
            await request({ id, body: params });
        } catch (e) {

        }
    };

    return (<UnitModal 
        unitModal={editUnitModal}
        handleSubmit={handleSubmit}
        refreshList={refreshList} 
        requestState={requestState}
        initialState={selected}
    />);
}
 
export default EditUnitModal;