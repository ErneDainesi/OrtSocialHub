import { View, Text, Button } from "react-native";

const Home = ({ navigation }) => {
    const goToRegister = () => {
        navigation.navigate("Register");
    }
    return (
        <View>
            <Text>Home</Text>
            <Button
                onPress={goToRegister}
                title="goToRegister"
            ></Button>
        </View>
    );
};

export default Home;
