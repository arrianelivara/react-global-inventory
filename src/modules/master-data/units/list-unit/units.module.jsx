import { DataTable, WrapperA, Button } from 'components';
import { useForm, useModal } from 'hooks';
import initialFormState from 'modules/master-data/common/warehouse-state.module';
import React, { useCallback, useMemo } from 'react';
import lang from 'translations';
import { PlusOutlined, EditOutlined,DeleteOutlined } from "@ant-design/icons";
import { StyleType } from 'enums';
import AddUnitModal from '../add-unit/add-unit-modal.module';
import EditUnitModal from '../edit-unit/edit-unit-modal.module';
import { columns } from './columns';
import { useApi, useFilter, useMount, useSelectItems } from 'hooks/index';
import { searchUnit } from 'apis/unit.api';
import { unitResponse } from 'mappers/unit.mapper';

const Units = () => {
    const addUnitModal = useModal();
    const editUnitModal = useModal();

    const { request, loading ,
        result: searchUnitResult = { metadata: [], total: 0, numPages: 0 },
        mappedData } = useApi({
        api: searchUnit,
        isArray: true,
        mapper: unitResponse
    });

    const { modifyFilters, filterState, requestState } = useFilter({
        pageSize: 10,
        currentPage: 1
    });

    useMount(() => {
        fetchUnits(requestState);
    });

    const fetchUnits = useCallback(
        (requestState) => {
            request(requestState);
        },
        [request]
    );

    const prepareUnitList = useCallback(() => {
        return mappedData;
    }, [mappedData]);

    const units = useMemo(() => {
        return prepareUnitList();
    }, [prepareUnitList]);

    const { selected, selectedCount, setSelected, isAllSelected, setSelectAll, clearSelected } =
        useSelectItems({
        items: units,
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
        <WrapperA title={lang.units} 
            description={lang.listOfUnits}
            actionButtons={
                <div className="mt-md">
                    <Button iconPrefix={<PlusOutlined className="mr-sm" />} className="mr-sm"
                        onClick={() => {
                            addUnitModal.show({
                                title: lang.addNewUnit,
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
                                editUnitModal.show({
                                    title: lang.updateExistingUnit,
                                    okText: lang.save,
                                    width: "50%"
                                })
                            }}
                        >{lang.update}
                    </Button>
                    <Button iconPrefix={<DeleteOutlined className="mr-sm" />} className="mx-sm"
                        disabled={Object.keys(selected).length === 0}
                        type={StyleType.Danger}>
                        {lang.delete}
                    </Button>
                </div>}
            >
            <DataTable 
                loading={loading} 
                total={searchUnitResult.metadata.total}
                data={mappedData} 
                columns={columns}
                selected={selected}
                setSelected={setSelected}
                isAllSelected={isAllSelected}
                setSelectAll={setSelectAll}
                currentPage={filterState.currentPage}
                pageSize={filterState.pageSize}
                onChangePage={changePageConfigCb}
                fetchList={fetchUnits} />
            <AddUnitModal 
                addUnitModal={addUnitModal}
                refreshList={fetchUnits}
                requestState={requestState} 
            />
            <EditUnitModal 
                editUnitModal={editUnitModal} 
                refreshList={fetchUnits}
                requestState={requestState}
                selected={selected}/>
        </WrapperA>);
}
 
export default Units;