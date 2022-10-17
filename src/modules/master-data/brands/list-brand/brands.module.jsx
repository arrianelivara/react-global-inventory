import { DataTable, WrapperA, Button } from 'components';
import { useForm, useModal } from 'hooks';
import initialFormState from 'modules/master-data/common/warehouse-state.module';
import WarehouseSelection from 'modules/master-data/common/warehouse.module';
import React, { useMemo, useCallback } from 'react';
import lang from 'translations';
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { StyleType } from 'enums';
import AddBrandModal from '../add-brand/add-brand-modal.module';
import EditBrandModal from '../edit-brand/edit-brand-modal.module';
import { columns } from './columns';
import { useApi, useFilter, useMount, useSelectItems } from 'hooks/index';
import { searchBrand } from 'apis/brand.api';
import { brandListResponse } from 'mappers/brand.mapper';

const Brands = () => {
    const addBrandModal = useModal();
    const editBrandModal = useModal();

    const { request, loading ,
        result: searchBrandResult = { metadata: [], total: 0, numPages: 0 },
        mappedData, error } = useApi({
        api: searchBrand,
        isArray: true,
        mapper:brandListResponse
    });

    const { modifyFilters, filterState, requestState } = useFilter({
        pageSize: 10,
        currentPage: 1
    });

    useMount(() => {
        fetchBrands(requestState);
    });

    const fetchBrands = useCallback(
        (requestState) => {
            request(requestState);
        },
        [request]
    );

    const prepareBrandList = useCallback(() => {
        return mappedData;
    }, [mappedData]);

    const brands = useMemo(() => {
        return prepareBrandList();
    }, [prepareBrandList]);

    const { selected, setSelected, isAllSelected, setSelectAll, clearSelected } =
        useSelectItems({
        items: brands,
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
        <WrapperA title={lang.brands} 
            description={lang.listOfBrands}
            actionButtons={
                <div className="mt-md">
                    <Button iconPrefix={<PlusOutlined className="mr-sm" />} className="mr-sm"
                        onClick={() => {
                            addBrandModal.show({
                                title: lang.addNewBrand,
                                okText: lang.add,
                                width: "50%"
                            })
                        }}>
                        {lang.add}
                    </Button>
                    <Button iconPrefix={<EditOutlined className="mr-sm"/>} 
                            type={StyleType.Secondary}
                            onClick={() => {
                                editBrandModal.show({
                                    title: lang.updateExistingBrand,
                                    okText: lang.save,
                                    width: "50%",
                                })
                            }}
                        >{lang.update}
                    </Button>
                </div>}
            filterButtons={
                <WarehouseSelection field={fields.warehouse} modifyField={modifyField}/>
            }>
            <DataTable 
                loading={loading} 
                total={searchBrandResult.metadata.total}
                data={mappedData} 
                columns={columns}
                selected={selected}
                setSelected={setSelected}
                isAllSelected={isAllSelected}
                setSelectAll={setSelectAll}
                currentPage={filterState.currentPage}
                pageSize={filterState.pageSize}
                onChangePage={changePageConfigCb}
                fetchList={fetchBrands}
                error={error}
            />
            <AddBrandModal addBrandModal={addBrandModal} refreshList={fetchBrands} requestState={requestState}/> 
            <EditBrandModal editBrandModal={editBrandModal} 
                selected={selected}
                refreshList={fetchBrands} 
                requestState={requestState}
            />
        </WrapperA>);
}
 
export default Brands;