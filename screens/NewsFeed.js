import { useContext, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { PostContext } from "../context/PostContext";
import Post from "../components/NewsPost";

const NewsFeed= () => {
    const {posts} = useContext(PostContext);

    return(
        <View style= {styles.container}>
            <FlatList
              data={posts}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({item})=> (
                 <Post
                  title={item.title}
                  content={item.content}
                  imageUrl={item.imageUrl}
                  url={item.url}
                />
              )}
           />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: '#f0f0f0',
    },
  });

  export default NewsFeed;