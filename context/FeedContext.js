import { useContext, useState } from "react";

export const FeedContext = useContext();

export const FeedProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);

    const fetchHomeFeed = async () => {
        try {
            const currentUserId = await AsyncStorage.getItem('currentUserId');
            const respuesta = await fetch(process.env.DEV_URL + `/post/home/${currentUserId}`)
            const data = await respuesta.json();
            setProductos(data)
        } catch (error) {
            console.error('Error en el fetch de productos: ', error)
        }
    }

    const fetchProfileFeed = async (userId) => {
        try {
            const respuesta = await fetch(process.env.DEV_URL + `/post/profile/${userId}`)
            const data = await respuesta.json();
            setProductos(data)
        } catch (error) {
            console.error('Error en el fetch de productos: ', error)
        }
    }

    const post = async (text) => {
        try {
            const currentUserId = await AsyncStorage.getItem('currentUserId');
            const response = await fetch(process.env.DEV_URL + '/post', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({UserId: currentUserId, text})
            });
            const result = await response.json();
            if (result.success) {
                // setsPosts(prevPosts => [...prevPosts, result.newPost]);
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
