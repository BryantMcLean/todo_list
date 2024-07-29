// DeviceInfo.js
import * as Device from 'expo-device';
import { Dimensions } from 'react-native';

const isIos = Device.osName === 'iOS';
const isIpad = Device.osName === 'iPadOS'
const isAndroid = Device.osName === 'Android';
// Basic check for tablet vs. phone
const { width, height } = Dimensions.get('window');
const diagonalScreenSize = Math.sqrt(width * width + height * height);

// You might need to adjust these thresholds based on your needs
const isTablet = diagonalScreenSize > 1200;
const isPhone = !isTablet;
const isDesktop = diagonalScreenSize > 1600;
// Add more device checks as needed

// Export a function or an object with the details you want to use for styling
export const deviceInfo = {
    isIos,
    isAndroid,
    isTablet,
    isIpad,
    isPhone,
    isDesktop,
    // include more properties as needed
};