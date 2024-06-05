import { Text, View } from "react-native";

const Post = ({user, text}) => {
    return (
        <View>
            <Text>{`${user.firstName} ${user.lastName}`}</Text>
            <Text>{text}</Text>
        </View>
    );
}

export default Post;
