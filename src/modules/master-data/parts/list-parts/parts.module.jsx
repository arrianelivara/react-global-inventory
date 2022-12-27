import { DataTable, WrapperA, Button } from 'components';
import {  useModal } from 'hooks';
import React, { useCallback, useMemo } from 'react';
import lang from 'translations';
import { PlusOutlined, EditOutlined,DeleteOutlined } from "@ant-design/icons";
import AddPartsModal from '../add-parts/add-parts-modal.module';
import EditPartsModal from '../edit-parts/edit-parts-modal.module';
import { StyleType } from 'enums';
import { columns } from './columns';
import { useApi, useFilter, useMount, useSelectItems } from 'hooks/index';
import { searchPart } from 'apis/part.api';
import { partResponse } from 'mappers/part.mapper';
import DeletePartModal from '../delete-parts/delete-part-modal.module';

const Parts = () => {
    const addPartsModal = useModal();
    const editPartsModal = useModal();
    const deletePartModal = useModal();

    const { request, loading ,
        result: searchPartsResult = { metadata: [], total: 0, numPages: 0 },
        mappedData } = useApi({
        api: searchPart,
        isArray: true,
        mapper: partResponse
    });

    const { modifyFilters, filterState, requestState } = useFilter({
        pageSize: 10,
        currentPage: 1,
        sortBy: "updated_at",
        sort: { value: "desc", key: "updated_at"} 
    });

    useMount(() => {
        fetchParts(requestState);
    });

    const fetchParts = useCallback(
        (requestState) => {
            request(requestState);
        },
        [request]
    );

    const prepareParts = useCallback(() => {
        return mappedData;
    }, [mappedData]);

    const parts = useMemo(() => {
        return prepareParts();
    }, [prepareParts]);

    const { selected, setSelected, isAllSelected, setSelectAll, clearSelected } =
        useSelectItems({
        items: parts,
    });

    const changePageConfigCb = useCallback(
        (pageProps) => {
          clearSelected();
          return modifyFilters(pageProps);
        },
        [modifyFilters, clearSelected]
    );

    const sortCb = useCallback(
        ({ value, key }) => {
          const { requestState } = modifyFilters({ sort: { key, value } });
          fetchParts({ ...requestState, sortBy: value === "desc" ? `-${key}` : key });
        },
        [fetchParts, modifyFilters]
    );

    return (
        <WrapperA title={lang.parts} 
            description={lang.listOfParts}
            actionButtons={
                <div className="mt-md">
                    <Button iconPrefix={<PlusOutlined className="mr-sm" />} className="mr-sm"
                        onClick={() => {
                            addPartsModal.show({
                                title: lang.addNewPart,
                                okText: lang.add,
                                width: "50%"
                            })
                        }}>
                        {lang.add}
                    </Button>
                    <Button iconPrefix={<EditOutlined className="mr-sm"/>} 
                            type={StyleType.Secondary}
                            disabled={Object.keys(selected).length === 0}
                            onClick={() => {
                                editPartsModal.show({
                                    title: lang.updateExistingPart,
                                    okText: lang.save,
                                    width: "50%"
                                })
                            }}
                        >{lang.update}
                    </Button>
                    <Button iconPrefix={<DeleteOutlined className="mr-sm" />} className="mx-sm"
                        disabled={Object.keys(selected).length === 0}
                        type={StyleType.Danger}
                        onClick={() => {
                            deletePartModal.show();
                        }}>
                        {lang.delete}
                    </Button>
                </div>}
            >
            <DataTable 
                data={mappedData} 
                columns={columns}
                total={searchPartsResult.metadata.total}
                selected={selected}
                setSelected={setSelected}
                isAllSelected={isAllSelected}
                setSelectAll={setSelectAll}
                currentPage={filterState.currentPage}
                pageSize={filterState.pageSize}
                onChangePage={changePageConfigCb}
                fetchList={fetchParts}
                sort={filterState.sort}
                setSort={sortCb}
                loading={loading}
            />
            <AddPartsModal 
                addPartsModal={addPartsModal}
                refreshList={fetchParts}
                requestState={requestState}
            />
            <EditPartsModal 
                editPartsModal={editPartsModal} 
                selected={selected}
                refreshList={fetchParts}
                requestState={requestState}
            />
            <DeletePartModal 
                selected={selected}
                deletePartModal={deletePartModal} 
                refreshList={fetchParts} 
                requestState={requestState}
            />
        </WrapperA>);
}
 
export default Parts;