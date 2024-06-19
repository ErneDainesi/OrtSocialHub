import { useNavigation } from "@react-navigation/native";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const Post = ({data}) => {
    const navigation = useNavigation();
    const {post, user} = data;
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
        // navigation.navigate("Profile", {userId: user.id});
        navigation.navigate("Home")
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
                    {post.attachmentUrl && <Image source={{uri: post.attachmentUrl}} style={styles.attachment}/>}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    post: {
        minWidth: 390,
        marginBottom: 6
    },
    postInner: {
        padding: 12,
        borderRadius: 16,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        maxWidth: 580
    },
    profileImgLink: {
        marginRight: 12
    },
    postCreatorContainer: {
        borderRadius: '100%',
        height: 50,
        width: 50,
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
        marginBottom: 12
    },
    contentText: {
        width: '100%',
        maxWidth: 470,
        marginBottom: 12
    },
    creator: {
        fontSize: 18,
        fontWeight: '800'
    },
    timestamp: {
        fontStyle: 'italic',
        color: '#b3b6ba'
    },
    attachment: {
        width: '100%',
        height: 300
    }
});

export default Post;
