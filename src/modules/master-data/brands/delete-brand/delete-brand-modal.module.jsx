import { batchDeleteBrand, deleteBrand } from 'apis/brand.api';
import { Modal } from "antd";
import { useApi } from 'hooks/index';
import React from 'react';
import lang from "translations";
import { Text, Title } from 'components/index';

const DeleteBrandModal = ({ deleteBrandModal, selected, refreshList, requestState }) => {

    // const { request: requestDeleteBrand } = useApi({
    //     api: deleteBrand
    // });

    const { request: requestDeleteBrands } = useApi({
        api: batchDeleteBrand
    });

    return (<Modal
        {...deleteBrandModal}
        title={lang.deleteBrand}
        okText={lang.delete}
        cancelText='Cancel'
        onOk={() => {
            const ids = Object.values(selected).map((s) => s.id);
            try {
                requestDeleteBrands({ ids: ids });
                refreshList(requestState);
                deleteBrandModal.close();
            } catch (e){
                console.log("error");
                deleteBrandModal.close();
            }
        }}
        onCancel={() => {
            deleteBrandModal.close();
        }}
        >
            <Text className="ml-sm my-md ">Are you sure you want to delete the following item/s:</Text>
            {Object.values(selected).map((s) => {
                return <Title className="ml-sm">{`- ${s.brandName}`}</Title>
            })}
        </Modal>);
}
 
export default DeleteBrandModal;