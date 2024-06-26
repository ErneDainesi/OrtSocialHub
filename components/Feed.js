import { useContext, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { FeedContext } from "../context/FeedContext";
import Post from "./Post";
import { useNavigation } from "@react-navigation/native";

const Feed = (props) => {
    const { posts, fetchProfileFeed, fetchHomeFeed } = useContext(FeedContext);
    const { id, isProfile } = props;
    const navigation = useNavigation();
    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            if (isProfile) {
                fetchProfileFeed(id);
            } else {
                fetchHomeFeed();
            }
        });
        return unsubscribe;
    }, [id, navigation]);
    const renderItem = ({item}) => <Post post={item} />;
    return (
        <View style={styles.feed}>
            <FlatList
                data={posts}
                renderItem={renderItem}
                keyExtractor={data => data.id}
                contentContainerStyle={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
	feed: {
		marginTop: "2rem",
        flex: 1
	},
    list: {
        paddingBottom: 20
    }
});

export default Feed;
