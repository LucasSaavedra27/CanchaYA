import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

const FIELDS = [
  { id: 1, name: 'Cancha 1', sport: 'Fútbol' },
  { id: 2, name: 'Cancha 2', sport: 'Basquet' },
  { id: 3, name: 'Cancha 3', sport: 'Tenis' },
  { id: 4, name: 'Cancha 4', sport: 'Voley' },
]
export default function FieldsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#111" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Canchas</ThemedText>
      </View>
      <ScrollView contentContainerStyle={styles.listContent}>
        {FIELDS.map((field) => (
          <View key={field.id} style={styles.fieldRow}>
            <View style={styles.imageBox}>
              <Ionicons name="image" size={48} color="#bbb" />
            </View>
            <View style={styles.infoBox}>
              <ThemedText style={styles.fieldName}>{field.name}</ThemedText>
              <ThemedText style={styles.fieldSport}>{field.sport}</ThemedText>
            </View>
            <TouchableOpacity style={styles.editButton} onPress={() => router.push('/(admin)/edit-field')}>
              <ThemedText style={styles.editButtonText}>Editar</ThemedText>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add" size={24} color="#fff" style={{ marginRight: 8 }} />
        <ThemedText style={styles.addButtonText}>Nueva cancha</ThemedText>
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
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginRight: 32, // para centrar el título
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  imageBox: {
    width: 80,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#f2f2f2',
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
    color: '#111',
  },
  fieldSport: {
    fontSize: 15,
    color: '#888',
    marginTop: 2,
  },
  editButton: {
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    paddingHorizontal: 22,
    paddingVertical: 8,
    marginLeft: 12,
  },
  editButtonText: {
    color: '#222',
    fontWeight: '600',
    fontSize: 16,
  },
  addButton: {
    position: 'absolute',
    right: 24,
    bottom: 32,
    backgroundColor: '#111',
    borderRadius: 32,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingVertical: 16,
    shadowColor: '#000',
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
