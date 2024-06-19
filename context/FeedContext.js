import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";

export const FeedContext = createContext();

export const FeedProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);

    const fetchHomeFeed = async () => {
        try {
            const currentUserId = await AsyncStorage.getItem('loggedInUserId');
            const response = await fetch(process.env.EXPO_PUBLIC_DEV_URL + `/posts/home/${currentUserId}`, {
                method: 'GET',
                credentials: 'include'
            });
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('Error en el fetch de productos: ', error);
        }
    }

    const fetchProfileFeed = async (userId) => {
        try {
            const response = await fetch(process.env.EXPO_PUBLIC_DEV_URL + `/posts/profile/${userId}`, {
                method: 'GET',
                credentials: 'include'
            });
            const data = await response.json();
            setPosts(data.posts);
        } catch (error) {
            console.error('Error en el fetch de productos: ', error);
        }
    }

    const post = async (text) => {
        try {
            const currentUserId = await AsyncStorage.getItem('loggedInUserId');
            const response = await fetch(process.env.EXPO_PUBLIC_DEV_URL + '/posts', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({UserId: currentUserId, text}),
                credentials: 'include'
            });
            const result = await response.json();
            if (result.success) {
                setPosts(prevPosts => {
                    return prevPosts.length ? [result.data, ...prevPosts] : [result.data]
                });
            } else {
                console.log("falle aqui", result);
                alert("Error posting");
            }
        } catch (error) {
            alert("Error posting");
            console.log(error);
        }
    }

    return (
        <FeedContext.Provider value={{posts, post, fetchHomeFeed, fetchProfileFeed}}>
            { children }
        </FeedContext.Provider>
    );
}
