import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { createContext, useEffect, useState } from "react";
import { DEV_URL } from "../config";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { storage } from "../utils/firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigation = useNavigation();
    const [profile, setProfile] = useState(null);
    const [loginError, setLoginError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedInUserId, setLoggedInUserId] = useState(null);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);

    useEffect(() => {
        const checkAuthStatus = async () => {
            const userId = await AsyncStorage.getItem('loggedInUserId');
            if (userId) {
                setIsLoggedIn(true);
                setLoggedInUserId(userId);
            }
        };
        checkAuthStatus();
    }, []);


    const uploadFile = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        const filename = v4(); // generate a random name for the file to avoid repetition
        const reference = ref(storage, filename);
        await uploadBytes(reference, blob);
        const url = await getDownloadURL(reference);
        return url;
    }

    const validatePassword = (password) => {
        // Regular expression to check password strength
        const regex = /^(?=.*[A-Z])(?=.*\W).{12,}$/;
        return regex.test(password);
    };

    const register = async (payload, setPasswordError) => {
        try {
            if (!validatePassword(payload.password)) {
                setPasswordError(true);
                return;
            }
            let downloadUrl = "";
            if (payload.profilePicture) {
                downloadUrl = await uploadFile(payload.profilePicture);
            }
            const response = await fetch(DEV_URL + '/user/register', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({...payload, profilePicture: downloadUrl})
            });
            const result = await response.json();
            if (result.success) {
                navigation.navigate("Login");
            } else {
                console.log("error", result);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const login = async (payload) => {
        try {
            const response = await fetch(DEV_URL + '/user/login', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(payload)
            });
            const result = await response.json();
            if (result.success) {
                const {loggedInUserId, token} = result;
                await AsyncStorage.setItem('loggedInUserId', loggedInUserId);
                await AsyncStorage.setItem('token', token);
                setIsLoggedIn(true);
                setLoggedInUserId(loggedInUserId);
                navigation.navigate("Home");
            } else {
                setLoginError(true);
            }
        } catch (error) {
            setLoginError(true);
        }
    }

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('loggedInUserId');
            await AsyncStorage.removeItem('token');
            setIsLoggedIn(false);
            setLoggedInUserId(null);
            navigation.navigate("Login");
        } catch(error) {
            console.log(error.message)
        }
    };


    const fetchUserProfile = async (userId) => {
        try {
            const jwt = await AsyncStorage.getItem('token');
            const response = await fetch(DEV_URL + `/user/profile/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            });
            const result = await response.json();
            if (result.success) {
                setProfile(result.user);
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const followUser = async(userId, setIsFollowing) => {
        try {
            const jwt = await AsyncStorage.getItem('token');
            const loggedInUserId = await AsyncStorage.getItem('loggedInUserId');
            const response = await fetch (DEV_URL + '/user/follow',{
                method: "POST",
                headers:{
                    'Accept' : 'application/json',
                    'Content-type' : 'application/json',
                    'Authorization': `Bearer ${jwt}`
                },
                body: JSON.stringify({followerId: loggedInUserId, followedId: userId}),
                credentials: 'include'
            });
            const result = await response.json();
            if (result.success) {
                setIsFollowing(true);
                setFollowing(prevFollowing => [...prevFollowing, result.follow]);
            } else {
                console.log("Error: ", result.message);
            }
        } catch(error) {
            console.log(error.message)
        }
    };

    const unfollowUser = async(userId, setIsFollowing) => {
        try {
            const jwt = await AsyncStorage.getItem('token');
            const response = await fetch (DEV_URL + "/user/unfollow", {
                method: "POST",
                headers: {
                    'Accept' : 'application/json',
                    'Content-type' : 'application/json',
                    'Authorization': `Bearer ${jwt}`
                },
                body: JSON.stringify({followerId: loggedInUserId, followedId: userId}),
                credentials: 'include'
            });
            const result = await response.json();
            if (result.success) {
                setIsFollowing(false);
                setFollowing(prevFollowing => prevFollowing.filter(id => id !== userId));
            } else {
                console.log("Error: ", result.message);
            }
        } catch(error) {
            console.log(error.message)
        }
    };

    const editProfile = async (payload, setEditingProfile) => {
        try {
            const jwt = await AsyncStorage.getItem('token');
            let downloadUrl = "";
            if (payload.profilePicture && profile.profilePicture !== payload.profilePicture) {
                downloadUrl = await uploadFile(payload.profilePicture);
            } else {
                downloadUrl = profile.profilePicture;
            }
            const response = await fetch(DEV_URL + '/user/profile', {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${jwt}`
                },
                body: JSON.stringify({...payload, profilePicture: downloadUrl})
            });
            const result = await response.json();
            if (result.success) {
                setProfile(result.user);
                setEditingProfile(false);
            }
        } catch (error) {
            console.log("Failed to edit profile:", error.message);
        }
    }

    const fetchFollowing = async(userId) => {
        try {
            const jwt = await AsyncStorage.getItem('token');
            const response = await fetch (DEV_URL + `/user/followers/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            });
            const result = await response.json();
            if (result.success) {
                setFollowing(result.following);
            } else {
                console.log("Error", result);
            }
        } catch(error) {
            console.log(error.message)
        }
    };

    const values = {
        register,
        login,
        followUser,
        unfollowUser,
        fetchFollowing,
        logout,
        profile,
        fetchUserProfile,
        isLoggedIn,
        setIsLoggedIn,
        loggedInUserId,
        setLoggedInUserId,
        followers,
        following,
        loginError,
        editProfile
    };

    return (
        <AuthContext.Provider value={values}>
            { children }
        </AuthContext.Provider>
    );
}
