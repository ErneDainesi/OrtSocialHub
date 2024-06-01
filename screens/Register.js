import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const Register = ({ navigation }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    const goToLogin = () => {
        navigation.navigate("Login");
    }

    const handleSubmit = async () => {
        try {
            if (password.length < 12) {
                setPasswordError(true);
                return;
            }
            const body = JSON.stringify({firstName, lastName, email, password});
            const response = await fetch(process.env.DEV_URL + '/register', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body
            });
            const result = await response.json();
            if (result.success) {
                console.log(result.user);
                navigation.navigate("Home");
            } else {
                console.log(result.error);
                navigation.navigate("Error");
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
                <Text style={styles.title}>Already registered? <Text style={styles.link} onPress={goToLogin}>Login here</Text></Text>
            </View>
            <View style={styles.form}>
                <TextInput style={styles.input}
                    placeholder="First Name"
                    value={firstName}
                    onChangeText={setFirstName}
                />
                <TextInput style={styles.input}
                    placeholder="Last Name"
                    value={lastName}
                    onChangeText={setLastName}
                />
                <TextInput style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                />
                {
                    passwordError && 
                        (<Text style={styles.passError}>Password must have at least 12 characters</Text>)
                }
                <TextInput style={styles.input}
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
    },
    passError: {
        color: 'red'
    },
    form: {
        paddingHorizontal: '50rem',
        display: 'flex',
        flexDirection: 'column',
        rowGap: '1rem',
        alignContent: 'center'
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderColor: '#000000',
        borderWidth: '1px',
        borderRadius: '6px',
        padding: '.5rem'
    },
    link: {
        color: '#4ea6ed',
        cursor: 'pointer'
    }
});

export default Register;
