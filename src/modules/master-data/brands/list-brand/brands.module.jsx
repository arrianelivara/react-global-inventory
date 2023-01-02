import { DataTable, WrapperA, Button } from 'components';
import { useModal } from 'hooks';
import React, { useMemo, useCallback } from 'react';
import lang from 'translations';
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { StyleType } from 'enums';
import AddBrandModal from '../add-brand/add-brand-modal.module';
import EditBrandModal from '../edit-brand/edit-brand-modal.module';
import { columns } from './columns';
import { useApi, useFilter, useMount, useSelectItems } from 'hooks/index';
import { searchBrand } from 'apis/brand.api';
import { brandListResponse } from 'mappers/brand.mapper';
import { brandFilterState } from './filters';
import DeleteBrandModal from '../delete-brand/delete-brand-modal.module';

const Brands = () => {
    const addBrandModal = useModal();
    const editBrandModal = useModal();
    const deleteBrandModal = useModal();

    const { request, loading ,
        result: searchBrandResult = { metadata: [], total: 0, numPages: 0 },
        mappedData, error } = useApi({
        api: searchBrand,
        isArray: true,
        mapper: brandListResponse
    });

    const { modifyFilters, filterState, requestState } = useFilter(brandFilterState("start_date"));

    useMount(() => {
        fetchBrands(requestState);
    });

    const fetchBrands = useCallback(
        async (requestState) => {
            request(requestState);
            clearSelected();
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
          fetchBrands({ ...requestState, sortBy: value === "desc" ? `-${key}` : key });
        },
        [fetchBrands, modifyFilters]
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
                            disabled={Object.keys(selected).length === 0}
                            onClick={() => {
                                editBrandModal.show({
                                    title: lang.updateExistingBrand,
                                    okText: lang.save,
                                    width: "50%",
                                })
                            }}
                        >{lang.update}
                    </Button>
                    <Button iconPrefix={<DeleteOutlined className="mr-sm" />} className="mx-sm"
                        disabled={Object.keys(selected).length === 0}
                        type={StyleType.Danger}
                        onClick={() => {
                            deleteBrandModal.show();
                        }}>
                        {lang.delete}
                    </Button>
                </div>}
            >
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
                sort={filterState.sort}
                setSort={sortCb}
            />
            <AddBrandModal addBrandModal={addBrandModal} refreshList={fetchBrands} requestState={requestState}/> 
            <EditBrandModal editBrandModal={editBrandModal} 
                selected={selected}
                refreshList={fetchBrands} 
                requestState={requestState}
            />
            <DeleteBrandModal 
                selected={selected}
                deleteBrandModal={deleteBrandModal} 
                refreshList={fetchBrands} 
                requestState={requestState}
            />
        </WrapperA>);
}
 
export default Brands;