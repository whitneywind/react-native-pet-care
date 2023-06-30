import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import HomeScreen from "./screens/HomeScreen.js";
import LandingScreen from "./screens/LandingScreen.js";
import DetailsScreen from "./screens/DetailsScreen.js";
import GettingStartedScreen from "./screens/GettingStartedScreen.js";
import ActivityScreen from "./screens/ActivityScreen.js";
import { store } from "./store.ts";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <Stack.Navigator>
            <Stack.Screen
              name="LandingScreen"
              component={LandingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DetailsScreen"
              component={DetailsScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ActivityScreen"
              component={ActivityScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="GettingStartedScreen"
              component={GettingStartedScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}
