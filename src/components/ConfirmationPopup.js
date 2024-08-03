import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ConfirmationPopup = ({ visible, onConfirm, onCancel, todoTitle }) => {
    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={visible}
            onRequestClose={onCancel}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <Text style={styles.descriptionText}>Are you sure you want to delete the task?</Text>
                    <Text style={styles.todoTitle}>{todoTitle}</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={onConfirm} style={styles.confirmButton}>
                            <Text style={styles.buttonText}>Confirm</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    descriptionText: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
    },
    todoTitle: {
        fontSize: 20,
        marginBottom: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    confirmButton: {
        backgroundColor: '#ff6347',
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
        flex: 1,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        padding: 10,
        borderRadius: 5,
        marginLeft: 10,
        flex: 1,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '700',
    },
});

export default ConfirmationPopup;
