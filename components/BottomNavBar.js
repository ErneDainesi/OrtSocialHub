import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '../screens/Home';

// Importa tus componentes de pantalla

//import SettingsScreen from './screens/SettingsScreen';
//import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const homeName = 'Home';
//const settingsName = 'Settings';
//const profileName = 'Profile';

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';
            } 

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 70 },
        }}
      >
        <Tab.Screen name={homeName} component={Home} />
        {/* //<Tab.Screen name={settingsName} component={SettingsScreen} />
        //<Tab.Screen name={profileName} component={ProfileScreen} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
