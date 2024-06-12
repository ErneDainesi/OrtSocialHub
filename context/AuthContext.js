import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const register = async (payload, navigate) => {
        try {
            const response = await fetch(process.env.DEV_URL + '/register', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            const result = await response.json();
            if (result.success) {
                await AsyncStorage.setItem('currentUserId', result.user.id);
                navigate("Home");
            } else {
                navigate("Error");
            }
        } catch (error) {
            navigate("Error");
        }
    }

    const login = async (payload, navigate) => { //Modificar esto con el back para login
        try {
            const response = await fetch(process.env.DEV_URL + '/login', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            const result = await response.json();
            if (result.success) {
                await AsyncStorage.setItem('currentUserId', result.user.id);
                navigate("Home");
            } else {
                navigate("Error");
            }
        } catch (error) {
            navigate("Error");
        }
    }

    return (
        <AuthContext.Provider value={{register, login}}> 
            { children }
        </AuthContext.Provider>
    );
}
