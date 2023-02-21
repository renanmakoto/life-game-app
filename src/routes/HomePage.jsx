import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import AppExplanation from "../pages/AppExplanation/AppExplanation"
import Home from "../pages/Home/Home"
import HabitPage from "../pages/HabitPage/HabitPage"

const Stack = createNativeStackNavigator()

export default function HomePage() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="HabitPage" component={HabitPage} />
                <Stack.Screen name="AppExplanation" component={AppExplanation} />
            </Stack.Navigator>
        </NavigationContainer>
    )
} 