import { useContext } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { FeedContext } from "../context/FeedContext";
import Post from "./Post";

const Feed = () => {
    const { posts } = useContext(FeedContext);
    return (
        <View style={styles.feed}>
            <FlatList
                data={posts}
                renderItem={data => <Post data={data.item} />}
                keyExtractor={data => {console.log("ESTO ES DATA", data); return data.post.id;}}
            >
            </FlatList>
        </View>
    );
}

const styles = StyleSheet.create({
    feed: {
        marginTop: '2rem'
    }
});

export default Feed;
