'use strict';
import { StyleSheet } from 'react-native';
import { deviceInfo } from '../../src/functions/DeviceInfo';

module.exports = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    input: {
        borderWidth: 2,
        borderRadius: 8,
        borderColor: "#337ab7",
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#000',
        paddingVertical: 8,
        alignItems: 'center',
        borderRadius: 8,
        marginBottom: 20,
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 20,
    },
    flatListContent: {
        flexGrow: 1,
    },
    renderTodosView: {
        backgroundColor: '#1e90ff',
        borderRadius: 8,
        paddingHorizontal: 6,
        paddingVertical: 6,
        marginTop: 20,
        flexDirection: deviceInfo.isPhone ? 'column' : 'row',
        alignItems: 'center',
        elevation: 1,
        borderTopWidth: 0.5,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 0.5,
        borderTopColor: 'rgba(0,0,0,0.1)',
        borderRightColor: 'rgba(0,0,0,0.2)',
        borderBottomColor: 'rgba(0,0,0,0.3)',
        borderLeftColor: 'rgba(0,0,0,0.1)',
    },
    todoText: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: '800',
        flex: 1,
    },
    todoDate: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
        flex: 1,
    },
    spacer: {
        height: 8,
    },
    printer: {
        textAlign: 'center',
    },
})