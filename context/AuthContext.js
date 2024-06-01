import { createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const register = async (payload) => {
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
                navigation.navigate("Home");
            } else {
                navigation.navigate("Error");
            }
        } catch (error) {
            navigation.navigate("Error");
        }
    }

    return (
        <AuthContext.Provider value={{register}}>
            { children }
        </AuthContext.Provider>
    );
}
