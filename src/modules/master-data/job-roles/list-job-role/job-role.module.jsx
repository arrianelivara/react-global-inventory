import { Button, DataTable, WrapperA } from 'components';
import { useForm, useModal } from 'hooks';
import { PlusOutlined, EditOutlined,DeleteOutlined } from "@ant-design/icons";
import React, { useCallback, useMemo } from 'react';
import lang from "translations";
import { StyleType } from 'enums';
import AddJobRoleModal from '../add-job-role/add-job-role-modal.module';
import EditJobRoleModal from '../edit-job-role/edit-job-role-modal.module';
import { columns } from './columns';
import { useApi, useFilter, useMount, useSelectItems } from 'hooks/index';
import { searchJobRole } from 'apis/job-role.api';
import { jobRolesResponse } from 'mappers/job-role.mapper';
import DeleteJobRoleModal from '../delete-job-role/delete-job-role-modal.module';

const JobRoles = () => {
    const addJobRoleModal = useModal();
    const editJobRoleModal = useModal();
    const deleteJobRoleModal = useModal();

    const { request, loading ,
        result: searchJobRolesResult = { metadata: [], total: 0, numPages: 0 },
        mappedData } = useApi({
        api: searchJobRole,
        isArray: true,
        mapper: jobRolesResponse
    });

    const { modifyFilters, filterState, requestState } = useFilter({
        pageSize: 10,
        currentPage: 1,
        sortBy: "updated_at",
        sort: { value: "desc", key: "updated_at"} 
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

    const { selected, setSelected, isAllSelected, setSelectAll, clearSelected } =
        useSelectItems({
        items: jobRoles,
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
          fetchJobRoles({ ...requestState, sortBy: value === "desc" ? `-${key}` : key });
        },
        [fetchJobRoles, modifyFilters]
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
                        disabled={Object.keys(selected).length === 0}
                        onClick={() => {
                            editJobRoleModal.show({
                                title: lang.updateExistingJobRole,
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
                            deleteJobRoleModal.show();
                        }}>
                        {lang.delete}
                </Button>
            </div>
        }
        >
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
            sort={filterState.sort}
            setSort={sortCb}
        />
        <AddJobRoleModal 
            addJobRoleModal={addJobRoleModal} 
            refreshList={fetchJobRoles} 
            requestState={requestState}
        />
        <EditJobRoleModal  
            editJobRoleModal={editJobRoleModal} 
            selected={selected}
            refreshList={fetchJobRoles} 
            requestStae={requestState}
        />
        <DeleteJobRoleModal
            selected={selected}
            deleteJobRoleModal={deleteJobRoleModal} 
            refreshList={fetchJobRoles} 
            requestState={requestState}
        />
    </WrapperA>);
}
 
export default JobRoles;