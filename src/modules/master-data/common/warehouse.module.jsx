import { Field, Select } from 'components';
import React from 'react';
import lang from "translations";

const WarehouseSelection = ({ field, modifyField }) => {

    const sampleWarehouses = [
        {
            value: 0,
            text: "All",
        },
        {
            value: 1,
            text: "Warehouse 1",
        }
    ];

    return (
        <div className="w-1/4">
            <Field label={lang.warehouseLabel} {...field}>
                <Select {...field} onChange={modifyField} options={sampleWarehouses} text={lang.filterByWarehouse} />
            </Field>
        </div>
    );
}
 
export default WarehouseSelection;