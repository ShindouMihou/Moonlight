import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import 'expo-dev-client';
import Header from "./src/components/core/Header";
import HomeHeader from "./src/components/headers/HomeHeader";
import useCachedResources from "./src/hooks/useCachedResources";
import UpsertBook from "./src/screens/books/UpsertBook";
import BookView from "./src/screens/books/BookView";
import Editor from "./src/screens/chapter/Editor";

const Stack = createNativeStackNavigator()

export default function App() {
    const isLoadingComplete = useCachedResources()
    if (!isLoadingComplete) {
        return null;
    }
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                header: () => <Header></Header>,
                contentStyle: { backgroundColor: '#000' },
                animation: 'fade_from_bottom'
            }}>
                <Stack.Group>
                    <Stack.Screen
                        name={"Home"}
                        component={HomeScreen}
                        options={{ header: () => <HomeHeader></HomeHeader>}}
                    />
                </Stack.Group>
                <Stack.Group screenOptions={{ headerShown: false }}>
                    <Stack.Screen name={"Upsert.Book"} component={UpsertBook}/>
                    <Stack.Screen name={"View.Book"} component={BookView}/>
                </Stack.Group>
                <Stack.Group screenOptions={{ headerShown: false }}>
                    <Stack.Screen name={"Editor"} component={Editor}/>
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    );
}