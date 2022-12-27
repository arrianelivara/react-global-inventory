import { DataTable, WrapperA, Button } from 'components';
import { useForm, useModal } from 'hooks';
import initialFormState from 'modules/master-data/common/warehouse-state.module';
import React, { useCallback, useMemo } from 'react';
import lang from 'translations';
import { PlusOutlined, EditOutlined,DeleteOutlined } from "@ant-design/icons";
import { StyleType } from 'enums';
import AddSupplierModal from '../add-supplier/add-supplier-modal.module';
import EditSupplierModal from '../edit-supplier/edit-supplier-modal.module';
import { columns } from './columns';
import { useApi, useFilter, useMount, useSelectItems } from 'hooks/index';
import { searchSupplier } from 'apis/supplier.api';
import { supplierResponse } from 'mappers/supplier.mapper';
import DeleteSupplierModal from '../delete-supplier/delete-supplier-modal.module';

const Supplier = () => {
    const addSupplierModal = useModal();
    const editSupplierModal = useModal();
    const deleteSupplierModal = useModal();

    const { request, loading ,
        result: searchSupplierResult = { metadata: [], total: 0, numPages: 0 },
        mappedData } = useApi({
        api: searchSupplier,
        isArray: true,
        mapper: supplierResponse
    });

    const { modifyFilters, filterState, requestState } = useFilter({
        pageSize: 10,
        currentPage: 1,
        sortBy: "updated_at",
        sort: { value: "desc", key: "updated_at"} 
    });

    useMount(() => {
        fetchSupplier(requestState);
    });

    const fetchSupplier = useCallback(
        (requestState) => {
            request(requestState);
        },
        [request]
    );

    const prepareSupplierList = useCallback(() => {
        return mappedData;
    }, [mappedData]);

    const supplier = useMemo(() => {
        return prepareSupplierList();
    }, [prepareSupplierList]);

    const { selected, selectedCount, setSelected, isAllSelected, setSelectAll, clearSelected } =
        useSelectItems({
        items: supplier,
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
          fetchSupplier({ ...requestState, sortBy: value === "desc" ? `-${key}` : key });
        },
        [fetchSupplier, modifyFilters]
    );

    return (
        <WrapperA title={lang.supplier} 
            description={lang.listOfSuppliers}
            actionButtons={
                <div className="mt-md">
                    <Button iconPrefix={<PlusOutlined className="mr-sm" />} className="mr-sm"
                        onClick={() => {
                            addSupplierModal.show({
                                title: lang.addNewSupplier,
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
                                editSupplierModal.show({
                                    title: lang.updateExistingSupplier,
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
                            deleteSupplierModal.show();
                        }}>
                        {lang.delete}
                    </Button>
                </div>}
            >
            <DataTable 
                data={mappedData} 
                columns={columns}
                loading={loading}
                total={searchSupplierResult.metadata.total}
                selected={selected}
                setSelected={setSelected}
                isAllSelected={isAllSelected}
                setSelectAll={setSelectAll}
                currentPage={filterState.currentPage}
                pageSize={filterState.pageSize}
                onChangePage={changePageConfigCb}
                fetchList={fetchSupplier}
                sort={filterState.sort}
                setSort={sortCb}
            />
            <AddSupplierModal 
                addSupplierModal={addSupplierModal}
                refreshList={fetchSupplier} 
                requestState={requestState}/>
            <EditSupplierModal 
                editSupplierModal={editSupplierModal} 
                refreshList={fetchSupplier} 
                requestState={requestState}
                selected={selected} />
            <DeleteSupplierModal 
                selected={selected}
                deleteSupplierModal={deleteSupplierModal} 
                refreshList={fetchSupplier} 
                requestState={requestState}
            />
        </WrapperA>);
}
 
export default Supplier;