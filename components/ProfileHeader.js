import { View, Text, Image, StyleSheet, Button } from "react-native";
import { useEffect, useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

const ProfileHeader = ({ profile, setEditingProfile }) => {
    const [ownProfile, setOwnProfile] = useState(false);
    const {followUser, unfollowUser, following, fetchFollowing, loggedInUserId} = useContext(AuthContext)
    const [isFollowing, setIsFollowing] = useState(following.find(({followedId}) => followedId === profile.id));
    const navigation = useNavigation();
    const isOwnProfile = async () => {
        const loggedInUserId = await AsyncStorage.getItem('loggedInUserId');
        setOwnProfile(loggedInUserId == profile.id);
    };
    const handleProfilePress = () => {
        if (ownProfile) {
            setEditingProfile(true);
        } else if (isFollowing) {
            unfollowUser(profile.id);
        } else {
            followUser(profile.id);
        }
    };

    const handleViewFollowing= () =>{
        navigation.navigate("Following", {userId: profile.id});
    };

    const getButtonTitle = () => {
        if (ownProfile) {
            return "Edit Profile";
        }
        return isFollowing ? "Unfollow" : "Follow";
    };

    useEffect(() => {
        if (profile) {
            isOwnProfile();
        }
        fetchFollowing(loggedInUserId);
        setIsFollowing(following.find(({followedId}) => followedId === profile.id));
    }, [profile]);
	return (
		<View style={styles.container}>
            <View style={styles.profileImgContainer}>
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
            </View>
			<Text style={styles.title}>
				{`${profile.firstName} ${profile.lastName}`}
			</Text>
            <Button title="Following" onPress={handleViewFollowing} />
			<Button
				title={getButtonTitle()}
				onPress={handleProfilePress}
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
        marginVertical: 12,
		textAlign: "center",
	},
    profileImgContainer: {
        borderRadius: '100%',
        height: 175,
        width: 175,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
	profileImg: {
        borderRadius: '100%',
        objectFit: 'cover',
        height: '100%',
        width: '100%'
	},
});

export default ProfileHeader;
