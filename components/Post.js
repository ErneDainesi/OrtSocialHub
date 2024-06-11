import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const Post = ({post, user, navigation}) => {
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const year = date.getUTCFullYear();
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }

    const goToProfile = () => {
        // TODO: change Home for users profile
        navigation.navigate("Home");
    }
    return (
        <View style={styles.post}>
            <View style={styles.postInner}>
                <Pressable
                    style={styles.profileImgLink}
                    onPress={goToProfile}
                >
                    <View style={styles.postCreatorContainer}>
                        <Image
                            // TODO: change this for post owner picture
                            source={{
                                uri: "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg",
                            }}
                            style={styles.postCreatorImg}
                        />
                    </View>
                </Pressable>
                <View style={styles.content}>
                    <View style={styles.contentHeader}>
                        <Text style={styles.creator}>{`${user.firstName} ${user.lastName}`}</Text>
                        <Text style={styles.timestamp}>{formatDate(post.createdAt)}</Text>
                    </View>
                    <Text style={styles.contentText}>{post.text}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    post: {
        minWidth: '390px',
        marginBottom: '.5rem'
    },
    postInner: {
        padding: '1rem',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        maxWidth: '580px'
    },
    profileImgLink: {
        marginRight: '1rem'
    },
    postCreatorContainer: {
        borderRadius: '100%',
        height: '50px',
        width: '50px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    postCreatorImg: {
        borderRadius: '100%',
        objectFit: 'cover',
        height: '100%',
        width: '100%'
    },
    content: {
        flexGrow: '1'
    },
    contentHeader: {
        marginBottom: '1rem'
    },
    contentText: {
        width: '100%',
        maxWidth: '470px'
    },
    creator: {
        fontSize: '18px',
        fontWeight: '800'
    },
    timestamp: {
        fontStyle: 'italic',
        color: '#b3b6ba'
    }
});

export default Post;
