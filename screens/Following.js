import React from 'react'
import { useContext, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { AuthContext } from "../context/AuthContext";

const Following = ({ route }) => {
    const {userId} = route.params;
    const {fetchFollowing, following} = useContext(AuthContext);

    useEffect(() =>{
        fetchFollowing(userId);
    }, [userId]);

    return (
        <View>
            <FlatList
              data={following}
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

export default Following;
