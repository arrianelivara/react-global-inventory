import { Modal } from "antd";
import { useApi } from 'hooks/index';
import React from 'react';
import lang from "translations";
import { Text, Title } from 'components/index';
import { batchDeleteSupplier } from 'apis/supplier.api';

const DeleteSupplierModal = ({ deleteSupplierModal, selected, refreshList, requestState }) => {

    // const { request: requestDeleteSupplier } = useApi({
    //     api: deleteBrand
    // });

    const { request: requestDeleteSuppliers } = useApi({
        api: batchDeleteSupplier
    });

    return (<Modal
        {...deleteSupplierModal}
        title={lang.deleteSupplier}
        okText={lang.delete}
        cancelText='Cancel'
        onOk={async() => {
            const ids = Object.values(selected).map((s) => s.id);
            try {
                await requestDeleteSuppliers({ ids: ids });
                refreshList(requestState);
                deleteSupplierModal.close();
            } catch (e){
                console.log("error");
                deleteSupplierModal.close();
            }
        }}
        onCancel={() => {
            deleteSupplierModal.close();
        }}
        >
            <Text className="ml-sm my-md ">Are you sure you want to delete the following item/s:</Text>
            {Object.values(selected).map((s) => {
                return <Title className="ml-sm">{`- ${s.supplierName}`}</Title>
            })}
        </Modal>);
}
 
export default DeleteSupplierModal;