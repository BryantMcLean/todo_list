import React from 'react';
import {View, Text, Image} from 'react-native';

const Fallback = () => {

    return (
        <View style={{alignItems: 'center'}}>
            <Image
                source={require('../../assets/Fallback.png')}
                style={{width: 400, height: 400}}
            />
            <Text>Start Adding Your Task</Text>
        </View>
    )
}

export default Fallback