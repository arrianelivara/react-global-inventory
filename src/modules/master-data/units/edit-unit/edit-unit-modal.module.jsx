import { updateUnit } from 'apis/unit.api';
import { useApi } from 'hooks/index';
import React from 'react';
import UnitModal from '../modal-unit/unit-modal.module';
const EditUnitModal = ({ editUnitModal, selected }) => {
    const { request } = useApi({
        api: updateUnit
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
    console.log(selected)
    return (<UnitModal 
        unitModal={editUnitModal}
        handleSubmit={handleSubmit}
        initialState={selected}
    />);
}
 
export default EditUnitModal;