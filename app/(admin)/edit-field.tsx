import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';
import { FIELDS } from './fields';

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

export default function EditFieldScreen() {
  const { id } = useLocalSearchParams();
  const field = FIELDS.find(f => String(f.id) === String(id));
  const router = useRouter();

  // Estados inicializados con los valores del campo encontrado
  const [name, setName] = useState(field?.name || '');
  const [sport, setSport] = useState(field?.sport || '');
  const [price, setPrice] = useState(field?.precio || '');
  const [hours, setHours] = useState(field?.horarios || '');
  const [imagen, setImagen] = useState(field?.imagen || '');

  // Si el id cambia, actualiza los estados (por si navegas entre campos)
  useEffect(() => {
    if (field) {
      setName(field.name);
      setSport(field.sport);
      setPrice(field.precio);
      setHours(field.horarios);
      setImagen(field.imagen);
    }
  }, [id]);
  const theme = useColorScheme() as 'light' | 'dark';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity 
      style={[styles.backButton, { backgroundColor: theme === 'dark' ? Colors[theme].card : Colors[theme].background }]} 
      onPress={() => router.push('/(admin)/fields')}>
        <Ionicons name="arrow-back" size={24} color="#111" />
      </TouchableOpacity>
      <ThemedText style={styles.title}>Editar cancha</ThemedText>
      <View style={styles.imageBox}>
        {imagen && getFieldImage(imagen) ? (
          <Image source={getFieldImage(imagen)} style={{ width: 100, height: 70, borderRadius: 12 }} />
        ) : (
          <Ionicons name="image" size={64} color="#bbb" />
        )}
        <TouchableOpacity style={styles.changeImageButton}>
          <ThemedText style={styles.changeImageText}>Cambiar Imagen</ThemedText>
        </TouchableOpacity>
      </View>
      <View style={styles.inputGroup}>
        <ThemedText style={styles.label}>Nombre</ThemedText>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Nombre o número de cancha" />
      </View>
      <View style={styles.inputGroup}>
        <ThemedText style={styles.label}>Deporte</ThemedText>
        <TextInput style={styles.input} value={sport} onChangeText={setSport} placeholder="Tipo de deporte" />
      </View>
      <View style={styles.inputGroup}>
        <ThemedText style={styles.label}>$ Precio por hora</ThemedText>
        <TextInput style={styles.input} value={price} onChangeText={setPrice} placeholder="$" keyboardType="numeric" />
      </View>
      <View style={styles.inputGroup}>
        <ThemedText style={styles.label}>Horarios disponibles</ThemedText>
        <TextInput style={styles.input} value={hours} onChangeText={setHours} placeholder="e.g. 8:00 - 22:00" />
      </View>
      <TouchableOpacity style={[styles.saveButton, { backgroundColor: Colors[theme].tint}]} onPress={() => {
        alert('Cambios guardados (simulado)');
      }}>
        <ThemedText style={styles.saveButtonText}>Guardar cambios</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.saveButton,
          { backgroundColor: '#e53935', marginTop: 16 }
        ]}
        onPress={() => {
          // Aquí puedes poner la lógica para eliminar la cancha
          alert('Cancha eliminada (simulado)');
        }}
      >
        <ThemedText style={styles.saveButtonText}>Eliminar cancha</ThemedText>
      </TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
  },
  backButton: {
    marginTop: 20,
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
