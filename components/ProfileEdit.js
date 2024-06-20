import { View, Text, TextInput, Button, Switch, StyleSheet, ScrollView, Alert } from "react-native";
import React from "react";

const ProfileEdit = ({ setEditingProfile }) => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const profileSave = () => {
		// agregar code para guardar los datos
		Alert.alert('Updated profile', 'Your data has been saved.');
	};

	return (
		<View style={styles.form}>
			<Text style={styles.title}>Profile Edit</Text>
			<TextInput
				style={styles.input}
				placeholder={firstName}
				value={firstName}
				onChangeText={setFirstName}
			/>
			<TextInput
				style={styles.input}
				placeholder={lastName}
				value={lastName}
				onChangeText={setLastName}
			/>
			<TextInput
				style={styles.input}
				placeholder={email}
				value={email}
				onChangeText={setEmail}
			/>
			<TextInput
				style={styles.input}
				placeholder={password}
				value={password}
				onChangeText={setPassword}
			/>
			<Button
				title="Cancel"
				onPress={() => {
					setEditingProfile(false);
				}}
			/>
			<Button title="Confirm edit" onPress={profileSave} />
		</View>
	);
};


const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center'
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
});

export default ProfileEdit;
