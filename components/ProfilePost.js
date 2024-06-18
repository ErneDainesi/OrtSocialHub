import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

const ProfilePost = ({ userAvatar, textPost, imagePost }) => {
	return (
		<View>
			<Image
				source={{
					uri: userAvatar,
				}}
				style={styles.profilePicture}
			/>
			<Text>{textPost}</Text>
			{imagePost ? (
				<Image source={{ uri: imagePost }} style={styles.postPicture} />
			) : null}
		</View>
	);
};

const styles = StyleSheet.create({
	postPicture: {
		width: 100,
		height: 100,
	},
	profilePicture: {
		width: 30,
		height: 30,
	},
});

export default ProfilePost;
