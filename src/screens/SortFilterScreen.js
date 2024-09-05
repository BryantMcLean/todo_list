import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useSortFilter } from '../functions/SortFilterContext';

const SortFilterScreen = ({ navigation, route }) => {
    const { sortOption, setSortOption, filterOption, setFilterOption } = useSortFilter();
    const [selectedSortOption, setSelectedSortOption] = useState('creationDate');
    const [selectedFilterOption, setSelectedFilterOption] = useState('all');

    const applySortFilter = () => {
        setSortOption(selectedSortOption);
        setFilterOption(selectedFilterOption);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Sort and Filter Todos</Text>

            <Text style={styles.label}>Sort By:</Text>
            <Picker
                style={{padding: 8, borderRadius: 8}}
                selectedValue={selectedSortOption}
                onValueChange={(itemValue) => setSelectedSortOption(itemValue)}
            >
                <Picker.Item  style={{lineHeight: 15, color: 'red'}} label="Creation Date" value="creationDate" />
                <Picker.Item label="Finished Date" value="finishedDate" />
            </Picker>

            <Text style={styles.label}>Filter By:</Text>
            <Picker
                style={{padding: 8, borderRadius: 8}}
                selectedValue={selectedFilterOption}
                onValueChange={(itemValue) => setSelectedFilterOption(itemValue)}
            >
                <Picker.Item  style={{lineHeight: 15, color: 'red'}} label="All" value="all" />
                <Picker.Item label="Finished" value="finished" />
                <Picker.Item label="Unfinished" value="unfinished" />
            </Picker>
            <Pressable style={{alignSelf: 'center', backgroundColor: '#337ab7', marginTop: 20, borderColor: '#337ab7', borderWidth: 2, borderRadius: 6, paddingVertical: 6, paddingHorizontal: 12 }} onPress={applySortFilter}>
                <Text style={{fontSize: 20, color: '#FFFFFF', fontWeight: '700' }}>Apply</Text>
            </Pressable>
        </View>
    );
    };

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'white',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    label: {
        fontSize: 18,
        marginVertical: 8,
    },
    });

    export default SortFilterScreen;
