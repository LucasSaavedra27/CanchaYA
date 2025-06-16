import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, useColorScheme, View } from 'react-native';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';

  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('Lucas');
  const [surname, setSurname] = useState('Ramirez');
  const [email, setEmail] = useState('lucas@email.com');
  const [phone, setPhone] = useState('3812345678');
  const [modalVisible, setModalVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(theme === 'dark');

  const FieldItem = ({ image, clubName, fieldName, isFavorite = false }: { image: any, clubName: string, fieldName: string, isFavorite?: boolean }) => (
    <View style={styles.itemContainer}>
      <Image source={image} style={styles.fieldImage} />
      <View style={styles.itemTextContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <ThemedText style={styles.itemTitle}>{clubName}</ThemedText>
          {isFavorite && (
            <Ionicons name="star" size={18} color="#FFD700" style={{ marginLeft: 6 }} />
          )}
        </View>
        <ThemedText style={styles.itemSubtitle}>{fieldName}</ThemedText>
      </View>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>Mi Perfil</ThemedText>
        <TouchableOpacity onPress={() => setSettingsVisible(true)}>
          <Ionicons name="settings-outline" size={24} color={theme === 'dark' ? Colors.dark.text : Colors.light.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image 
            source={require('@/assets/images/avatar.png')} 
            style={styles.avatar} 
          />
        </TouchableOpacity>
        <ThemedText style={styles.name}>{name} {surname}</ThemedText>
        <ThemedText style={styles.points}>1200 Points</ThemedText>

        <TouchableOpacity style={[styles.editButton, { backgroundColor: '#f0f0f0' }]} onPress={() => setEditMode(true)}>
          <ThemedText style={styles.editText}>Editar Perfil</ThemedText>
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={() => setModalVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Image source={require('@/assets/images/avatar.png')} style={styles.avatarLarge} />
              <TouchableOpacity style={styles.changePhotoButton}>
                <ThemedText style={styles.changePhotoText}>Cambiar imagen de perfil</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal visible={settingsVisible} transparent animationType="fade" onRequestClose={() => setSettingsVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setSettingsVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.settingsModal}>
              <ThemedText style={styles.sectionTitle}>Configuración</ThemedText>
              <View style={styles.settingRow}>
                <ThemedText style={styles.settingLabel}>Modo oscuro</ThemedText>
                <TouchableOpacity
                  style={[styles.toggleButton, darkMode ? styles.toggleActive : null]}
                  onPress={() => setDarkMode(!darkMode)}
                >
                  <ThemedText style={darkMode ? styles.toggleTextActive : styles.toggleText}>{darkMode ? 'Activado' : 'Desactivado'}</ThemedText>
                </TouchableOpacity>
              </View>
              <View style={styles.settingRow}>
                <ThemedText style={styles.settingLabel}>Notificaciones</ThemedText>
                <TouchableOpacity style={styles.toggleButton}>
                  <ThemedText style={styles.toggleText}>Configurar</ThemedText>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.closeNotifButton} onPress={() => setSettingsVisible(false)}>
                <ThemedText style={styles.closeNotifText}>Cerrar</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {editMode && (
        <View style={styles.editSection}>
          <ThemedText style={styles.sectionTitle}>Editar Perfil</ThemedText>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Nombre"
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            value={surname}
            onChangeText={setSurname}
            placeholder="Apellido"
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Correo electrónico"
            placeholderTextColor="#888"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Teléfono"
            placeholderTextColor="#888"
            keyboardType="phone-pad"
          />
          <TouchableOpacity style={[styles.editButton, { backgroundColor: '#007AFF' }]} onPress={() => setEditMode(false)}>
            <ThemedText style={[styles.editText, { color: '#fff' }]}>Guardar</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.editButton, { backgroundColor: '#FF3B30', marginTop: 0 }]} onPress={() => setEditMode(false)}>
            <ThemedText style={[styles.editText, { color: '#fff' }]}>Cancelar</ThemedText>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView style={styles.sectionContainer} showsVerticalScrollIndicator={false}>
        <ThemedText style={styles.sectionTitle}>Historial reservas</ThemedText>
        <FieldItem 
          image={require('@/assets/images/luck.jpg')} 
          clubName="Luck Padel" 
          fieldName="Pádel · Martes 28/05 17:00hs" 
          isFavorite={true}
        />
        <FieldItem 
          image={require('@/assets/images/leones.jpg')} 
          clubName="Beach Voley" 
          fieldName="Voley · Sábado 01/06 19:00hs" 
        />
        <FieldItem 
          image={require('@/assets/images/micancha.png')} 
          clubName="MiCancha" 
          fieldName="Fútbol · Viernes 30/05 16:00hs" 
          isFavorite={true}
        />

        <ThemedText style={styles.sectionTitle}>Favoritos</ThemedText>
        <FieldItem 
          image={require('@/assets/images/micancha.png')} 
          clubName="MiCancha" 
          fieldName="Av. Virgen del Valle 734" 
        />
        <FieldItem 
          image={require('@/assets/images/luck.jpg')} 
          clubName="Luck Padel" 
          fieldName="Av. Enrique Ocampo 768" 
        />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingTop: 40,
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  points: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 12,
  },
  editButton: {
    alignSelf: 'center', // Solo el ancho del contenido
    marginTop: 8,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // gris claro
  },
  editText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sectionContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  fieldImage: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginRight: 12,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  itemSubtitle: {
    fontSize: 13,
    opacity: 0.6,
  },
  editSection: {
    backgroundColor: '#fff',
    borderColor: '#eee',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    marginHorizontal: 0,
    elevation: 2,
  },
  input: {
    backgroundColor: '#f5f5f5',
    color: '#222',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    elevation: 10,
  },
  avatarLarge: {
    width: 180,
    height: 180,
    borderRadius: 90,
    marginBottom: 20,
  },
  changePhotoButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 8,
  },
  changePhotoText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  settingsModal: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 24,
    alignItems: 'center',
    elevation: 10,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 240,
    marginBottom: 18,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  toggleButton: {
    backgroundColor: '#eee',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  toggleActive: {
    backgroundColor: '#007AFF',
  },
  toggleText: {
    color: '#333',
    fontWeight: 'bold',
  },
  toggleTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeNotifButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 10,
    marginTop: 10,
  },
  closeNotifText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});
