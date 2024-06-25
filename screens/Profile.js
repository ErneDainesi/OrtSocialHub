import { useContext, useEffect, useState } from "react";
import { View, Button, Text } from "react-native";
import { AuthContext } from "../context/AuthContext";
import ProfileHeader from "../components/ProfileHeader";
import ProfileEdit from "../components/ProfileEdit";
import Feed from "../components/Feed";

// const Profile = ({ route, navigation }) => {
//     const [ownProfile, setOwnProfile] = useState(false);
//     const {profile, fetchUserProfile, followUser, unfollowUser, following} = useContext(AuthContext)
//     const { userId } = route.params;
//     
//     const isOwnProfile = async () => {
//         const loggedInUserId = await AsyncStorage.getItem('loggedInUserId');
//         setOwnProfile(loggedInUserId == userId);
//     };
//     
//     isOwnProfile();
//     useEffect(() => {
//         fetchUserProfile(userId);
//     }, [userId]);
// 
//     const handleFollow = () => {
//         followUser(userId);
//     };
// 
//     const handleUnfollow = () => {
//         unfollowUser(userId);
//     };
// 
//     const handleViewFollowers= () =>{
//         navigation.navigate("Followers", {userId}); 
//     };
// 
//     const isFollowing = following.includes(userId);
// 
//     return(
//         <View>
//             {profile && (<>
//               <View>
//                  <Text>{`${profile.firstName} ${profile.lastName}`}</Text>
//                  {ownProfile ? (
//                         <>
//                             <Button title="Edit"/>
//                             <Button title="View Followers" onPress={handleViewFollowers} />
//                         </>
//                  ) :(
//                     <>
//                      {isFollowing ? (
//                         <Button title="Unfollow" onPress={handleUnfollow}/>
//                      ):(
//                         <Button title="Follow" onPress={handleFollow}/>
//                      )}
//                     </>
//                  )}
//               </View>
//               <Feed id={userId} isProfile={true} />
//             
//             </>)}
//         </View>
//     );
//     
// }

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
