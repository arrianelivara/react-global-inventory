import { Button, DataTable, WrapperA } from 'components/index';
import { useForm } from 'hooks/index';
import initialFormState from 'modules/master-data/common/warehouse-state.module';
import WarehouseSelection from 'modules/master-data/common/warehouse.module';
import React, { useMemo } from 'react';
import lang from "translations";

const InventorySummary = () => {
    const formState = useMemo(() => {
        return initialFormState();
    }, []);

    const { fields, modifyField } = useForm({ initialState: formState })
    
    return (<WrapperA title={lang.inventory} description={lang.searchAndView}
        actionButtons={
            <Button>Export to Excel</Button>
        }
        filterButtons={
            <WarehouseSelection field={fields.warehouse} modifyField={modifyField}/>           
        }>
        <DataTable data={[]}/>

    </WrapperA>);
}
 
export default InventorySummary;