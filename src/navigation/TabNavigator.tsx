import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeStack from './HomeStack';
import CartScreen from '../screens/CartScreen';
import { RootState } from '../redux/store';

export type RootTabParamList = {
  HomeTab: undefined;
  Cart: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function TabNavigator() {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={focused ? 'home' : 'home-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarLabel: 'Cart',
          tabBarBadge: cartItems.length > 0 ? cartItems.length : undefined,
          tabBarBadgeStyle: {
            backgroundColor: 'red',
            color: 'white',
            fontSize: 12,
          },

          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={focused ? 'cart' : 'cart-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
