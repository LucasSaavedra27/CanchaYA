import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, useColorScheme, View } from 'react-native';

const TABS = [
  { key: 'daily', label: 'Diario' },
  { key: 'weekly', label: 'Semanal' },
];

const BOOKINGS = [
  { id: 1, field: 'Fútbol', hour: '10:00', icon: '⚽', cancha: 1},
  { id: 2, field: 'Fútbol', hour: '12:00', icon: '⚽', cancha: 3 },
  { id: 3, field: 'Fútbol', hour: '16:00', icon: '⚽', cancha: 2 },
  { id: 4, field: 'Beach Voley', hour: '18:00', icon: '🏐', cancha: 2 },
];


const customDate = new Date(2025, 5, 17); //arranca dia de turnos semanal
const getNextDays = (count = 7, startDate = new Date()) => {
  const days = [];
  for (let i = 0; i < count; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    days.push(new Date(d));
  }
  return days;
};
const nextWeekDates = getNextDays(7, customDate); // customDate es 20/06/2025

const getFieldImage = (fieldName: string) => {
  if (fieldName === 'Fútbol') {
    return require('@/assets/images/leones.jpg');
  } else if (fieldName === 'Beach Voley') {
    return require('@/assets/images/leones.jpg');
  }
  return null;
};

export default function BookingsScreen() {
  const [tab, setTab] = useState('daily');
  const theme = useColorScheme() ?? 'light';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>Turnos</ThemedText>
      </View>
      <View style={styles.tabsRow}>
        {TABS.map((t) => (
          <TouchableOpacity
            key={t.key}
            style={[
              styles.tab,
              tab === t.key && { backgroundColor: Colors[theme].tint }
            ]}
            onPress={() => setTab(t.key)}
          >
            <ThemedText style={[styles.tabLabel, tab === t.key && styles.tabLabelActive]}>
              {t.label}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </View>
      {tab === 'daily' && (
        <View style={styles.daySection}>
          <ThemedText style={[styles.dayTitle, { marginLeft: 16 }]}>
            {new Date().toLocaleDateString('es-AR', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' })}
          </ThemedText>
          <ScrollView contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
            {BOOKINGS.map((b) => (
              <View key={b.id} style={[styles.card, { backgroundColor: Colors[theme].card }]}>
                <View style={styles.cardContent}>
                  <View style={styles.cardInfo}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
                      <ThemedText style={{ fontSize: 18, marginRight: 6 }}>{b.icon}</ThemedText>
                      <ThemedText style={styles.sportText}>
                        {b.icon === '⚽' ? 'Fútbol' : b.icon === '🏐' ? 'Voley' : 'Pádel'}
                      </ThemedText>
                    </View>
                    <ThemedText style={styles.fieldName}>{b.field}</ThemedText>
                    <ThemedText style={styles.timeText}>{b.hour} hs</ThemedText>
                    <ThemedText style={styles.timeText}>Cancha: {b.cancha}</ThemedText>
                  </View>
                  {getFieldImage(b.field) ? (
                    <Image source={getFieldImage(b.field)!} style={styles.cardImage} />
                  ) : (
                    <View style={styles.imagePlaceholder} />
                  )}
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
      {tab === 'weekly' && (
        <ScrollView showsVerticalScrollIndicator={false}>
          {nextWeekDates.map((date) => (
            <View key={date.toISOString()} style={styles.listContent}>
              <ThemedText style={styles.dayTitle}>
                {date.toLocaleDateString('es-AR', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' })}
              </ThemedText>
              {BOOKINGS.map((b) => (
                <View key={b.id} style={[styles.card, { backgroundColor: Colors[theme].card }]}>
                  <View style={styles.cardContent}>
                    <View style={styles.cardInfo}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
                        <ThemedText style={{ fontSize: 18, marginRight: 6 }}>{b.icon}</ThemedText>
                        <ThemedText style={styles.sportText}>
                          {b.icon === '⚽' ? 'Fútbol' : b.icon === '🏐' ? 'Voley' : 'Pádel'}
                        </ThemedText>
                      </View>
                      <ThemedText style={styles.fieldName}>{b.field}</ThemedText>
                      <ThemedText style={styles.timeText}>{b.hour} hs</ThemedText>
                      <ThemedText style={styles.timeText}>Cancha: {b.cancha}</ThemedText>
                    </View>
                    {getFieldImage(b.field) ? (
                      <Image source={getFieldImage(b.field)!} style={styles.cardImage} />
                    ) : (
                      <View style={styles.imagePlaceholder} />
                    )}
                  </View>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
      )}
      <TouchableOpacity
        style={[
          styles.addButton,
          // Si quieres que el botón flotante tenga el color principal:
          { backgroundColor: Colors[theme].tint }
        ]}
        onPress={() => router.push('/booking-form')}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 56,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  backButton: {
    marginRight: 8,
    padding: 4,
    borderRadius: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    flex: 1,
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
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  card: {
    padding: 12,
    borderRadius: 16,
    marginBottom: 14,
    shadowColor: "#FAFAFA",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardInfo: {
    flex: 1,
    marginRight: 12,
  },
  sportText: {
    fontSize: 13,
    color: '#999999',
  },
  fieldName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  timeText: {
    fontSize: 15,
    marginBottom: 4,
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: '#E1E1E1',
    borderRadius: 12,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 16,
    marginLeft: 12,
    resizeMode: 'cover',
  },
  addButton: {
    position: 'absolute',
    right: 24,
    bottom: 32,
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
  daySection: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 12,
    gap: 12,
  },
  dayTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'capitalize',
  },
});