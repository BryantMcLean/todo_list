import React from 'react';
import {View, Text, Image} from 'react-native';

const Fallback = () => {

    return (
        <View style={{alignItems: 'center'}}>
            <Image
                source={require('../../assets/Fallback.png')}
                style={{width: 300, height: 300}}
            />
            <Text>Start Adding Your Task</Text>
        </View>
    )
}

export default Fallback