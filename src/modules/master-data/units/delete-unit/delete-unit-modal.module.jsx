import { Modal } from "antd";
import { useApi } from 'hooks/index';
import React from 'react';
import lang from "translations";
import { Text, Title } from 'components/index';
import { batchDeleteUnit } from 'apis/unit.api';

const DeleteUnitModal = ({ deleteUnitModal, selected, refreshList, requestState }) => {

    // const { request: requestDeleteUnit } = useApi({
    //     api: deleteUnit
    // });

    const { request: requestDeleteUnits } = useApi({
        api: batchDeleteUnit
    });

    return (<Modal
        {...deleteUnitModal}
        title={lang.deleteUnit}
        okText={lang.delete}
        cancelText='Cancel'
        onOk={async () => {
            const ids = Object.values(selected).map((s) => s.id);
            try {
                await requestDeleteUnits({ ids: ids });
                refreshList(requestState);
                deleteUnitModal.close();
            } catch (e){
                console.log("error");
                deleteUnitModal.close();
            }
        }}
        onCancel={() => {
            deleteUnitModal.close();
        }}
        >
            <Text className="ml-sm my-md ">Are you sure you want to delete the following item/s:</Text>
            {Object.values(selected).map((s) => {
                return <Title className="ml-sm">{`- ${s.unitName}`}</Title>
            })}
        </Modal>);
}
 
export default DeleteUnitModal;