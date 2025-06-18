import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, TextInput, TouchableOpacity, View, useColorScheme } from 'react-native';

const PAYMENT_METHODS = [
  { key: 'cash', label: 'Cash' },
  { key: 'credit', label: 'Credit Card' },
  { key: 'debit', label: 'Debit Card' },
];

export default function SettingsScreen() {
  const [name, setName] = useState('LEONES');
  const [address, setAddress] = useState('Av. Siempre Viva 123');
  const [contact, setContact] = useState('1234-5678');
  const [opening, setOpening] = useState('08:00');
  const [closing, setClosing] = useState('22:00');
  const [methods, setMethods] = useState({ cash: true, credit: true, debit: true });
  const theme = useColorScheme() as 'light' | 'dark';

  const toggleMethod = (key: string) => {
    setMethods((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  return (
    <View style={styles.container}>
     <View style={styles.header}>
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        <ThemedText style={[styles.title, { color: Colors[theme].text }]}>Configuraciones</ThemedText>
        <View style={[styles.imageBox, { backgroundColor: Colors[theme].card }]}>
          <Image
            source={require('../../assets/images/leones.jpg')}
            style={{ width: 100, height: 100, borderRadius: 20 }}
            resizeMode="cover"
          />
          <TouchableOpacity style={[styles.changeImageButton, { backgroundColor: Colors[theme].background }]}>
            <ThemedText style={[styles.changeImageText, { color: Colors[theme].text }]}>Cambiar imagen</ThemedText>
          </TouchableOpacity>
        </View>
        <View style={styles.inputGroup}>
          <ThemedText style={[styles.label, { color: Colors[theme].text }]}>Nombre del complejo</ThemedText>
          <TextInput style={[styles.input, { color: Colors[theme].text, backgroundColor: Colors[theme].card, borderColor: Colors[theme].border }]} value={name} onChangeText={setName} placeholder="" placeholderTextColor={Colors[theme].tabIconDefault} />
        </View>
        <View style={styles.inputGroup}>
          <ThemedText style={[styles.label, { color: Colors[theme].text }]}>Dirección</ThemedText>
          <TextInput style={[styles.input, { color: Colors[theme].text, backgroundColor: Colors[theme].card, borderColor: Colors[theme].border }]} value={address} onChangeText={setAddress} placeholder="" placeholderTextColor={Colors[theme].tabIconDefault} />
        </View>
        <View style={styles.inputGroup}>
          <ThemedText style={[styles.label, { color: Colors[theme].text }]}>Contacto</ThemedText>
          <TextInput style={[styles.input, { color: Colors[theme].text, backgroundColor: Colors[theme].card, borderColor: Colors[theme].border }]} value={contact} onChangeText={setContact} placeholder="" placeholderTextColor={Colors[theme].tabIconDefault} />
        </View>
        <View style={styles.inputGroup}>
          <ThemedText style={[styles.label, { color: Colors[theme].text }]}>Horarios de atención</ThemedText>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <View style={{ flex: 1 }}>
              <TextInput style={[styles.input, { color: Colors[theme].text, backgroundColor: Colors[theme].card, borderColor: Colors[theme].border }]} value={opening} onChangeText={setOpening} placeholder="Apertura" placeholderTextColor={Colors[theme].tabIconDefault} />
            </View>
            <View style={{ flex: 1 }}>
              <TextInput style={[styles.input, { color: Colors[theme].text, backgroundColor: Colors[theme].card, borderColor: Colors[theme].border }]} value={closing} onChangeText={setClosing} placeholder="Cierre" placeholderTextColor={Colors[theme].tabIconDefault} />
            </View>
          </View>
        </View>
        <View style={styles.inputGroup}>
          <ThemedText style={[styles.label, { color: Colors[theme].text }]}>Métodos de pago</ThemedText>
          {PAYMENT_METHODS.map((m) => (
            <TouchableOpacity
              key={m.key}
              style={styles.checkboxRow}
              onPress={() => toggleMethod(m.key)}
              activeOpacity={0.7}
            >
              <View style={[
                styles.checkbox,
                {
                  borderColor: methods[m.key as keyof typeof methods] ? Colors[theme].tint : Colors[theme].border,
                  backgroundColor: Colors[theme].background
                }
              ]}>
                {methods[m.key as keyof typeof methods] && <Ionicons name="checkmark" size={18} color={Colors[theme].tint} />}
              </View>
              <ThemedText style={[styles.checkboxLabel, { color: Colors[theme].text }]}>
                {m.label === 'Cash' ? 'Efectivo' : m.label === 'Credit Card' ? 'Tarjeta de crédito' : 'Tarjeta de débito'}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={[styles.saveButton, { backgroundColor: Colors[theme].tint }]}
        onPress={() => {
          // Aquí puedes poner la lógica para eliminar la cancha
          alert('Valores editados por tener permiso. (simulado)');
        }}>
          <ThemedText style={styles.saveButtonText}>Guardar cambios</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.deleteButton, { backgroundColor: '#e53935' }]}
        onPress={() => {
          // Aquí puedes poner la lógica para eliminar la cancha
          alert('Complejo eliminado por tener permiso. (simulado)');
        }}>
          <ThemedText style={styles.saveButtonText}>Eliminar complejo</ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </View>
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
    marginTop: 20,
    marginBottom: 12,
    alignSelf: 'flex-start',
    padding: 4,
    borderRadius: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 32,
    marginBottom: 15,
    paddingBottom: 16,
  },
  imageBox: {
    alignItems: 'center',
    marginBottom: 24,
    borderRadius: 20,
    padding: 16,
  },
  changeImageButton: {
    marginTop: 8,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  changeImageText: {
    fontWeight: '600',
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 15,
    marginBottom: 6,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 0,
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
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  saveButton: {
    marginTop: 32,
    borderRadius: 24,
    alignItems: 'center',
    paddingVertical: 16,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
  deleteButton: {
    marginTop: 16,
    borderRadius: 24,
    alignItems: 'center',
    paddingVertical: 16,
  },
});
