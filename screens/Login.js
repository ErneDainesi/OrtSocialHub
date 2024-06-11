import { useContext, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Switch } from "react-native";
import { AuthContext } from "../context/AuthContext";

const Login = ({ navigation }) => {
    
    
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 

    const goToHome=()=>{
        navigation.navigate("Home"); 
    }

    const goToRegister=()=>{
        navigation.navigate("Register");
    }
    
    const handleSubmit= ()=>{ //cambiarlo cuando este el contexto terminado
        if(email === 'admin@admin.com' && password === 'admin'){
            alert('Login succes')
            goToHome(); 
        } else {
            alert('Error') 
        }
    }
    
    return (
        <View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Login</Text>
            <Text style={styles.title}>Don't have an account? Register here. <Text style={styles.link} onPress={goToRegister}>Register here</Text></Text>  
          </View>  
          <View style={styles.form}>
            <TextInput style={styles.input}
               placeholder="Email"
               value={email}
               onChangeText={setEmail}
            />
            <TextInput style={styles.input}
               secureTextEntry={secureText}
               placeholder="Password"
               value={password}
               onChangeText={setPassword}
            />
            <Button
               title="LogIn"
               onPress={handleSubmit} 
            ></Button>
          </View>
        </View>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '1rem',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center'
    },
    passError: {
        color: 'red'
    },
    form: {
        paddingHorizontal: '50rem',
        display: 'flex',
        flexDirection: 'column',
        rowGap: '1rem',
        alignContent: 'center'
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderColor: '#000000',
        borderWidth: '1px',
        borderRadius: '6px',
        padding: '.5rem'
    },
    link: {
        color: '#4ea6ed',
        cursor: 'pointer'
    }
});

export default Login;
