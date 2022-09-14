import { Title, Text } from 'components';
import React from 'react'

const WrapperA = ({ title, description, actionButtons, filterButtons, children}) => {
    return (
        <React.Fragment>
            <Title lg>{title}</Title>
            {description && <Text description>{description}</Text>}
            <div className='flex items-center justify-between'>
                {actionButtons && actionButtons}
                {filterButtons && filterButtons}
            </div>
            {children}
        </React.Fragment>
    );
}
 
export default WrapperA;