import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View, useColorScheme } from 'react-native';

const getFieldImage = (imagen: string) => {
  switch (imagen) {
    case '/assets/images/cancha1.png':
      return require('../../assets/images/cancha1.png');
    case '/assets/images/cancha2.png':
      return require('../../assets/images/cancha2.png');
    case '/assets/images/cancha3.png':
      return require('../../assets/images/cancha3.png');
    case '/assets/images/VOLEY.png':
      return require('../../assets/images/VOLEY.png');
    default:
      return null;
  }
};

export const FIELDS = [
  { id: 1, name: 'Cancha 1', sport: 'Fútbol', icon: '⚽', imagen: '/assets/images/cancha1.png', precio: '12000', horarios: '8:00 - 22:00' },
  { id: 2, name: 'Cancha 2', sport: 'Fútbol', icon: '⚽', imagen: '/assets/images/cancha2.png', precio: '11000', horarios: '10:00 - 21:00'},
  { id: 3, name: 'Cancha 3', sport: 'Fútbol', icon: '⚽', imagen: '/assets/images/cancha3.png',
    precio: '15000', horarios: '9:00 - 23:00'
  },
  { id: 4, name: 'Cancha 1', sport: 'Voley', icon: '🏐', imagen: '/assets/images/VOLEY.png',
    precio: '18000', horarios: '8:00 - 22:00'
  },
];

export default function FieldsScreen() {
  const router = useRouter();
  const theme = useColorScheme() ?? 'light';

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <ThemedText style={styles.headerTitle}>Canchas</ThemedText>
      </View>
      <ScrollView contentContainerStyle={styles.listContent}>
        {FIELDS.map((field) => (
          <View key={field.id} style={[styles.fieldRow, { backgroundColor: Colors[theme].card }]}>
            <View style={[styles.imageBox, { backgroundColor: Colors[theme].background }]}>
              {getFieldImage(field.imagen) ? (
                <Image
                  source={getFieldImage(field.imagen)}
                  style={{ width: 80, height: 60, borderRadius: 12 }}
                  resizeMode="cover"
                />
              ) : (
                <Ionicons name="image" size={48} color={Colors[theme].tabIconDefault} />
              )}
            </View>
            <View style={styles.infoBox}>
              <ThemedText style={[styles.fieldName, { color: Colors[theme].text }]}>{field.name}</ThemedText>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
                <ThemedText style={[styles.fieldSport, { color: Colors[theme].tabIconDefault }, {marginRight: 6}]}>{field.icon}</ThemedText>
                <ThemedText style={[styles.fieldSport, { color: Colors[theme].tabIconDefault }]}>{field.sport}</ThemedText>
              </View>
            </View>
            <TouchableOpacity
            style={[styles.editButton, {borderColor: Colors[theme].border, borderWidth: 1, backgroundColor: theme === 'dark' ? Colors[theme].tint : Colors[theme].background}]}
            onPress={() => router.push({ pathname: '/(admin)/edit-field', params: { id: field.id } })}>
              <ThemedText style={[styles.editButtonText, { color: Colors[theme].text }]}>Editar</ThemedText>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={[
          styles.addButton,
          { backgroundColor: Colors[theme].tint }
        ]}
        onPress={() => router.push('/(admin)/new-field')}
      >
        <Ionicons name="add" size={24} color="#fff" style={{ marginRight: 8 }} />
        <ThemedText style={styles.addButtonText}>Nueva cancha</ThemedText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 56,
    paddingBottom: 16,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  backButton: {
    marginRight: 8,
    padding: 4,
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 32,
  },
  listContent: {

    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    borderRadius: 16,
    padding: 12,
    shadowColor: '#FAFAFA',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  imageBox: {
    width: 80,
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    overflow: 'hidden',
  },
  infoBox: {
    flex: 1,
    justifyContent: 'center',
  },
  fieldName: {
    fontSize: 18,
    fontWeight: '600',
  },
  fieldSport: {
    fontSize: 15,
    marginTop: 2,
  },
  editButton: {
    borderRadius: 20,
    paddingHorizontal: 22,
    paddingVertical: 8,
    marginLeft: 12,
  },
  editButtonText: {
    fontWeight: '600',
    fontSize: 16,
  },
  addButton: {
    position: 'absolute',
    right: 24,
    bottom: 32,
    borderRadius: 32,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingVertical: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
});