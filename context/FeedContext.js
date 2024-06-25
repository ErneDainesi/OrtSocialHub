import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";
import { v4 } from "uuid";
import { storage } from "../utils/firebase";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { DEV_URL } from "../config";

export const FeedContext = createContext();

export const FeedProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);

    const fetchHomeFeed = async () => {
        try {
            const response = await fetch(DEV_URL + '/posts/home', {
                method: 'GET',
                credentials: 'include'
            });
            const data = await response.json();
            setPosts(data.posts);
        } catch (error) {
            console.error('Error while fetching home feed', error);
        }
    }

    const fetchProfileFeed = async (userId) => {
        try {
            const response = await fetch(DEV_URL + `/posts/profile/${userId}`, {
                method: 'GET',
                credentials: 'include'
            });
            const data = await response.json();
            setPosts(data.posts);
        } catch (error) {
            console.error('Error while fetching profile feed', error);
        }
    }

    const uploadFile = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        const filename = v4(); // generate a random name for the file to avoid repetition
        const reference = ref(storage, filename);
        await uploadBytes(reference, blob);
        const url = await getDownloadURL(reference);
        return url;
    }

    const post = async (text, attachmentUri) => {
        try {
            const currentUserId = await AsyncStorage.getItem('loggedInUserId');
            let attachmentUrl = '';
            if (attachmentUri) {
                attachmentUrl = await uploadFile(attachmentUri);
            }
            const response = await fetch(DEV_URL + '/posts', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({UserId: currentUserId, text, attachmentUrl}),
                credentials: 'include'
            });
            const result = await response.json();
            if (result.success) {
                setPosts(prevPosts => {
                    return prevPosts.length ? [result.post, ...prevPosts] : [result.post]
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
