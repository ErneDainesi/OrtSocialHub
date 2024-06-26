import { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { AuthContext } from "../context/AuthContext";
import ProfileHeader from "../components/ProfileHeader";
import ProfileEdit from "../components/ProfileEdit";
import Feed from "../components/Feed";

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
		<View style={styles.flex}>
			<ProfileHeader profile={profile} setEditingProfile={setEditingProfile} />
			<Feed id={userId} isProfile={true} />
		</View>
	);
};

const styles = StyleSheet.create({
    flex: {
        flexDirection: 'column',
        flex: 1
    }
});

export default Profile;
