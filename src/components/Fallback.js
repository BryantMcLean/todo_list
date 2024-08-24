import React from 'react';
import {View, Text, Image} from 'react-native';

const Fallback = ({ isFiltered }) => {

    return (
        <View style={{alignItems: 'center'}}>
            <Image
                source={isFiltered ? require('../../assets/EmptyFallback.png') : require('../../assets/Fallback.png')}
                style={{width: 300, height: 300}}
            />
            <Text style={{fontSize: isFiltered ? 18 : 18, fontWeight: isFiltered ? "700" : null}}>{isFiltered ? 'No todo\'s match your criteria' : 'Start Adding Your Task'}</Text>
        </View>
    )
}

export default Fallback