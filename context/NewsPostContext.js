import { createContext, useState, useEffect } from "react";

export const NewsPostContext = createContext();

export const NewsPostProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);

    useEffect(()=>{
        const fetchPost= async () => {
            try{
                const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=fb016025e89b4c93bbdccd3345bd5508');
                const data = await response.json();
                const formattedData = data.articles.map((article, index)=>({
                    id: index,
                    title: article.title,
                    content: article.description || article.content,
                    imageUrl: article.urlToImage,
                    url: article.url,
                    publishedAt: article.publishedAt
                }));
                setPosts(formattedData)
            } catch(error){
                console.error('Error fetching posts:', error);
            }
        };

        fetchPost();
    }, []);


    return(
        <NewsPostContext.Provider value={{ posts}} >
            {children}
        </NewsPostContext.Provider>
    );
};
