import React from 'react'
import { useContext, useEffect, useState } from "react";
import { View, Image, Button, Text, FlatList } from "react-native";
import { AuthContext } from "../context/AuthContext";

export const Followers = ({ route }) => {
    const {userId} = route.params;
    const{ fetchFollowers, Followers}= useContext(AuthContext);
    const[ localFollowers, setLocalFollowers] = useState([]);

    useEffect(() =>{
        const loadFollowers = async () => {
            const result = await fetchFollowers(userId);
            setLocalFollowers(result.Followers);
        };
        loadFollowers();
    }, [userId]);

    return (
        <View>
            <FlatList
              data={localFollowers}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({item}) =>(
                <View>
                    <Text>{item.firstName} {item.lastName}</Text>
                </View>    
              )}
            />  
        </View>  
  );
};

export default Followers;