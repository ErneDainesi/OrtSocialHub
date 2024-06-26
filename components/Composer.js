import { useContext, useEffect, useState } from "react";
import { Button, Pressable, StyleSheet, TextInput, View, Image } from "react-native";
import { FeedContext } from "../context/FeedContext";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from "../context/AuthContext";

const Composer = ({ userId }) => {
    const [text, setText] = useState("");
    const [attachment, setAttachment] = useState("");
    const { post } = useContext(FeedContext);
    const { profile, fetchUserProfile } = useContext(AuthContext);
    const navigation = useNavigation();
    const handlePost = () => {
        post(text, attachment);
        setText('');
        setAttachment('');
    }
    const goToProfile = () => {
        navigation.navigate("Profile", {userId});
    }
    const selectImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled && result.assets && result.assets.length) {
            setAttachment(result.assets[0].uri);
        }
    }
    useEffect(() => {
        if (userId) {
            fetchUserProfile(userId);
        }
    }, [userId]);
    return (
        <View style={styles.container}>
            <View style={styles.containerInner}>
                <Pressable
                    style={styles.profileImgLink}
                    onPress={goToProfile}
                >
                    <View style={styles.profileImgContainer}>
                        {
                            profile ?
                                <Image
                                    source={{ uri: profile.profilePicture }}
                                    style={styles.profileImg}
                                /> :
                                <Image
                                    source={{
                                        uri: "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg",
                                    }}
                                    style={styles.profileImg}
                                />
                        }
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
                        <Button title="Attach" style={styles.attachButton} onPress={selectImage}></Button>
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
        marginTop: 24,
        paddingVertical: 22,
        display: 'flex',
        alignSelf: 'flex-start',
        maxWidth: 250,
        marginHorizontal: 'auto'
    },
    containerInner: {
        padding: 12,
        borderRadius: 16,
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        width: '100%'
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
        borderRadius: 12,
        objectFit: 'cover',
        height: '100%',
        width: '100%'
    },
    editor: {
        width: '100%'
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
        columnGap: 6,
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
