import { Button, Field, Select, WrapperA } from 'components/index';
import React from 'react';
import lang from "translations";

const InventorySummary = () => {
    return (<WrapperA title={lang.inventory} description={lang.searchAndView}
        actionButtons={
            <Button>Export to Excel</Button>
        }
        filterButtons={
            <div>
                <Field label={lang.warehouse} className="">
                <Select options={[]}/>
            </Field>
            </div>
            
        }>

    </WrapperA>);
}
 
export default InventorySummary;