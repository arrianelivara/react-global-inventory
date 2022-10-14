import { DataTable, WrapperA, Button } from 'components';
import { useForm, useModal } from 'hooks';
import initialFormState from 'modules/master-data/common/warehouse-state.module';
import WarehouseSelection from 'modules/master-data/common/warehouse.module';
import React, { useCallback, useMemo } from 'react';
import lang from 'translations';
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { StyleType } from 'enums';
import AddSupplierModal from '../add-supplier/add-supplier-modal.module';
import EditSupplierModal from '../edit-supplier/edit-supplier-modal.module';
import { columns } from './columns';
import { useApi, useFilter, useMount, useSelectItems } from 'hooks/index';
import { searchSupplier } from 'apis/supplier.api';
import { supplierResponse } from 'mappers/supplier.mapper';

const Supplier = () => {
    const addSupplierModal = useModal();
    const editSupplierModal = useModal();

    const { request, loading ,
        result: searchSupplierResult = { metadata: [], total: 0, numPages: 0 },
        mappedData } = useApi({
        api: searchSupplier,
        isArray: true,
        mapper: supplierResponse
    });

    const { modifyFilters, filterState, requestState } = useFilter({
        pageSize: 10,
        currentPage: 1
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
                            onClick={() => {
                                editSupplierModal.show({
                                    title: lang.updateExistingSupplier,
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
            />
            <AddSupplierModal 
                addSupplierModal={addSupplierModal}
                refreshList={fetchSupplier} 
                requestState={requestState}/>
            <EditSupplierModal editSupplierModal={editSupplierModal} selected={selected} />
        </WrapperA>);
}
 
export default Supplier;