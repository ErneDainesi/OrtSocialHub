import { Image, TouchableOpacity, Linking , StyleSheet, Text, View } from "react-native";


const Post = ({ title, content, imageUrl, url}) => {
    return(
        <View Style={styles.postContainer}>
            {imageUrl && <Image source={{uri: imageUrl}} style={styles.postImage}/>}  {/* Verificar*/}
            <Text style={styles.postTitle}>{title}</Text>
            <Text style={styles.postContent}>{content}</Text>
            <TouchableOpacity onPress={()=> Linking.openURL(url)}>
              <Text style={styles.postLink}>Seguir leyendo</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    postContainer: {
      padding: 10,
      marginVertical: 5,
      backgroundColor: '#fff',
      borderRadius: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      elevation: 3,
    },
    postImage: {
      width: '100%',
      height: 200,
      borderRadius: 5,
    },
    postTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginVertical: 5,
    },
    postContent: {
      fontSize: 14,
      marginVertical: 5,
    },
    postLink: {
      fontSize: 14,
      color: 'blue',
      marginTop: 5,
    },
  });

  export default Post;
  