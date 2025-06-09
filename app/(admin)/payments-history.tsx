import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

const PAYMENTS = [
  { date: '2024-07-26', method: 'MercadoPago', amount: 30000 },
  { date: '2024-07-20', method: 'Efectivo', amount: 30000 },
  { date: '2024-07-15', method: 'MercadoPago', amount: 30000 },
  { date: '2024-07-10', method: 'Efectivo', amount: 30000 },
  { date: '2024-07-05', method: 'MercadoPago', amount: 30000 },
  { date: '2024-07-01', method: 'Efectivo', amount: 30000 },
];

export default function PaymentsHistoryScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#111" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Historial de pagos</ThemedText>
      </View>
      <ScrollView contentContainerStyle={styles.listContent}>
        <ThemedText style={styles.sectionTitle}>Pagos</ThemedText>
        {PAYMENTS.map((p, i) => (
          <View key={i} style={styles.paymentRow}>
            <View>
              <ThemedText style={styles.paymentDate}>{p.date}</ThemedText>
              <ThemedText style={styles.paymentMethod}>{p.method}</ThemedText>
            </View>
            <ThemedText style={styles.paymentAmount}>{`$${p.amount}`}</ThemedText>
          </View>
        ))}
      </ScrollView>
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
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 24,
    marginTop: 8,
  },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  paymentDate: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
    marginBottom: 2,
  },
  paymentMethod: {
    fontSize: 15,
    color: '#aaa',
  },
  paymentAmount: {
    fontSize: 19,
    fontWeight: '600',
    color: '#111',
    marginLeft: 16,
  },
});
