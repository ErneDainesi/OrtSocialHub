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
	//const [ownProfile, setOwnProfile] = useState(false);
	// const { profile, fetchUserProfile } = useContext(AuthContext);
	// const { userId } = route.params;
	// const isOwnProfile = async () => {
	// 	const loggedInUserId = await AsyncStorage.getItem("loggedInUserId");
	// 	setOwnProfile(loggedInUserId === userId);
	// };
	// isOwnProfile();
	// useEffect(() => {
	// 	fetchUserProfile(userId);
	// }, [userId]);

	//if (!profile) return;

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
