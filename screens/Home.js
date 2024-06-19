import { View, StyleSheet } from "react-native";
import Composer from "../components/Composer";
import Feed from "../components/Feed";

const Home = ({ navigation }) => {
    return (
        <View style={styles.flex}>
            <Composer></Composer>
            <Feed style={styles.feed}></Feed>
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
