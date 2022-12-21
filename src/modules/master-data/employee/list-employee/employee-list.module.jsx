import { Button, DataTable, WrapperA } from 'components';
import { StyleType } from 'enums';
import React, { useCallback } from 'react'
import { columns } from './columns';
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useForm, useModal } from "hooks";
import lang from "translations";
import AddEmployeeModal from '../add-employee/add-employee-modal.module';
import EditEmployeeModal from '../edit-employee/edit-employee-modal.module';
import WarehouseSelection from '../../common/warehouse.module';
import { useMemo } from 'react';
import initialFormState from '../../common/warehouse-state.module';
import { useApi, useFilter, useMount, useSelectItems } from 'hooks/index';
import { employeeData, employeeResponse } from 'mappers/employee.mapper';
import { getEmployeeById, searchEmployees } from 'apis/employee.api';

const EmployeeList = () => {
    const addEmployeeModal = useModal();
    const editEmployeeModal = useModal();

    const { request, loading ,
        result: searchEmployeeResult = { metadata: [], total: 0, numPages: 0 },
        mappedData, error } = useApi({
        api: searchEmployees,
        isArray: true,
        mapper: employeeResponse
    });

    const { modifyFilters, filterState, requestState } = useFilter({
        pageSize: 10,
        currentPage: 1,
        filterBy: "warehouse",
        filterId: null,
        sortBy: "updated_at",
        sort: { value: "desc", key: "updated_at"} 
    });

    useMount(() => {
        fetchEmployees(requestState);
    });

    const fetchEmployees = useCallback(
        (requestState) => {
            request(requestState);
        },
        [request]
    );

    const prepareEmployeeList = useCallback(() => {
        return mappedData;
    }, [mappedData]);

    const employees = useMemo(() => {
        return prepareEmployeeList();
    }, [prepareEmployeeList]);

    const { selected, setSelected, isAllSelected, setSelectAll, clearSelected } =
        useSelectItems({
        items: employees,
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

    const { request: requestEmployee, loading: requestingEmployee, mappedData: employeeMapped } = useApi({
        api: getEmployeeById,
        mapper: employeeData
    });

    const handleWarehouseChange = (params) => {
        const obj = {
            filterBy: "warehouse",
            filterId: params
        }
        modifyFilters({...requestState, ...obj});
        fetchEmployees({...requestState, ...obj});
    };

    const sortCb = useCallback(
        ({ value, key }) => {
          const { requestState } = modifyFilters({ sort: { key, value } });
          fetchEmployees({ ...requestState, sortBy: value === "desc" ? `-${key}` : key });
        },
        [fetchEmployees, modifyFilters]
    );

    return (
        <WrapperA
            title={lang.employees}
            description={lang.listOfEmployees}
            actionButtons={
                <div className="mt-md">
                    <Button iconPrefix={<PlusOutlined className="mr-sm" />} className="mr-sm"
                        onClick={() => {
                            addEmployeeModal.show({
                                title: lang.registerNewEmployee,
                                okText: lang.add,
                                width: "50%"
                            })
                        }}>
                        {lang.add}
                    </Button>
                    <Button iconPrefix={<EditOutlined className="mr-sm"/>} 
                            type={StyleType.Secondary}
                            disabled={Object.keys(selected).length === 0}
                            onClick={async () => {
                                let id = Object.values(selected)[0]?.id || null;
                                if (id) {
                                    const res = await requestEmployee({ id });
                                    editEmployeeModal.show({
                                        title: lang.updateEmployeeInfo,
                                        okText: lang.save,
                                        width: "50%",
                                    })
                                }
                                
                            }}
                        >{lang.update}
                    </Button>
                    <Button iconPrefix={<DeleteOutlined className="mr-sm" />} className="mx-sm"
                        disabled={Object.keys(selected).length === 0}
                        type={StyleType.Danger}>
                        {lang.delete}
                    </Button>
                </div>
            }
            filterButtons={
                <WarehouseSelection 
                    field={fields.warehouse} 
                    modifyField={modifyField} 
                    handleChange={handleWarehouseChange}
                />
            }>
            <DataTable 
                error={error}
                loading={loading} 
                total={searchEmployeeResult.metadata.total}
                data={mappedData} 
                columns={columns}
                selected={selected}
                setSelected={setSelected}
                isAllSelected={isAllSelected}
                setSelectAll={setSelectAll}
                currentPage={filterState.currentPage}
                pageSize={filterState.pageSize}
                onChangePage={changePageConfigCb}
                fetchList={fetchEmployees}
                sort={filterState.sort}
                setSort={sortCb}
            />
            <AddEmployeeModal addEmployeeModal={addEmployeeModal} refreshList={fetchEmployees} requestState={requestState}/>
            <EditEmployeeModal editEmployeeModal={editEmployeeModal} 
                refreshList={fetchEmployees} 
                requestState={requestState}
                loading={requestingEmployee}
                initialState={employeeMapped}
            />
        </WrapperA>
    );
}
 
export default EmployeeList;