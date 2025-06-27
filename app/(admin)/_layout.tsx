import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { View, useColorScheme } from 'react-native';

const TabBarIcon = ({ name, color, size = 24 }: { name: React.ComponentProps<typeof Ionicons>['name']; color: string; size?: number; }) => {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Ionicons name={name} size={size} color={color} />
    </View>
  );
};

export default function AdminTabLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[theme].tint,
        tabBarInactiveTintColor: Colors[theme].subtitle,
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
          height: 60,
          paddingBottom: 10,
          paddingTop: 2,
          backgroundColor: Colors[theme].background,
        },
      }}>
        <Tabs.Screen
        name="bookings"
        options={{
          title: 'Turnos',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="calendar-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="fields"
        options={{
          title: 'Canchas',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="football-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Estadísticas',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="grid-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="payments-history"
        options={{
          title: 'Pagos',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="card-outline" color={color} />
          ),
        }}
      />      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="person-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Complejo',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="business-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="edit-field"
        options={{
          href: null // Oculta edit-field del tab bar
        }}
      />
      <Tabs.Screen
        name="new-field"
        options={{
          href: null // Oculta new-field del tab bar
        }}
      />
      
    </Tabs>
  );
}
