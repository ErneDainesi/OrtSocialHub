import { useContext, useState } from "react";
import { View } from "react-native";
import { FeedContext } from "../context/FeedContext";

const Feed = () => {
    const { posts } = useContext(FeedContext);
    return (
        <View>
        </View>
    );
}

export default Feed;
