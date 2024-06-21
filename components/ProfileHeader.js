import { View, Text, Image, StyleSheet, Button } from "react-native";
import React from "react";

const ProfileHeader = ({ user, setEditingProfile }) => {
	return (
		<View style={styles.container}>
			{profile ? (
				<Image
					source={{ uri: profile.profilePicture }}
					style={styles.profileImg}
				/>
			) : (
				<Image
					source={{
						uri: "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg",
					}}
					style={styles.profileImg}
				/>
			)}
			<Text>
				`${user.name} ${user.lastName}`
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
