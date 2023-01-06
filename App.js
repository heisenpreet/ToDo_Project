import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { store } from "./store";
import TodoList from "./screens/TodoList";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Addnew from "./screens/Addnew";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer initialRouteName={TodoList}>
        <Stack.Navigator>
          <Stack.Screen name="home" component={TodoList} options={{headerShown:false}}/>
          <Stack.Screen name="addnew" component={Addnew} options={({ route }) => ({ title: route.params.name })}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
