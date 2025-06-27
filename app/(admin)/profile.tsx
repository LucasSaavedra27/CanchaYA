import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Image as ExpoImage } from 'expo-image';
import { useState } from 'react';
import { Modal, ScrollView, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, useColorScheme, View } from 'react-native';

export default function AdminProfileScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';

  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('Juan');
  const [surname, setSurname] = useState('Pérez');
  const [email, setEmail] = useState('juan@email.com');
  const [phone, setPhone] = useState('3814567890');
  const [modalVisible, setModalVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(theme === 'dark');

  const InfoItem = ({ icon, title, value }: { icon: any, title: string, value: string }) => (
    <View style={styles.infoItemContainer}>
      <View style={styles.infoIconContainer}>
        <Ionicons name={icon} size={24} color={Colors[theme].text} />
      </View>
      <View style={styles.infoTextContainer}>
        <ThemedText style={styles.infoTitle}>{title}</ThemedText>
        <ThemedText style={styles.infoValue}>{value}</ThemedText>
      </View>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>Mi Perfil</ThemedText>
        <TouchableOpacity onPress={() => setSettingsVisible(true)}>
          <Ionicons 
            name="settings-outline" 
            size={24} 
            color={theme === 'dark' ? Colors.dark.text : Colors.light.text} 
          />
        </TouchableOpacity>
      </View>

      <View style={styles.profileContainer}>
        <TouchableOpacity 
          onPress={() => setModalVisible(true)}
          style={styles.avatarContainer}
        >
          <ExpoImage 
            source={require('@/assets/images/avatar.png')}
            style={styles.avatar}
            contentFit="cover"
            transition={200}
          />
        </TouchableOpacity>
        <ThemedText style={styles.name}>{name} {surname}</ThemedText>
        <ThemedText style={styles.subtitle}>Administrador</ThemedText>

        <TouchableOpacity 
          style={[styles.editButton, { backgroundColor: Colors[theme].buttonBorder + '40' }]} 
          onPress={() => setEditMode(true)}
        >
          <ThemedText style={styles.editText}>Editar Perfil</ThemedText>
        </TouchableOpacity>
      </View>

      {/* Modal de imagen de perfil */}
      <Modal 
        visible={modalVisible} 
        transparent 
        animationType="fade" 
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1} 
          onPress={() => setModalVisible(false)}
        >
          <View style={[styles.modalContent, { backgroundColor: Colors[theme].background }]}>
            <ExpoImage 
              source={require('@/assets/images/avatar.png')} 
              style={styles.avatarLarge}
              contentFit="cover"
              transition={200}
            />
            <TouchableOpacity 
              style={[styles.changePhotoButton, { backgroundColor: Colors[theme].tint }]}
              onPress={() => {
                setModalVisible(false);
                // Aquí iría la lógica para cambiar la foto
              }}
            >
              <ThemedText style={[styles.changePhotoText, { color: '#fff' }]}>
                Cambiar foto de perfil
              </ThemedText>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Modal de configuración */}
      <Modal visible={settingsVisible} transparent animationType="fade" onRequestClose={() => setSettingsVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setSettingsVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={[styles.settingsModal, { backgroundColor: Colors[theme].background }]}>
              <ThemedText style={styles.sectionTitle}>Configuración</ThemedText>
              <View style={styles.settingRow}>
                <ThemedText style={styles.settingLabel}>Modo oscuro</ThemedText>
                <TouchableOpacity
                  style={[styles.toggleButton, darkMode ? styles.toggleActive : null]}
                  onPress={() => setDarkMode(!darkMode)}
                >
                  <ThemedText style={darkMode ? styles.toggleTextActive : styles.toggleText}>
                    {darkMode ? 'Activado' : 'Desactivado'}
                  </ThemedText>
                </TouchableOpacity>
              </View>
              <TouchableOpacity 
                style={[styles.closeButton, { backgroundColor: Colors[theme].tint }]}
                onPress={() => setSettingsVisible(false)}
              >
                <ThemedText style={[styles.closeButtonText, { color: '#fff' }]}>Cerrar</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <ScrollView style={styles.sectionContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <ThemedText style={styles.statValue}>45</ThemedText>
            <ThemedText style={styles.statLabel}>Turnos Gestionados</ThemedText>
          </View>
          <View style={styles.statItem}>
            <ThemedText style={styles.statValue}>98%</ThemedText>
            <ThemedText style={styles.statLabel}>Respuesta</ThemedText>
          </View>
          <View style={styles.statItem}>
            <ThemedText style={styles.statValue}>4.9</ThemedText>
            <ThemedText style={styles.statLabel}>Valoración</ThemedText>
          </View>
        </View>

        <ThemedText style={styles.sectionTitle}>Información de Contacto</ThemedText>
        <InfoItem 
          icon="person-outline" 
          title="Nombre" 
          value={`${name} ${surname}`}
        />
        <InfoItem 
          icon="mail-outline" 
          title="Email" 
          value={email}
        />
        <InfoItem 
          icon="call-outline" 
          title="Teléfono" 
          value={phone}
        />

        {editMode && (
          <View style={[styles.editSection, { backgroundColor: Colors[theme].background }]}>
            <ThemedText style={styles.sectionTitle}>Editar Información</ThemedText>
            <TextInput
              style={[styles.input, { backgroundColor: Colors[theme].buttonBorder + '40' }]}
              value={name}
              onChangeText={setName}
              placeholder="Nombre"
              placeholderTextColor="#888"
            />
            <TextInput
              style={[styles.input, { backgroundColor: Colors[theme].buttonBorder + '40' }]}
              value={surname}
              onChangeText={setSurname}
              placeholder="Apellido"
              placeholderTextColor="#888"
            />
            <TextInput
              style={[styles.input, { backgroundColor: Colors[theme].buttonBorder + '40' }]}
              value={email}
              onChangeText={setEmail}
              placeholder="Correo electrónico"
              placeholderTextColor="#888"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={[styles.input, { backgroundColor: Colors[theme].buttonBorder + '40' }]}
              value={phone}
              onChangeText={setPhone}
              placeholder="Teléfono"
              placeholderTextColor="#888"
              keyboardType="phone-pad"
            />
            <TouchableOpacity 
              style={[styles.editButton, { backgroundColor: Colors[theme].tint }]} 
              onPress={() => setEditMode(false)}
            >
              <ThemedText style={[styles.editText, { color: '#fff' }]}>Guardar</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.editButton, { backgroundColor: '#FF3B30' }]} 
              onPress={() => setEditMode(false)}
            >
              <ThemedText style={[styles.editText, { color: '#fff' }]}>Cancelar</ThemedText>
            </TouchableOpacity>
          </View>
        )}
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
  avatarContainer: {
    marginBottom: 12,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 12,
  },
  editButton: {
    alignSelf: 'center',
    marginTop: 8,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  editText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  avatarLarge: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  changePhotoButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 8,
  },
  changePhotoText: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.7,
    textAlign: 'center',
  },
  sectionContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  infoItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  infoTextContainer: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '500',
  },
  settingsModal: {
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
  closeButton: {
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 10,
    marginTop: 10,
  },
  closeButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  editSection: {
    borderColor: '#eee',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    marginHorizontal: 0,
    elevation: 2,
  },
  input: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent',
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 12,
  },
});
