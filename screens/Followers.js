import React from 'react'
import { useContext, useEffect, useState } from "react";
import { View, Image, Button, Text, FlatList } from "react-native";
import { AuthContext } from "../context/AuthContext";

const Followers = ({ route }) => {
    const {userId} = route.params;
    const {fetchFollowers, followers} = useContext(AuthContext);

    useEffect(() =>{
        fetchFollowers(userId);
    }, [userId]);

    return (
        <View>
            <FlatList
              data={followers}
              keyExtractor={(item) => item.followerId}
              renderItem={({item}) =>(
                <View>
                    <Text>{item.Followed.firstName} {item.Followed.lastName}</Text>
                </View>    
              )}
            />  
        </View>  
  );
};

export default Followers;
