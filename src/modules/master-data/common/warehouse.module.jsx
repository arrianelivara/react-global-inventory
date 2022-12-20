import { getAllWarehouse } from 'apis/warehouse.api';
import { Field, Select } from 'components';
import { useApi, useMount } from 'hooks/index';
import { warehouseOptions } from 'mappers/warehouse.mapper';
import React from 'react';
import lang from "translations";

const WarehouseSelection = ({ field, modifyField }) => {

    const { request, loading ,
        mappedData } = useApi({
        api: getAllWarehouse,
        isArray: true,
        mapper: warehouseOptions
    });


    useMount(() => {
        request();
    });

    return (
        <div className="w-1/4">
            <Field label={lang.warehouseLabel} {...field}>
                <Select value="All" loading={loading} {...field} onChange={modifyField} text={lang.filterByWarehouse} options={[{value: "All", text: "All"}, ...mappedData]} />
            </Field>
        </div>
    );
}
 
export default WarehouseSelection;