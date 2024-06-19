import { useContext, useState } from "react";
import { Button, Pressable, StyleSheet, TextInput, View, Image } from "react-native";
import { FeedContext } from "../context/FeedContext";
import { useNavigation } from "@react-navigation/native";

const Composer = ({ userId }) => {
    const [text, setText] = useState("");
    const {post} = useContext(FeedContext);
    const navigation = useNavigation();
    const handlePost = () => {
        post(text);
        setText('');
    }
    const goToProfile = () => {
        navigation.navigate("Profile", {userId});
    }
    return (
        <View style={styles.container}>
            <View style={styles.containerInner}>
                <Pressable
                    style={styles.profileImgLink}
                    onPress={goToProfile}
                >
                    <View style={styles.profileImgContainer}>
                        <Image 
                            // TODO: change this for current users profile picture
                            source={{
                                uri: "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg",
                            }}
                            style={styles.profileImg}
                        />
                    </View>
                </Pressable>
                <View style={styles.editor}>
                    <View style={styles.textArea}>
                        <TextInput 
                            style={styles.input}
                            placeholder="Say what you want"
                            value={text}
                            onChangeText={setText}
                        ></TextInput>
                    </View>
                    <View style={styles.toolbar}>
                        <Button title="Attach" style={styles.attachButton}></Button>
                        <Button
                            title="Post" style={styles.postButton}
                            onPress={handlePost}
                        ></Button>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        minWidth: 390,
        marginTop: 24,
        paddingVertical: 22
    },
    containerInner: {
        padding: 12,
        borderRadius: 16,
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'row',
        backgroundColor: '#FFFFFF'
    },
    profileImgLink: {
        marginRight: 12
    },
    profileImgContainer: {
        borderRadius: 25,
        height: 50,
        width: 50,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileImg: {
        borderRadius: '100%',
        objectFit: 'cover',
        height: '100%',
        width: '100%'
    },
    editor: {
        flexGrow: '1'
    },
    input: {
        width: '100%',
        padding: 12,
        maxHeight: 600,
        borderWidth: 1,
        borderColor: 'rgb(207, 217, 222)',
        borderRadius: 6,
        display: 'flex',
        flexDirection: 'row'
    },
    textArea: {
        width: '100%',
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-end',
        columnGap: '.5rem',
        marginTop: 12
    },
    attachButton: {},
    postButton: {
        borderRadius: 23 / 2,
        height: 23,
        width: 23,
        display: 'flex',
        justifyContent: 'center',
        borderColor: 'rgb(207, 217, 222)',
        borderStyle: 'solid',
        borderWidth: 1
    }
});

export default Composer;
