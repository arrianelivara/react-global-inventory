import { Modal } from "antd";
import { useApi } from 'hooks/index';
import React from 'react';
import lang from "translations";
import { Text, Title } from 'components/index';
import { batchDeleteWarehouse } from 'apis/warehouse.api';

const DeleteWarehouseModal = ({ deleteWarehouseModal, selected, refreshList, requestState }) => {

    const { request: requestDeleteWarehouses } = useApi({
        api: batchDeleteWarehouse
    });

    return (<Modal
        {...deleteWarehouseModal}
        title={lang.deleteWarehouse}
        okText={lang.delete}
        cancelText='Cancel'
        onOk={() => {
            const ids = Object.values(selected).map((s) => s.id);
            try {
                requestDeleteWarehouses({ ids: ids });
                refreshList(requestState);
                deleteWarehouseModal.close();
            } catch (e){
                console.log("error");
                deleteWarehouseModal.close();
            }
        }}
        onCancel={() => {
            deleteWarehouseModal.close();
        }}
        >
            <Text className="ml-sm my-md ">Are you sure you want to delete the following item/s:</Text>
            {Object.values(selected).map((s) => {
                return <Title className="ml-sm">{`- ${s.warehouseName}`}</Title>
            })}
        </Modal>);
}
 
export default DeleteWarehouseModal;