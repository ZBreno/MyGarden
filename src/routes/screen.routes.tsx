import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Home } from "../pages/Home";

const Stack = createNativeStackNavigator();

const ScreenRoutes: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator  screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="Home" component={Home}/>
       
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export { ScreenRoutes };
