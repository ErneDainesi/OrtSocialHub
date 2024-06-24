import { View, StyleSheet } from "react-native";
import React, { useContext, useState } from "react";
import ProfileHeader from "../components/ProfileHeader";
import ProfileEdit from "../components/ProfileEdit";
import { FeedContext } from "../context/FeedContext";
import Post from "../components/Post";
import Feed from "../components/Feed";
import { AuthContext } from "../context/AuthContext";

const Profile = ({ route }) => {
	const [user, setUser] = useState({ name: "juan", lastname: "abutti" });
	const [editingProfile, setEditingProfile] = useState(false);

	return editingProfile ? (
		<ProfileEdit setEditingProfile={setEditingProfile} />
	) : (
		<View>
			<ProfileHeader user={user} setEditingProfile={setEditingProfile} />
			< Feed id={profile.id} isProfile={true} />
		</View>
	);
};

export default Profile;
