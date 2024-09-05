import React, { useState } from 'react';
import { View, Button, Platform } from 'react-native';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { htmlContentForAndroid, htmlContentForiOS } from '../components/htmlTemplates';
import { deviceInfo } from '../functions/DeviceInfo';

const PrintTodoListScreen = ({ route }) => {
    const { todoList } = route.params;
    const [pdfUri, setPdfUri] = useState(null);

    // Determine which HTML content to use based on the platform
    const htmlContent = Platform.OS === 'ios'
        ? htmlContentForiOS(todoList) 
        : htmlContentForAndroid(todoList);
        // Log the generated HTML content to verify it
    console.log("Generated HTML content:", htmlContent);

    const printPDF = async () => {
        try {
            const { uri } = await Print.printToFileAsync({
                html: htmlContent,
            });
            setPdfUri(uri);
            await Print.printAsync({ uri });  // Directly print the PDF
        } catch (error) {
            console.log('Failed to generate or print PDF', error);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button title="Generate and Print PDF" onPress={printPDF} />
            {pdfUri ? (
                <Button title="Share PDF" onPress={() => shareAsync(pdfUri)} />
            ) : null}
        </View>
    );
};

export default PrintTodoListScreen;
