import { DataTable, WrapperA, Button } from 'components';
import { useForm, useModal } from 'hooks';
import initialFormState from 'modules/master-data/common/warehouse-state.module';
import React, { useCallback, useMemo } from 'react';
import lang from 'translations';
import { PlusOutlined, EditOutlined,DeleteOutlined } from "@ant-design/icons";
import { StyleType } from 'enums';
import AddWarehouseModal from '../add-warehouse/add-warehouse-modal.module';
import EditWarehouseModal from '../edit-warehouse/edit-warehouse-modal.module';
import { columns } from './columns';
import { useApi, useFilter, useMount, useSelectItems } from 'hooks/index';
import { searchWarehouse } from 'apis/warehouse.api';
import { warehouseResponse } from 'mappers/warehouse.mapper';
import DeleteWarehouseModal from '../delete-warehouse/delete-warehouse-modal.module';

const Warehouse = () => {
    const addWarehouseModal = useModal();
    const editWarehouseModal = useModal();
    const deleteWarehouseModal = useModal();

    const { request, loading ,
        result: searchWarehouseResult = { metadata: [], total: 0, numPages: 0 },
        mappedData } = useApi({
        api: searchWarehouse,
        isArray: true,
        mapper: warehouseResponse
    });

    const { modifyFilters, filterState, requestState } = useFilter({
        pageSize: 10,
        currentPage: 1,
        sortBy: "updated_at",
        sort: { value: "desc", key: "updated_at"} 
    });

    useMount(() => {
        fetchWarehouses(requestState);
    });

    const fetchWarehouses = useCallback(
        (requestState) => {
            request(requestState);
            clearSelected();
        },
        [request]
    );

    const prepareWarehouseList = useCallback(() => {
        return mappedData;
    }, [mappedData]);

    const warehouse = useMemo(() => {
        return prepareWarehouseList();
    }, [prepareWarehouseList]);

    const { selected, setSelected, isAllSelected, setSelectAll, clearSelected } =
        useSelectItems({
        items: warehouse,
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
          fetchWarehouses({ ...requestState, sortBy: value === "desc" ? `-${key}` : key });
        },
        [fetchWarehouses, modifyFilters]
    );

    return (
        <WrapperA title={lang.warehouse} 
            description={lang.listOfWarehouse}
            actionButtons={
                <div className="mt-md">
                    <Button iconPrefix={<PlusOutlined className="mr-sm" />} className="mr-sm"
                        onClick={() => {
                            addWarehouseModal.show({
                                title: lang.addNewWarehouse,
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
                                editWarehouseModal.show({
                                    title: lang.updateExistingWarehouse,
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
                            deleteWarehouseModal.show();
                        }}>
                        {lang.delete}
                    </Button>
                </div>}
            >
            <DataTable
                data={mappedData} 
                columns={columns}
                loading={loading}
                total={searchWarehouseResult.metadata.total}
                selected={selected}
                setSelected={setSelected}
                isAllSelected={isAllSelected}
                setSelectAll={setSelectAll}
                currentPage={filterState.currentPage}
                pageSize={filterState.pageSize}
                onChangePage={changePageConfigCb}
                fetchList={fetchWarehouses}
                sort={filterState.sort}
                setSort={sortCb} 
            />
            <AddWarehouseModal 
                addWarehouseModal={addWarehouseModal}
                refreshList={fetchWarehouses}
                requestState={requestState}
            />
            <EditWarehouseModal 
                editWarehouseModal={editWarehouseModal} 
                selected={selected}
                refreshList={fetchWarehouses}
                requestState={requestState} />
            <DeleteWarehouseModal 
                selected={selected}
                deleteWarehouseModal={deleteWarehouseModal} 
                refreshList={fetchWarehouses} 
                requestState={requestState}
            />
        </WrapperA>);
}
 
export default Warehouse;