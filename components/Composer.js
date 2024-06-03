import { useContext, useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { FeedContext } from "../context/FeedContext";

const Composer = () => {
    const [text, setText] = useState("");
    const {post} = useContext(FeedContext);
    const handlePost = () => {
        post(text);
    }
    return (
        <View>
            <TextInput
                style={styles.textArea}
                placeholder="What do you want to say?"
                value={text}
                onChangeText={setText}
            ></TextInput>
            <Button
                title="Post"
                onPress={handlePost}
            ></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    textArea: {
        backgroundColor: '#FFFFFF',
        paddingVertical: '2rem',
        marginVertical: '2rem',
        borderWidth: '1px',
        borderColor: '#000000',
        borderRadius: '6px'
    }
});

export default Composer;
