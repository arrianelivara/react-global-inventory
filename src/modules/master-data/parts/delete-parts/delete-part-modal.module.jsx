import { Modal } from "antd";
import { useApi } from 'hooks/index';
import React from 'react';
import lang from "translations";
import { Text, Title } from 'components/index';
import { batchDeletePart } from 'apis/part.api';

const DeletePartModal = ({ deletePartModal, selected, refreshList, requestState }) => {

    // const { request: requestDeleteBrand } = useApi({
    //     api: deletePart
    // });

    const { request: requestDeleteParts } = useApi({
        api: batchDeletePart
    });

    return (<Modal
        {...deletePartModal}
        title={lang.deletePart}
        okText={lang.delete}
        cancelText='Cancel'
        onOk={async () => {
            const ids = Object.values(selected).map((s) => s.id);
            try {
                await requestDeleteParts({ ids: ids });
                refreshList(requestState);
                deletePartModal.close();
            } catch (e){
                console.log("error");
                deletePartModal.close();
            }
        }}
        onCancel={() => {
            deletePartModal.close();
        }}
        >
            <Text className="ml-sm my-md ">Are you sure you want to delete the following item/s:</Text>
            {Object.values(selected).map((s) => {
                return <Title className="ml-sm">{`- ${s.partNo} ${s.description}`}</Title>
            })}
        </Modal>);
}
 
export default DeletePartModal;