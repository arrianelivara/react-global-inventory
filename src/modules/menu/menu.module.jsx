import React from 'react'
import { Text } from 'components';

const Menu = () => {

    return (
    <React.Fragment>
        <div className="drop-shadow-md py-14 md:py-32 mx-auto my-32 rounded-md border-b-2 border-blue w-3/4 bg-white p-xl">
            <Text fontWeight="font-semibold" size="font-xxl" color="text-blue">Welcome to your all-in-one service platform.</Text>
            <Text size="text-3xl" fontWeight="font-semibold" color="text-blue-lightest" className="mt-md">
                This is the homepage. Navigate through the side menu options to get started.
            </Text>
        </div>
    </React.Fragment>);
}
 
export default Menu;