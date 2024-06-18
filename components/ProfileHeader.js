import { View, Text, Image, StyleSheet, Button } from "react-native";
import React from "react";

const ProfileHeader = ({ user, setEditingProfile }) => {
	return (
		<View style={styles.container}>
			<Image
				source={{
					uri: "https://cuv.upc.edu/ca/shared/imatges/fotos-professorat-i-professionals/anonimo.jpg",
				}}
				style={styles.profilePicture}
			/>

			<Text>
				`${user.name} ${user.lastNamer}`
			</Text>

			<Button
				title="Edit Profile"
				onPress={() => {
					setEditingProfile(true);
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		padding: "1rem",
		width: "100%",
	},
	title: {
		fontSize: 24,
		marginBottom: 20,
		textAlign: "center",
	},
	profilePicture: {
		width: 100,
		height: 100,
	},
});

export default ProfileHeader;
