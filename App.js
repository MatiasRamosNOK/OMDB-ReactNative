import "react-native-gesture-handler";
import React from "react";
import { Provider } from "react-redux";
import storeConfiguration from "./redux/store";
import Main from "./components/Main";
import Single from "./components/Single";
import Login from "./components/Login";
import Register from "./components/Register";
import User from "./components/User";
import Movies from "./components/Movies";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { enableScreens } from "react-native-screens";
import Logout from "./components/Logout";
import WhereTo from "./components/WhereTo";
enableScreens();
let store = storeConfiguration();
const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Main}
            options={() => ({
              headerRight: () => {
                return <WhereTo />;
              },
            })}
          />
          <Stack.Screen
            name="Single"
            component={Single}
            options={({ route }) => ({ title: route.params.title })}
          />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen
            name="User"
            component={User}
            options={() => ({
              headerRight: () => {
                return <Logout />;
              },
            })}
          />
          <Stack.Screen name="Movies" component={Movies} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
