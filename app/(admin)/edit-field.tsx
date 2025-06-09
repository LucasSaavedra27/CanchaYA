import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function EditFieldScreen() {
  const [name, setName] = useState('');
  const [sport, setSport] = useState('');
  const [price, setPrice] = useState('');
  const [hours, setHours] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#111" />
      </TouchableOpacity>
      <ThemedText style={styles.title}>Editar cancha</ThemedText>
      <View style={styles.imageBox}>
        <Ionicons name="image" size={64} color="#bbb" />
        <TouchableOpacity style={styles.changeImageButton}>
          <ThemedText style={styles.changeImageText}>Cambiar Imagen</ThemedText>
        </TouchableOpacity>
      </View>
      <View style={styles.inputGroup}>
        <ThemedText style={styles.label}>Nombre</ThemedText>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Nombre o numero de cancha" />
      </View>
      <View style={styles.inputGroup}>
        <ThemedText style={styles.label}>Deporte</ThemedText>
        <TextInput style={styles.input} value={sport} onChangeText={setSport} placeholder="Tipo de deporte" />
      </View>
      <View style={styles.inputGroup}>
        <ThemedText style={styles.label}>Precio por hora</ThemedText>
        <TextInput style={styles.input} value={price} onChangeText={setPrice} placeholder="$" keyboardType="numeric" />
      </View>
      <View style={styles.inputGroup}>
        <ThemedText style={styles.label}>Horarios disponibles</ThemedText>
        <TextInput style={styles.input} value={hours} onChangeText={setHours} placeholder="e.g. 8:00 - 22:00" />
      </View>
      <TouchableOpacity style={styles.saveButton}>
        <ThemedText style={styles.saveButtonText}>Guardar cambios</ThemedText>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  backButton: {
    marginBottom: 12,
    alignSelf: 'flex-start',
    padding: 4,
    borderRadius: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  imageBox: {
    alignItems: 'center',
    marginBottom: 24,
  },
  changeImageButton: {
    marginTop: 8,
    backgroundColor: '#f2f2f2',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  changeImageText: {
    color: '#222',
    fontWeight: '600',
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 15,
    color: '#444',
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
  },
  saveButton: {
    marginTop: 32,
    backgroundColor: '#111',
    borderRadius: 24,
    alignItems: 'center',
    paddingVertical: 16,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
});
