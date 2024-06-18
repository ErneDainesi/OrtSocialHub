import { View, Text, Button } from "react-native";
import React from "react";

const ProfileEdit = ({ setEditingProfile }) => {
	return (
		<View>
			<Text>ProfileEdit</Text>
			<Button
				title="Cancel"
				onPress={() => {
					setEditingProfile(false);
				}}
			/>
		</View>
	);
};

export default ProfileEdit;
