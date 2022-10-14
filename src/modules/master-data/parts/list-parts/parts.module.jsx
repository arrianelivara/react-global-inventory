import { DataTable, WrapperA, Button } from 'components';
import { useForm, useModal } from 'hooks';
import initialFormState from 'modules/master-data/common/warehouse-state.module';
import WarehouseSelection from 'modules/master-data/common/warehouse.module';
import React, { useCallback, useMemo } from 'react';
import lang from 'translations';
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import AddPartsModal from '../add-parts/add-parts-modal.module';
import EditPartsModal from '../edit-parts/edit-parts-modal.module';
import { StyleType } from 'enums';
import { columns } from './columns';
import { useApi, useFilter, useMount, useSelectItems } from 'hooks/index';
import { searchPart } from 'apis/part.api';
import { partResponse } from 'mappers/part.mapper';

const Parts = () => {
    const addPartsModal = useModal();
    const editPartsModal = useModal();

    const { request, loading ,
        result: searchPartsResult = { metadata: [], total: 0, numPages: 0 },
        mappedData } = useApi({
        api: searchPart,
        isArray: true,
        mapper: partResponse
    });

    const { modifyFilters, filterState, requestState } = useFilter({
        pageSize: 10,
        currentPage: 1
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

    const { selected, selectedCount, setSelected, isAllSelected, setSelectAll, clearSelected } =
        useSelectItems({
        items: parts,
    });

    const formState = useMemo(() => {
        return initialFormState();
    }, []);

    const { fields, modifyField } = useForm({ initialState: formState })

    const changePageConfigCb = useCallback(
        (pageProps) => {
          clearSelected();
          return modifyFilters(pageProps);
        },
        [modifyFilters, clearSelected]
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
                            onClick={() => {
                                editPartsModal.show({
                                    title: lang.updateExistingPart,
                                    okText: lang.save,
                                    width: "50%"
                                })
                            }}
                        >{lang.update}
                    </Button>
                </div>}
            filterButtons={
                <WarehouseSelection field={fields.warehouse} modifyField={modifyField}/>
            }>
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
            />
            <AddPartsModal 
                addPartsModal={addPartsModal}
                refreshList={fetchParts}
                requestState={requestState}
            />
            <EditPartsModal editPartsModal={editPartsModal} selected={selected}/>
        </WrapperA>);
}
 
export default Parts;