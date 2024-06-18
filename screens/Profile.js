import { View, StyleSheet } from "react-native";
import React, { useContext, useState } from "react";
import ProfileHeader from "../components/ProfileHeader";
import ProfileEdit from "../components/ProfileEdit";
import { FeedContext } from "../context/FeedContext";
import ProfilePost from "../components/ProfilePost";

const Profile = () => {
	const [user, setUser] = useState({});
	//const { fetchProfileFeed, posts } = useContext(FeedContext);
	const [editingProfile, setEditingProfile] = useState(false);
	const posts = [
		{
			image:
				"https://media.admagazine.com/photos/637d11a6e63c8afac40e7a01/1:1/w_2896,h_2896,c_limit/1442809583",
			text: "Hola soy nuevo en esta Red Social",
		},
		{
			image:
				"https://media.admagazine.com/photos/637d11a6e63c8afac40e7a01/1:1/w_2896,h_2896,c_limit/1442809583",
			text: "Hola soy nuevo en esta Red Social",
		},
		{
			image:
				"https://media.admagazine.com/photos/637d11a6e63c8afac40e7a01/1:1/w_2896,h_2896,c_limit/1442809583",
			text: "Hola soy nuevo en esta Red Social",
		},
	];

	const getUserLogged = () => {};

	//setUser({ name: "Pepe", lastName: "Coketch" });

	return editingProfile ? (
		<ProfileEdit setEditingProfile={setEditingProfile} />
	) : (
		<View>
			<ProfileHeader user={user} setEditingProfile={setEditingProfile} />
			{posts.map((p) => {
				return (
					<ProfilePost
						userAvatar={
							"https://cuv.upc.edu/ca/shared/imatges/fotos-professorat-i-professionals/anonimo.jpg"
						}
						textPost={p.text}
						imagePost={p.image}
					/>
				);
			})}
		</View>
	);
};

export default Profile;
