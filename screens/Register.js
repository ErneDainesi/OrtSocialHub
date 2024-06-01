import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const Register = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        try {
            const body = JSON.stringify({name, email, password});
            const response = await fetch('/register', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body
            });
            const result = await response.json();
            if (result.status === 200) {
                navigation.navigate("Home");
            }
        } catch (error) {
            console.log(error) // TODO: delete this, we shouldn't log errors on client
            navigation.navigate("Error");
        }
    }
    return (
        <View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Register</Text>
                <Text style={styles.title}>Already registered? Login here</Text>
            </View>
            <TextInput 
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput 
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                secureTextEntry={true}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
            />
            <Button
                title="Submit"
                onPress={handleSubmit}
            ></Button>
        </View>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '1rem',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center'
    }
});

export default Register;
