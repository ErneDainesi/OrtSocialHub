import { View, Text } from "react-native";
import Composer from "../components/Composer";
import Feed from "../components/Feed";

const Home = ({ navigation }) => {
    return (
        <View>
            <Text>Home</Text>
            <Composer></Composer>
        </View>
    );
};

export default Home;
