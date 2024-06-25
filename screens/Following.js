import React from 'react'
import { useContext, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";
import UserListItem from '../components/UserListItem';

const Following = ({ route }) => {
    const { userId } = route.params;
    const {fetchFollowing, following} = useContext(AuthContext);

    useEffect(() => {
        fetchFollowing(userId);
    }, [userId]);

    return (
        <View style={styles.feed}>
            <FlatList
                data={following}
                keyExtractor={(item) => item.followerId}
                renderItem={({item}) => <UserListItem user={item.Followed} />}
            />  
        </View>  
    );
};

const styles = StyleSheet.create({
	feed: {
		marginTop: "2rem",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
	}
});

export default Following;
