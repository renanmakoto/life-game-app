import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Start from '../screens/Start';
import AppExplanation from '../screens/AppExplanation';
import Home from '../screens/Home';
import HabitPage from '../screens/HabitPage';
import { ROUTES } from '../constants';

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
};

export default function AllPages() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name={ROUTES.START} component={Start} />
        <Stack.Screen name={ROUTES.APP_EXPLANATION} component={AppExplanation} />
        <Stack.Screen name={ROUTES.HOME} component={Home} />
        <Stack.Screen name={ROUTES.HABIT_PAGE} component={HabitPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
} 
