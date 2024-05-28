import { useState } from "react";
import { Button, Text, View } from "react-native";

export const MyButton = () => {
    const helloWorld = async () => {
        try {
            const dir = process.env.ADDRESS + process.env.PORT;
            const res = await fetch(dir, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await res.json();
            setText(data.msg);
        } catch (e) {
            setText("An error occured")
            console.log(e)
        }
    }

    const [text, setText] = useState("Default Text");
    return (
        <View>
            <Text>{text}</Text>
            <Button
                onPress={helloWorld}
                title="GET"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
        </View>
    );
};
