import { useContext, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { FeedContext } from "../context/FeedContext";
import Post from "./Post";

const Feed = (props) => {
    const { posts, fetchProfileFeed, fetchHomeFeed } = useContext(FeedContext);
    const { id, isProfile } = props;
    useEffect(() => {
        if (isProfile) {
            fetchProfileFeed(id);
        } else {
            fetchHomeFeed();
        }
    }, []);
    return (
        <View style={styles.feed}>
            <FlatList
                data={posts}
                renderItem={data => <Post post={data.item} />}
                keyExtractor={data => data.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
	feed: {
		marginTop: "2rem",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
	},
});

export default Feed;
