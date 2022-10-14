import { createUnit } from 'apis/unit.api';
import { useApi } from 'hooks/index';
import React from 'react';
import UnitModal from '../modal-unit/unit-modal.module';
const AddUnitModal = ({ addUnitModal }) => {

    const { request } = useApi({
        api: createUnit
    });

    const handleSubmit = async (params) => {
        try {
            console.log(params);
            await request(params);
            console.log("created")
        } catch (e) {

        }
    };
    return (<UnitModal unitModal={addUnitModal} handleSubmit={handleSubmit}/>);
}
 
export default AddUnitModal;