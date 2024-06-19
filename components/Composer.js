import { useContext, useState } from "react";
import { Button, Pressable, StyleSheet, TextInput, View, Image } from "react-native";
import { FeedContext } from "../context/FeedContext";

const Composer = ({ navigation }) => {
    const [text, setText] = useState("");
    const {post} = useContext(FeedContext);
    const handlePost = () => {
        post(text);
        setText('');
    }
    const goToProfile = () => {
        // TODO: change Home for users profile
        navigation.navigate("Home");
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
        minWidth: '390px'
    },
    containerInner: {
        padding: '1rem',
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'row',
        backgroundColor: '#FFFFFF'
    },
    profileImgLink: {
        marginRight: '1rem'
    },
    profileImgContainer: {
        borderRadius: '100%',
        height: '50px',
        width: '50px',
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
        padding: '1rem',
        maxHeight: '600px',
        borderWidth: '1px',
        borderColor: 'rgb(207, 217, 222)',
        borderRadius: '6px',
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
        marginTop: '1rem'
    },
    attachButton: {},
    postButton: {
        borderRadius: '100%',
        height: '23px',
        width: '23px',
        display: 'flex',
        justifyContent: 'center',
        borderColor: 'rgb(207, 217, 222)',
        borderStyle: 'solid',
        borderWidth: '1px'
    }
});

export default Composer;
