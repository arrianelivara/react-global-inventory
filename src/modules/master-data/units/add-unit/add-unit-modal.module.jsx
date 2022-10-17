import { createUnit } from 'apis/unit.api';
import { useApi } from 'hooks/index';
import React from 'react';
import UnitModal from '../modal-unit/unit-modal.module';
const AddUnitModal = ({ addUnitModal, refreshList, requestState }) => {

    const { request } = useApi({
        api: createUnit
    });

    const handleSubmit = async (params) => {
        try {
            console.log(params);
            await request(params);
        } catch (e) {

        }
    };
    return (<UnitModal 
        unitModal={addUnitModal} 
        refreshList={refreshList}
        requestState={requestState}
        handleSubmit={handleSubmit}/>);
}
 
export default AddUnitModal;