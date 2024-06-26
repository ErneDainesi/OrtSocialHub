import { useContext, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Switch } from "react-native";
import { AuthContext } from "../context/AuthContext";

const Login = ({ navigation }) => {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [secureText, setSecureText] = useState(true);
    const { login, loginError } = useContext(AuthContext);

    const goToRegister = () => {
        navigation.navigate("Register");
    }

    const handleLogin = () => { 
        login({email, password})
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Login</Text>
                <Text style={styles.title}>Don't have an account? <Text style={styles.link} onPress={goToRegister}>Register here.</Text></Text>
            </View>
            {loginError && <Text style={styles.invalidCredentials}>Invalid credentials</Text>}
            <View style={styles.form}>
                <TextInput style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput style={styles.input}
                    secureTextEntry={secureText}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                />
                <View>
                    <Text style={styles.passPrompt}>Hide password</Text>
                    <Switch value={secureText} onValueChange={setSecureText}></Switch>
                </View>
                <Button
                    title="Sign in"
                    onPress={handleLogin} 
                ></Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        padding: 50
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 12,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center'
    },
    subtitle: {
        display: 'flex',
        flexDirection: 'row',
    },
    invalidCredentials: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 12
    },
    form: {
        paddingHorizontal: 50,
        display: 'flex',
        flexDirection: 'column',
        rowGap: 10,
        alignContent: 'center'
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 6,
        padding: 5
    },
    link: {
        color: '#4ea6ed',
    },
    passPrompt: {
        paddingTop: 5
    }
});

export default Login;
