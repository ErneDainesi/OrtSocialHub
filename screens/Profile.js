import { useContext, useEffect, useState } from "react";
import { View, Image, Button, Text } from "react-native";
import { AuthContext } from "../context/AuthContext";
import Feed from "../components/Feed";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = ({ route }) => {
    const [ownProfile, setOwnProfile] = useState(false);
    const {profile, fetchUserProfile} = useContext(AuthContext)
    const {userId} = route.params;
    const isOwnProfile = async () => {
        const loggedInUserId = await AsyncStorage.getItem('loggedInUserId');
        setOwnProfile(loggedInUserId === userId);
    };
    isOwnProfile();
    useEffect(() => {
        fetchUserProfile(userId);
    }, [userId]);
    return (
        <View>
            <Image />
            {profile && (<>
                <View>
                    <Text>{`${profile.firstName} ${profile.lastName}`}</Text>
                    <Button
                        title={ownProfile ? "Edit" : "Follow/Unfollow"}
                    ></Button>
                </View>
                <Feed id={profile.id} isProfile={true} />
            </>)}
        </View>
    );
}

export default Profile;
