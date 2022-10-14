import React from 'react';
import { DatePicker as AntDatePicker} from 'antd';
import classnames from "classnames";
import styles from "./date-picker.module.scss"
const DatePicker = ({ onChange, className, value, ...props }) => {

    return (<AntDatePicker 
            onChange={onChange} 
            className={classnames(className, styles.date)}
            value={value}
            {...props}
        ></AntDatePicker>);
}
 
export default DatePicker;