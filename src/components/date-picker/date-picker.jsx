import React from 'react';
import { DatePicker as AntDatePicker} from 'antd';
import classnames from "classnames";
import styles from "./date-picker.module.scss"
const DatePicker = ({ onChange, className, value, ...props }) => {

    return (<AntDatePicker onChange={onChange} defaultValue={value} className={classnames(className, styles.date)}
        ></AntDatePicker>);
}
 
export default DatePicker;