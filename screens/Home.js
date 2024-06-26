import { View, StyleSheet, Button } from "react-native";
import Composer from "../components/Composer";
import Feed from "../components/Feed";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
    const { loggedInUserId, logout } = useContext(AuthContext);
    return (
        <View style={styles.flex}>
            <Button
                title="Logout"
                onPress={logout}
            ></Button>
            <Composer userId={loggedInUserId}></Composer>
            <Feed id={loggedInUserId} isProfile={false} style={styles.feed} />
        </View>
    );
};

const styles = StyleSheet.create({
    flex: {
        flexDirection: 'column',
        flex: 1
    },
    feed: {
        marginTop: '2rem'
    }
});

export default Home;
