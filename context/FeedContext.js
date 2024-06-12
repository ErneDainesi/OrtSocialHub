import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";

export const FeedContext = createContext();

export const FeedProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);

    const fetchHomeFeed = async () => {
        try {
            const currentUserId = await AsyncStorage.getItem('currentUserId');
            const response = await fetch(process.env.DEV_URL + `/post/home/${currentUserId}`);
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('Error en el fetch de productos: ', error);
        }
    }

    const fetchProfileFeed = async (userId) => {
        try {
            const response = await fetch(process.env.DEV_URL + `/post/profile/${userId}`);
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('Error en el fetch de productos: ', error);
        }
    }

    const post = async (text) => {
        try {
            const currentUserId = await AsyncStorage.getItem('loggedInUserId');
            const token = await AsyncStorage.getItem('jwt');
            const response = await fetch(process.env.DEV_URL + '/posts', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({UserId: currentUserId, text, token})
            });
            const result = await response.json();
            if (result.success) {
                const {post, user} = result;
                setPosts(prevPosts => [...prevPosts, {post, user}]);
                alert("New post added");
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
