import { useContext, useEffect } from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { FeedContext } from "../context/FeedContext";
import Post from "./Post";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Feed = () => {
    const { posts, fetchProfileFeed } = useContext(FeedContext);
    useEffect(() => {
        // TODO: check if we need to get profile or home posts
        AsyncStorage.getItem('loggedInUserId')
            .then(id => fetchProfileFeed(id))
            .catch();
    }, []);
    return (
        <View style={styles.feed}>
            <FlatList
                data={posts}
                renderItem={data => <Post data={data.item} />}
                keyExtractor={data => data.post.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    feed: {
        marginTop: '2rem'
    }
});

export default Feed;
