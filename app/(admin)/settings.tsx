import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

const PAYMENT_METHODS = [
  { key: 'cash', label: 'Cash' },
  { key: 'credit', label: 'Credit Card' },
  { key: 'debit', label: 'Debit Card' },
];

export default function SettingsScreen() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [opening, setOpening] = useState('');
  const [closing, setClosing] = useState('');
  const [methods, setMethods] = useState({ cash: true, credit: true, debit: true });

  const toggleMethod = (key: string) => {
    setMethods((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#111" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Configuraciones</ThemedText>
      </View>
      <View style={styles.imageBox}>
        <Ionicons name="image" size={120} color="#bbb" />
        <TouchableOpacity style={styles.changeImageButton}>
          <ThemedText style={styles.changeImageText}>Cambiar imagen</ThemedText>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Información del complejo</ThemedText>
        <ThemedText style={styles.label}>Nombre del complejo</ThemedText>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="" />
        <ThemedText style={styles.label}>Dirección</ThemedText>
        <TextInput style={styles.input} value={address} onChangeText={setAddress} placeholder="" />
        <ThemedText style={styles.label}>Contacto</ThemedText>
        <TextInput style={styles.input} value={contact} onChangeText={setContact} placeholder="" />
      </View>
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Horarios de atención</ThemedText>
        <View style={styles.row}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <ThemedText style={styles.label}>Apertura</ThemedText>
            <TextInput style={styles.input} value={opening} onChangeText={setOpening} placeholder="" />
          </View>
          <View style={{ flex: 1, marginLeft: 8 }}>
            <ThemedText style={styles.label}>Cierre</ThemedText>
            <TextInput style={styles.input} value={closing} onChangeText={setClosing} placeholder="" />
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Métodos de pago</ThemedText>
        {PAYMENT_METHODS.map((m) => (
          <TouchableOpacity
            key={m.key}
            style={styles.checkboxRow}
            onPress={() => toggleMethod(m.key)}
            activeOpacity={0.7}
          >
            <View style={[styles.checkbox, methods[m.key as keyof typeof methods] && styles.checkboxChecked]}>
              {methods[m.key as keyof typeof methods] && <Ionicons name="checkmark" size={18} color="#000" />}
            </View>
            <ThemedText style={styles.checkboxLabel}>{m.label === 'Cash' ? 'Efectivo' : m.label === 'Credit Card' ? 'Tarjeta de crédito' : 'Tarjeta de débito'}</ThemedText>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.supportButton}>
        <ThemedText style={styles.supportButtonText}>Ayuda y soporte</ThemedText>
      </TouchableOpacity>
    </ScrollView>
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
    marginRight: 32,
  },
  imageBox: {
    width: '100%',
    height: 180,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: 'hidden',
  },
  changeImageButton: {
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
  },
  changeImageText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111',
  },
  section: {
    marginBottom: 28,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    fontSize: 15,
    color: '#222',
    marginBottom: 6,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fafafa',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#111',
    backgroundColor: '#fff',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#fff',
    borderColor: '#111',
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#111',
    fontWeight: '500',
  },
  supportButton: {
    marginTop: 12,
    marginHorizontal: 20,
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    alignItems: 'center',
    paddingVertical: 16,
  },
  supportButtonText: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 17,
  },
});
