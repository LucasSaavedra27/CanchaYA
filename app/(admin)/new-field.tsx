import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';

const AVAILABLE_IMAGES = [
  {
    path: '/assets/images/cancha1.png',
    image: require('../../assets/images/cancha1.png'),
  },
  {
    path: '/assets/images/cancha2.png',
    image: require('../../assets/images/cancha2.png'),
  },
  {
    path: '/assets/images/cancha3.png',
    image: require('../../assets/images/cancha3.png'),
  },
  {
    path: '/assets/images/VOLEY.png',
    image: require('../../assets/images/VOLEY.png'),
  },
];

export default function NewFieldScreen() {
  const [name, setName] = useState('');
  const [sport, setSport] = useState('');
  const [price, setPrice] = useState('');
  const [hours, setHours] = useState('');
  const [imagen, setImagen] = useState(AVAILABLE_IMAGES[0].path);
  const theme = useColorScheme() as 'light' | 'dark';

  const handleSave = () => {
    // Aquí iría la lógica para guardar la nueva cancha
    router.push('/(admin)/fields');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={[styles.backButton, { backgroundColor: Colors[theme].card }]}
          onPress={() => router.push('/(admin)/fields')}
        >
          <Ionicons name="arrow-back" size={24} color={Colors[theme].text} />
        </TouchableOpacity>
        <ThemedText style={styles.title}>Nueva Cancha</ThemedText>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <ThemedText style={styles.label}>Nombre</ThemedText>
          <TextInput
            style={[styles.input, { 
              backgroundColor: Colors[theme].card,
              color: Colors[theme].text,
              borderColor: Colors[theme].border,
            }]}
            value={name}
            onChangeText={setName}
            placeholder="Nombre de la cancha"
            placeholderTextColor={Colors[theme].tabIconDefault}
          />
        </View>

        <View style={styles.inputGroup}>
          <ThemedText style={styles.label}>Deporte</ThemedText>
          <TextInput
            style={[styles.input, { 
              backgroundColor: Colors[theme].card,
              color: Colors[theme].text,
              borderColor: Colors[theme].border,
            }]}
            value={sport}
            onChangeText={setSport}
            placeholder="Tipo de deporte"
            placeholderTextColor={Colors[theme].tabIconDefault}
          />
        </View>

        <View style={styles.inputGroup}>
          <ThemedText style={styles.label}>Precio por hora</ThemedText>
          <TextInput
            style={[styles.input, { 
              backgroundColor: Colors[theme].card,
              color: Colors[theme].text,
              borderColor: Colors[theme].border,
            }]}
            value={price}
            onChangeText={setPrice}
            placeholder="Precio por hora"
            keyboardType="numeric"
            placeholderTextColor={Colors[theme].tabIconDefault}
          />
        </View>

        <View style={styles.inputGroup}>
          <ThemedText style={styles.label}>Horarios disponibles</ThemedText>
          <TextInput
            style={[styles.input, { 
              backgroundColor: Colors[theme].card,
              color: Colors[theme].text,
              borderColor: Colors[theme].border,
            }]}
            value={hours}
            onChangeText={setHours}
            placeholder="ej: 08:00 - 23:00"
            placeholderTextColor={Colors[theme].tabIconDefault}
          />
        </View>

        <View style={styles.inputGroup}>
          <ThemedText style={styles.label}>Imagen</ThemedText>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.imageSelector}
          >
            {AVAILABLE_IMAGES.map((item) => (
              <TouchableOpacity
                key={item.path}
                style={[
                  styles.imageOption,
                  imagen === item.path && styles.selectedImage,
                  { borderColor: Colors[theme].border }
                ]}
                onPress={() => setImagen(item.path)}
              >
                <Image source={item.image} style={styles.imagePreview} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <TouchableOpacity
          style={[styles.saveButton, { backgroundColor: Colors[theme].tint }]}
          onPress={handleSave}
        >
          <ThemedText style={styles.saveButtonText}>Guardar Cancha</ThemedText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  imageSelector: {
    flexGrow: 0,
    height: 100,
  },
  imageOption: {
    width: 80,
    height: 80,
    borderRadius: 8,
    borderWidth: 2,
    marginRight: 12,
    overflow: 'hidden',
  },
  selectedImage: {
    borderColor: '#007AFF',
    borderWidth: 3,
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  saveButton: {
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
