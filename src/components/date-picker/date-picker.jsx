import React from 'react';
import { DatePicker as AntDatePicker} from 'antd';
import classnames from "classnames";
import styles from "./date-picker.module.scss"
const DatePicker = ({ onChange, className }) => {

    return (<AntDatePicker onChange={onChange} className={classnames(className, styles.date)}></AntDatePicker>);
}
 
export default DatePicker;