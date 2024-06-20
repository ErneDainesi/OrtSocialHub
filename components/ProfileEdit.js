import { View, Text, Button } from "react-native";
import React from "react";

const ProfileEdit = ({ setEditingProfile }) => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<View>
			<Text>ProfileEdit</Text>
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
			<Button
				title="Cancel"
				onPress={() => {
					setEditingProfile(false);
				}}
			/>
			<Button title="Confirm edit" onPress={() => {}} />
		</View>
	);
};

export default ProfileEdit;
