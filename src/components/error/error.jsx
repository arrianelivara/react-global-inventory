import { Navigation, Text, Title } from 'components/index';
import React from 'react';

const Error = () => {
    return (
        <React.Fragment>
            <Navigation isLoggedIn={false} />
            <div className="w-1/2 m-auto text-center mt-xxl pt-xxl">
            <Title className="text-xl4" color="text-red">Oh nooooo! :(</Title>
            <Text size="text-lg">There seems to be an error in our end. It's not you. It's us. </Text>
            <Text size="text-lg">Please contact the developers for further investigation.</Text>
            </div>
        </React.Fragment>
    );
}
 
export default Error;