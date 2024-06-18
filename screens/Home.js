import { View, StyleSheet } from "react-native";
import Composer from "../components/Composer";
import Feed from "../components/Feed";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from "react";

const Home = ({ navigation }) => {
    const [activeSession, setActiveSession] = useState(false);
    const [loggedInUserId, setLoggedInUserId] = useState(-1);
    const isSessionActive = async () => {
        const loggedInUserId = await AsyncStorage.getItem('loggedInUserId');
        if (!loggedInUserId) {
            navigation.navigate("Login");
        }
        setActiveSession(!!loggedInUserId);
        setLoggedInUserId(loggedInUserId);
    };
    isSessionActive();
    return (
        <View style={styles.flex}>
            {activeSession && (<>
                <Composer userId={loggedInUserId}></Composer>
                <Feed id={loggedInUserId} isProfile={false} style={styles.feed} />
            </>)}
        </View>
    );
};

const styles = StyleSheet.create({
    flex: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    feed: {
        marginTop: '2rem'
    }
});

export default Home;
