import {
	View,
	Text,
	TextInput,
	Button,
	StyleSheet,
	TouchableOpacity,
    Image
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const ProfileEdit = ({ setEditingProfile, profile }) => {
    const {editProfile} = useContext(AuthContext);
	const [firstName, setFirstName] = useState(profile.firstName);
	const [lastName, setLastName] = useState(profile.lastName);
	const [email, setEmail] = useState(profile.email);
	const [profileImage, setProfileImage] = useState(profile.profilePicture);

	const profileSave = () => {
        editProfile(
            {id: profile.id, firstName, lastName, email, profilePicture: profileImage},
            setEditingProfile
        );
	};

	const selectImage = () => {
		launchImageLibrary({ mediaType: "photo" }, (response) => {
            if (response.errorCode) {
				console.log("ImagePicker Error: ", response.errorMessage);
			} else if (response.assets && response.assets.length > 0) {
				setProfileImage(response.assets[0].uri);
			}
		});
	};

	return (
		<View style={styles.form}>
			<Text style={styles.title}>Profile Edit</Text>
			<TouchableOpacity onPress={selectImage}>
				{profileImage ? (
					<Image source={{ uri: profileImage }} style={styles.profileImage} />
				) : (
					<View style={styles.placeholderImage}>
						<Text style={styles.placeholderText}>Seleccionar Imagen</Text>
					</View>
				)}
			</TouchableOpacity>
			<TextInput
				style={styles.input}
				placeholder={`${firstName}`}
				value={firstName}
				onChangeText={setFirstName}
			/>
			<TextInput
				style={styles.input}
				placeholder={`${lastName}`}
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
			<Button title="Confirm edit" onPress={profileSave} />
		</View>
	);
};

const styles = StyleSheet.create({
	title: {
		fontSize: 24,
        marginVertical: 12,
		textAlign: "center",
	},
	form: {
		paddingHorizontal: "50rem",
		display: "flex",
		flexDirection: "column",
		rowGap: "1rem",
		alignContent: "center",
	},
	input: {
		backgroundColor: "#FFFFFF",
		borderColor: "#000000",
		borderWidth: "1px",
		borderRadius: "6px",
		padding: ".5rem",
	},
	profileImage: {
		width: 100,
		height: 100,
		borderRadius: 50,
		alignSelf: "center",
		marginBottom: 16,
	},
	placeholderImage: {
		width: 100,
		height: 100,
		borderRadius: 50,
		backgroundColor: "#ccc",
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "center",
		marginBottom: 16,
	},
	placeholderText: {
		color: "#fff",
	},
});

export default ProfileEdit;
