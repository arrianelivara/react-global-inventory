import { searchInventorySummary } from 'apis/index';
import { Button, DataTable, WrapperA } from 'components/index';
import { useApi, useFilter, useForm, useMount, useSelectItems } from 'hooks/index';
import { inventorySummaryListResponse } from 'mappers/inventory.mapper';
import initialFormState from 'modules/master-data/common/warehouse-state.module';
import WarehouseSelection from 'modules/master-data/common/warehouse.module';
import React, { useCallback, useMemo } from 'react';
import lang from "translations";
import { columns } from './columns';

const InventorySummary = () => {
    const { request, loading ,
        result: searchInventoryResult = { metadata: [], total: 0, numPages: 0 },
        mappedData, error } = useApi({
        api: searchInventorySummary,
        isArray: true,
        mapper: inventorySummaryListResponse
    });

    const formState = useMemo(() => {
        return initialFormState();
    }, []);

    const { fields, modifyField } = useForm({ initialState: formState })
    

    const { modifyFilters, filterState, requestState } = useFilter({
        pageSize: 10,
        currentPage: 1,
        filterBy: "warehouse",
        filterId: null
    });

    useMount(() => {
        fetchInventorySummaryList(requestState);
    });

    const fetchInventorySummaryList = useCallback(
        (requestState) => {
            request(requestState);
        },
        [request]
    );

    const prepareInventorySummaryList = useCallback(() => {
        return mappedData;
    }, [mappedData]);

    const inventorySummary = useMemo(() => {
        return prepareInventorySummaryList();
    }, [prepareInventorySummaryList]);

    const { selected, setSelected, isAllSelected, setSelectAll, clearSelected } =
        useSelectItems({
        items: inventorySummary,
    });

    const changePageConfigCb = useCallback(
        (pageProps) => {
          clearSelected();
          return modifyFilters(pageProps);
        },
        [modifyFilters, clearSelected]
    );

    const handleWarehouseChange = (params) => {
        const obj = {
            filterBy: "warehouse",
            filterId: params
        }
        modifyFilters({...requestState, ...obj});
        fetchInventorySummaryList({...requestState, ...obj});
    };

    return (<WrapperA title={lang.inventory} description={lang.searchAndView}
        actionButtons={
            <Button>Export to Excel</Button>
        }
        filterButtons={
            <WarehouseSelection field={fields.warehouse} modifyField={modifyField}
                handleChange={handleWarehouseChange}/>           
        }>
        <DataTable 
            data={mappedData}
            error={error}
            loading={loading}
            columns={columns}
            total={searchInventoryResult.metadata.total}
            selected={selected}
            setSelected={setSelected}
            isAllSelected={isAllSelected}
            setSelectAll={setSelectAll}
            currentPage={filterState.currentPage}
            pageSize={filterState.pageSize}
            onChangePage={changePageConfigCb}
            fetchList={fetchInventorySummaryList}
        />

    </WrapperA>);
}
 
export default InventorySummary;