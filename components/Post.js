import { StyleSheet, Text, View } from "react-native";

const Post = ({post, user}) => {
    return (
        <View style={styles.post}>
            <Text style={styles.creator}>{`${user.firstName} ${user.lastName}`}</Text>
            <Text style={styles.timestamp}>{post.createdAt}</Text>
            <Text>{post.text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    post: {
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '6px',
        backgroundColor: '#FFFFFF',
        color: '#000000',
        padding: '1rem',
        rowGap: '.5rem'
    },
    creator: {
        fontWeight: 'bold',
        fontSize: '1.5rem'
    },
    timestamp: {
        color: 'gray',
        fontStyle: 'italic'
    }
});

export default Post;
