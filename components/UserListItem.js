import { useNavigation } from "@react-navigation/native";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const UserListItem = ({user}) => {
    const navigation = useNavigation();
    const goToProfile = () => {
        navigation.navigate("Profile", {userId: user.id});
    }
    return (
        <View style={styles.userItem}>
            <Pressable
                style={styles.profileImgLink}
                onPress={goToProfile}
            >
                <View style={styles.userContainer}>
                    <Image
                        source={{uri: user.profilePicture}}
                        style={styles.userImg}
                    />
                </View>
            </Pressable>
            <View>
                <Text style={styles.name}>{`${user.firstName} ${user.lastName}`}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    userItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 12,
        borderRadius: 12
    },
    profileImgLink: {
        marginRight: 12
    },
    userContainer: {
        borderRadius: '100%',
        height: 70,
        width: 70,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    userImg: {
        borderRadius: '100%',
        objectFit: 'cover',
        height: '100%',
        width: '100%'
    },
    name: {
        fontSize: 20
    }
});

export default UserListItem;
