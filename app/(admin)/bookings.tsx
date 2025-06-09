import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

const TABS = [
  { key: 'daily', label: 'Diario' },
  { key: 'weekly', label: 'Semanal' },
];

const BOOKINGS = [
  { id: 1, field: 'Cancha 1', hour: '10:00', icon: 'football-outline' },
  { id: 2, field: 'Cancha 2', hour: '12:00', icon: 'basketball-outline' },
  { id: 3, field: 'Cancha 3', hour: '16:00', icon: 'tennisball-outline' },
  { id: 4, field: 'Cancha 4', hour: '18:00', icon: 'football-outline' },
];

export default function BookingsScreen() {
  const [tab, setTab] = useState('daily');

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#111" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Turnos</ThemedText>
      </View>
      <View style={styles.tabsRow}>
        {TABS.map((t) => (
          <TouchableOpacity
            key={t.key}
            style={[styles.tab, tab === t.key && styles.tabActive]}
            onPress={() => setTab(t.key)}
          >
            <ThemedText style={[styles.tabLabel, tab === t.key && styles.tabLabelActive]}>{t.label}</ThemedText>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView contentContainerStyle={styles.listContent}>
        {BOOKINGS.map((b) => (
          <View key={b.id} style={styles.bookingRow}>
            <View style={styles.iconBox}>
              <Ionicons name={b.icon as any} size={28} color="#111" />
            </View>
            <View style={styles.infoBox}>
              <ThemedText style={styles.fieldName}>{b.field}</ThemedText>
              <ThemedText style={styles.hour}>{b.hour}</ThemedText>
            </View>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 56,
    paddingBottom: 16,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    marginRight: 8,
    padding: 4,
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginRight: 32,
  },
  tabsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
    gap: 12,
  },
  tab: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#f2f2f2',
  },
  tabActive: {
    backgroundColor: '#111',
  },
  tabLabel: {
    fontSize: 16,
    color: '#888',
    fontWeight: '600',
  },
  tabLabelActive: {
    color: '#fff',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  bookingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 16,
    padding: 16,
    marginBottom: 18,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#eaeaea',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  infoBox: {
    flex: 1,
  },
  fieldName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#111',
  },
  hour: {
    fontSize: 15,
    color: '#888',
    marginTop: 2,
  },
  addButton: {
    position: 'absolute',
    right: 24,
    bottom: 32,
    backgroundColor: '#111',
    borderRadius: 32,
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
});
