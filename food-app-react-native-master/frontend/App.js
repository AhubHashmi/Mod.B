import React from 'react';

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native'

import { Restaurant, OrderDelivery } from './screens'
import Tabs from './navigation/tabs'
import GeoLocation from './screens/LiveGeoLocation';
import Cart from './screens/Cart';
import Splash from './screens/splashscreen';
import Login from './auth/login';
import SignUp from './auth/signup';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
            // screenOptions={{
            //     headerShown: false
            // }}
            // initialRouteName={'Home'}             
            >
                <Stack.Screen
                    options={{
                        headerShown: false,
                    }}
                    name="Splash"
                    component={Splash}
                />
                <Stack.Screen name="Home" component={Tabs} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="signUp" component={SignUp} />
                <Stack.Screen name="Restaurant" component={Restaurant} />
                <Stack.Screen name="OrderDelivery" component={OrderDelivery} />
                <Stack.Screen name="LiveGeoLocation" component={GeoLocation} />
                <Stack.Screen name="Cart" component={Cart} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;