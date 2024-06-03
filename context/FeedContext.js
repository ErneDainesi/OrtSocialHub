import { useContext, useState } from "react";

export const FeedContext = useContext();

export const FeedProvider = ({ children }) => {
    const [posts, setsPosts] = useState([]);

    const post = async (text) => {
        try {
            const currentUserId = await AsyncStorage.getItem('currentUserId');
            const response = await fetch(process.env.DEV_URL + '/post', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({creator: currentUserId, text})
            });
            const result = await response.json();
            if (result.success) {
                setsPosts(prevPosts => [...prevPosts, result.newPost]);
                alert("New post added");
            } else {
                alert("Error posting");
            }
        } catch (error) {
            alert("Error posting");
            console.log(error);
        }
    }

    return (
        <FeedContext.Provider value={{posts, post}}>
            {{ children }}
        </FeedContext.Provider>
    );
}
