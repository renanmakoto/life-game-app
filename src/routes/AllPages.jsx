import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import Start from '../pages/Start/Start'
import AppExplanation from "../pages/AppExplanation/AppExplanation"
import Home from "../pages/Home/Home"
import HabitPage from "../pages/HabitPage/HabitPage"

const Stack = createNativeStackNavigator()

export default function AllPages() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="Start" component={Start} />
                <Stack.Screen name="AppExplanation" component={AppExplanation} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="HabitPage" component={HabitPage} />
            </Stack.Navigator>
        </NavigationContainer>
    )
} 