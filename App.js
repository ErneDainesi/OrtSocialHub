import { NavigationContainer } from '@react-navigation/native';
import { useContext } from 'react';
import { AuthContext, AuthProvider } from './context/AuthContext';
import { FeedProvider } from './context/FeedContext'
import { NotLoggedInBar, BottomNavBar } from './components/BottomNavBar';
import { NewsPostProvider } from './context/NewsPostContext';

const Root = () => {
    const { isLoggedIn, loggedInUserId } = useContext(AuthContext);
    return (
        <FeedProvider>
            <NewsPostProvider>
                {isLoggedIn ? <BottomNavBar loggedInUserId={loggedInUserId} /> : <NotLoggedInBar />}
            </NewsPostProvider>
        </FeedProvider>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <AuthProvider>
                <Root />
            </AuthProvider>
        </NavigationContainer>
    );
}
