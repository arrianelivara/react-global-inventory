import { Button, DataTable, WrapperA } from 'components';
import { useForm, useModal } from 'hooks';
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import WarehouseSelection from 'modules/master-data/common/warehouse.module';
import React, { useCallback, useMemo } from 'react';
import lang from "translations";
import { StyleType } from 'enums';
import initialFormState from 'modules/master-data/common/warehouse-state.module';
import AddJobRoleModal from '../add-job-role/add-job-role-modal.module';
import EditJobRoleModal from '../edit-job-role/edit-job-role-modal.module';
import { columns } from './columns';
import { useApi, useFilter, useMount, useSelectItems } from 'hooks/index';
import { searchJobRole } from 'apis/job-role.api';
import { jobRolesResponse } from 'mappers/job-role.mapper';

const JobRoles = () => {
    const addJobRoleModal = useModal();
    const editJobRoleModal = useModal();

    const { request, loading ,
        result: searchJobRolesResult = { metadata: [], total: 0, numPages: 0 },
        mappedData } = useApi({
        api: searchJobRole,
        isArray: true,
        mapper: jobRolesResponse
    });
    console.log(mappedData);
    const { modifyFilters, filterState, requestState } = useFilter({
        pageSize: 10,
        currentPage: 1
    });

    useMount(() => {
        fetchJobRoles(requestState);
    });

    const fetchJobRoles = useCallback(
        (requestState) => {
            request(requestState);
        },
        [request]
    );

    const prepareJobRoles = useCallback(() => {
        return mappedData;
    }, [mappedData]);

    const jobRoles = useMemo(() => {
        return prepareJobRoles();
    }, [prepareJobRoles]);

    const { selected, selectedCount, setSelected, isAllSelected, setSelectAll, clearSelected } =
        useSelectItems({
        items: jobRoles,
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
    
    return (<WrapperA 
        title={lang.jobRoles} 
        description={lang.listOfJobRoles}
        actionButtons={
            <div className="mt-md">
                <Button iconPrefix={<PlusOutlined className="mr-sm" />} className="mr-sm"
                    onClick={() => {
                        addJobRoleModal.show({
                            title: lang.addJobRole,
                            okText: lang.add,
                            width: "50%"
                        })
                    }}>
                    {lang.add}
                </Button>
                <Button iconPrefix={<EditOutlined className="mr-sm"/>} 
                        type={StyleType.Secondary}
                        onClick={() => {
                            editJobRoleModal.show({
                                title: lang.updateExistingJobRole,
                                okText: lang.save,
                                width: "50%"
                            })
                        }}
                    >{lang.update}
                </Button>
            </div>
        }
        filterButtons={
            <WarehouseSelection field={fields.warehouse} modifyField={modifyField}/>
        }>
        <DataTable 
            data={mappedData} 
            columns={columns}
            loading={loading} 
            total={searchJobRolesResult.metadata.total}
            selected={selected}
            setSelected={setSelected}
            isAllSelected={isAllSelected}
            setSelectAll={setSelectAll}
            currentPage={filterState.currentPage}
            pageSize={filterState.pageSize}
            onChangePage={changePageConfigCb}
            fetchList={fetchJobRoles}
        />
        <AddJobRoleModal 
            addJobRoleModal={addJobRoleModal} 
            refreshList={fetchJobRoles} 
            requestState={requestState}
        />
        <EditJobRoleModal  editJobRoleModal={editJobRoleModal} selected={selected}/>
    </WrapperA>);
}
 
export default JobRoles;