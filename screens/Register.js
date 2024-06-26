import { useContext, useState } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Switch,
    Linking
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import CheckBox from "react-native-check-box";
import { launchImageLibrary } from "react-native-image-picker";

const Register = ({ navigation }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [secureText, setSecureText] = useState(true);
    const [passwordError, setPasswordError] = useState(false);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const { register } = useContext(AuthContext);

    const selectProfilePicture = async () => {
        const result = await launchImageLibrary();
        if (!result.didCancel && result.assets && result.assets.length) {
            setProfilePicture(result.assets[0].uri)
        }
    }

    const goToLogin = () => {
        navigation.navigate("Login");
    }

    const handleSubmit = () => {
        if (!acceptedTerms) {
            alert(
                "You must accept the terms and conditions to register."
            );
            return;
        }
        register(
            {firstName, lastName, email, password, profilePicture},
            setPasswordError
        );
    }

    return (
        <View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Register</Text>
                <Text style={styles.title}>
                    Already registered?{" "}
                    <Text style={styles.link} onPress={goToLogin}>
                        Login here
                    </Text>
                </Text>
            </View>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    value={firstName}
                    onChangeText={setFirstName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    value={lastName}
                    onChangeText={setLastName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                />
                {
                    passwordError && 
                        <Text style={styles.passError}>
                            Password must have at least 12 characters, one uppercase letter and a simbol
                        </Text>
                }
                <TextInput
                    style={styles.input}
                    secureTextEntry={secureText}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                />
                <Button
                    title="Upload profile picture"
                    style={styles.attachButton}
                    onPress={selectProfilePicture}>
                </Button>
                <View>
                    <Text style={{paddingTop: 6}}>Hide password</Text>
                    <Switch value={secureText} onValueChange={setSecureText}></Switch>
                </View>
                <View style={styles.checkboxContainer}>
                    <CheckBox
                        isChecked={acceptedTerms}
                        onClick={() => setAcceptedTerms(!acceptedTerms)}
                    />
                    <Text style={styles.label}>
                        I accept the{" "}
                        <Text
                            style={styles.link}
                            onPress={() =>
                                Linking.openURL(
                                    "https://fakegodsbrand.com/pages/terminos-y-condiciones"
                                )
                            }
                        >terms and conditions
                        </Text>
                        .
                    </Text>
                </View>
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
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 12,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: "center",
    },
    passError: {
        color: "red",
    },
    form: {
        paddingHorizontal: 50,
        display: "flex",
        flexDirection: "column",
        rowGap: 12,
        alignContent: "center",
    },
    input: {
        backgroundColor: "#FFFFFF",
        borderColor: "#000000",
        borderWidth: 1,
        borderRadius: 6,
        padding: 6,
    },
    link: {
        color: "#4ea6ed"
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
});

export default Register;
