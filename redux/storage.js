// // import { MMKV } from "react-native-mmkv";
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const storage = new MMKV();

// const reduxStorafge = {
//     setItem: (key, value) => {
//         storage.set(key, value);
//         return Promise.resolve(true)
//     },
//     getItem: key => {
//         storage.getString(key);
//         return Promise.resolve(key)
//     },
//     removeItem: key => {
//         storage.delete(key);
//         return Promise.resolve()
//     }
// }

// export default reduxStorafge


import AsyncStorage from '@react-native-async-storage/async-storage';

const reduxStorage = {
    setItem: async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
            return true;
        } catch (error) {
            console.error("Error setting item", error);
            return false;
        }
    },
    getItem: async (key) => {
        try {
            const value = await AsyncStorage.getItem(key);
            return value !== null ? value : null;
        } catch (error) {
            console.error("Error getting item", error);
            return null;
        }
    },
    removeItem: async (key) => {
        try {
            await AsyncStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error("Error removing item", error);
            return false;
        }
    }
};

export default reduxStorage;
