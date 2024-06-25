import { useContext, useEffect, useState } from "react";
import { View, Image, Button, Text } from "react-native";
import { AuthContext } from "../context/AuthContext";
import Feed from "../components/Feed";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = ({ route, navigation }) => {
    const [ownProfile, setOwnProfile] = useState(false);
    const {profile, fetchUserProfile, followUser, unfollowUser, following} = useContext(AuthContext)
    const { userId } = route.params;
    
    const isOwnProfile = async () => {
        const loggedInUserId = await AsyncStorage.getItem('loggedInUserId');
        setOwnProfile(loggedInUserId === userId);
    };
    
    isOwnProfile();
    useEffect(() => {
        fetchUserProfile(userId);
    }, [userId]);

    const handleFollow = () => {
        followUser(userId);
    };

    const handleUnfollow = () => {
        unfollowUser(userId);
    };

    const handleViewFollowers= () =>{
        navigation.navigate("Followers", {userId}); 
    };

    const isFollowing = following.includes(userId);

    return(
        <View>
            {profile && (<>
              <View>
                 <Text>{`${profile.firstName} ${profile.lastName}`}</Text>
                 {ownProfile ? (
                    <Button title="Edit"/>
                 ) :(
                    <>
                     {isFollowing ? (
                        <Button title="Unfollow" onPress={handleUnfollow}/>
                     ):(
                        <Button title="Follow" onPress={handleFollow}/>
                     )}
                     <Button title="View Followers" onPress={handleViewFollowers} />
                    </>
                 )}
              </View>
              <Feed id={profile.id} isProfile={true} />
            
            </>)}
        </View>
    );
    
}

export default Profile;
