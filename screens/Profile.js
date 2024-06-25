import { View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ProfileHeader from "../components/ProfileHeader";
import ProfileEdit from "../components/ProfileEdit";
import Feed from "../components/Feed";
import { AuthContext } from "../context/AuthContext";

const Profile = ({ route }) => {
	const [editingProfile, setEditingProfile] = useState(false);
    const {userId} = route.params;
    const {profile, fetchUserProfile} = useContext(AuthContext)
    useEffect(() => {
        fetchUserProfile(userId);
    }, [userId]);
	return editingProfile ? (
		<ProfileEdit setEditingProfile={setEditingProfile} profile={profile} />
	) : (
		<View>
			<ProfileHeader profile={profile} setEditingProfile={setEditingProfile} />
			<Feed id={profile.id} isProfile={true} />
		</View>
	);
};

export default Profile;
