import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useState } from 'react';
import { Image, Modal, Pressable, ScrollView, StyleSheet, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';

import { router } from 'expo-router';

interface SportItemProps {
  sport: string;
  name: string;
  time: string;
  price: string;
}

interface FilterChipProps {
  label: string;
  isSelected?: boolean;
}

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';

  // Estados para los modales
  const [modalVisible, setModalVisible] = useState<string | null>(null);
  const [selectedSport, setSelectedSport] = useState('Deportes');
  const [selectedPrice, setSelectedPrice] = useState('Precio');
  const [selectedTime, setSelectedTime] = useState('Horario');
  const [notificationsVisible, setNotificationsVisible] = useState(false);

  // Opciones para los selects
  const sportOptions = ['Deportes','Fútbol', 'Pádel', 'Voley', 'Básquet'];
  const priceOptions = ['Precio', '0 - 10.000', '10.000 - 20.000', '20.000 - 40.000', '40.000+'];
  const timeOptions = ['Horario', 'Mañana', 'Tarde', 'Noche'];

  const notifications = [
    { id: 5, title: 'Recordatorio', desc: 'Tienes una reserva en MiCancha el Lunes 10/06 a las 20:00hs.' },
    { id: 6, title: 'Recordatorio', desc: 'Tu reserva en Leones es el Miércoles 12/06 a las 18:30hs.' },
    { id: 1, title: '¡Promo en MiCancha!', desc: 'Reservá hoy y obtené 20% de descuento.' },
    { id: 2, title: 'Leones: 2x1 en turnos noche', desc: 'Solo este viernes, reservá dos horas y pagá una.' },
    { id: 3, title: 'Beach Voley: Happy Hour', desc: 'De 18 a 20hs, precio especial para grupos.' },
    { id: 4, title: 'Luck Padel: Nueva cancha techada', desc: '¡Probala con un 10% off en tu primera reserva!' },
  ];

  const SportItem = ({ sport, name, time, price }: SportItemProps) => {
    let imageSource;
    if (name === 'MiCancha') {
      imageSource = require('@/assets/images/micancha.png');
    } else if (name === 'Luck Padel') {
      imageSource = require('@/assets/images/luck.jpg');
    } else if (name === 'Leones' || name === 'Voley Leones' || name === 'Beach Voley') {
      imageSource = require('@/assets/images/leones.jpg');
    }
    return (
      <TouchableOpacity 
        style={[
          styles.sportCard,
          { backgroundColor: Colors[theme].background }
        ]}
        onPress={() => router.push({ pathname: '/field-details', params: { field: name } })}
      >
        <View style={styles.sportInfo}>
          <View style={styles.sportTypeContainer}>
            <ThemedText style={styles.sportEmoji}>{getSportEmoji(sport)}</ThemedText>
            <ThemedText style={styles.sportType}>{sport}</ThemedText>
          </View>
          <ThemedText style={styles.sportName}>{name}</ThemedText>
          <View style={styles.timeContainer}>
            <ThemedText style={styles.sportTime}>{time}</ThemedText>
            <ThemedText style={styles.sportTime}> · </ThemedText>
            <ThemedText style={styles.sportTime}>${price}</ThemedText>
          </View>
        </View>
        <View style={styles.sportImageContainer}>
          {imageSource ? (
            <Image source={imageSource} style={{ width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 16 }} />
          ) : (
            <View style={[styles.imagePlaceholder, { backgroundColor: Colors[theme].buttonBorder }]} />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const getSportEmoji = (sport: string) => {
    switch (sport.toLowerCase()) {
      case 'fútbol':
        return '⚽';
      case 'tenis':
        return '🎾';
      case 'pádel':
        return '🎾';
      case 'voley':
        return '🏐'; // Pelota de voleibol
      default:
        return '🏅';
    }
  };

  const FilterChip = ({ label, isSelected, onPress }: FilterChipProps & { onPress?: () => void }) => (
    <TouchableOpacity 
      style={[
        styles.chipButton,
        { 
          backgroundColor: isSelected ? Colors[theme].tint : Colors[theme].background,
          borderColor: isSelected ? Colors[theme].tint : Colors[theme].buttonBorder
        }
      ]}
      onPress={onPress}
    >
      <ThemedText style={[
        styles.chipText,
        { color: isSelected ? '#FFFFFF' : Colors[theme].text }
      ]}>
        {label}
      </ThemedText>
    </TouchableOpacity>
  );

  // Helper para mostrar el label por defecto si no se ha seleccionado nada
  const getChipLabel = (selected: string, def: string, options: string[]) => {
    return options.includes(selected) ? selected : def;
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <View>
          <ThemedText style={styles.greeting}>
            <ThemedText>Hola, </ThemedText>
            <ThemedText>Mateo</ThemedText>
          </ThemedText>
        </View>
        <TouchableOpacity onPress={() => setNotificationsVisible(true)}>
          <View>
            <Ionicons 
              name="notifications-outline" 
              size={24} 
              color={Colors[theme].text} 
            />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={[styles.searchBox, { backgroundColor: Colors[theme].buttonBorder + '20' }]}>
          <Ionicons 
            name="search-outline" 
            size={20} 
            color={Colors[theme].text} 
            style={styles.searchIcon} 
          />
          <TextInput 
            placeholder="Buscar canchas"
            placeholderTextColor={Colors[theme].subtitle}
            style={[styles.searchInput, { color: Colors[theme].text }]}
          />
        </View>
      </View>

      <View style={styles.filterContainer}>
        <FilterChip label={getChipLabel(selectedSport, 'Deporte', sportOptions)} isSelected={modalVisible === 'sport'} onPress={() => setModalVisible('sport')} />
        <FilterChip label={getChipLabel(selectedPrice, 'Precio', priceOptions)} isSelected={modalVisible === 'price'} onPress={() => setModalVisible('price')} />
        <FilterChip label={getChipLabel(selectedTime, 'Horario', timeOptions)} isSelected={modalVisible === 'time'} onPress={() => setModalVisible('time')} />
      </View>
      {/* Modales de selección */}
      <Modal visible={modalVisible === 'sport'} transparent animationType="fade" onRequestClose={() => setModalVisible(null)}>
        <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(null)}>
          <View style={styles.modalContent}>
            {sportOptions.map(option => (
              <TouchableOpacity key={option} style={styles.modalOption} onPress={() => { setSelectedSport(option); setModalVisible(null); }}>
                <ThemedText>{option}</ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
      <Modal visible={modalVisible === 'price'} transparent animationType="fade" onRequestClose={() => setModalVisible(null)}>
        <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(null)}>
          <View style={styles.modalContent}>
            {priceOptions.map(option => (
              <TouchableOpacity key={option} style={styles.modalOption} onPress={() => { setSelectedPrice(option); setModalVisible(null); }}>
                <ThemedText>{option}</ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
      <Modal visible={modalVisible === 'time'} transparent animationType="fade" onRequestClose={() => setModalVisible(null)}>
        <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(null)}>
          <View style={styles.modalContent}>
            {timeOptions.map(option => (
              <TouchableOpacity key={option} style={styles.modalOption} onPress={() => { setSelectedTime(option); setModalVisible(null); }}>
                <ThemedText>{option}</ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
      {/* Modal de notificaciones */}
      <Modal visible={notificationsVisible} transparent animationType="fade" onRequestClose={() => setNotificationsVisible(false)}>
        <BlurView intensity={80} tint={theme} style={StyleSheet.absoluteFill}>
          <Pressable style={styles.modalOverlay} onPress={() => setNotificationsVisible(false)}>
            <View style={styles.notificationsModal}>
              <ThemedText style={styles.sectionTitle}>Notificaciones</ThemedText>
              {notifications.map(n => (
                <View key={n.id} style={[styles.notificationCard, n.title === 'Recordatorio' && styles.reminderCard]}> 
                  <ThemedText style={styles.notificationTitle}>{n.title}</ThemedText>
                  <ThemedText style={styles.notificationDesc}>{n.desc}</ThemedText>
                </View>
              ))}
              <TouchableOpacity style={styles.closeNotifButton} onPress={() => setNotificationsVisible(false)}>
                <ThemedText style={styles.closeNotifText}>Cerrar</ThemedText>
              </TouchableOpacity>
            </View>
          </Pressable>
        </BlurView>
      </Modal>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <SportItem 
          sport="Fútbol"
          name="MiCancha"
          time="16:00 - 00:00"
          price="32.000"
        />
        <SportItem 
          sport="Fútbol"
          name="Leones"
          time="16:00 - 01:00"
          price="30.000"
        />
        <SportItem 
          sport="Pádel"
          name="Luck Padel"
          time="10:00 - 00:00"
          price="17.000"
        />
        <SportItem 
          sport="Voley"
          name="Beach Voley"
          time="16:00 - 01:00"
          price="15.000"
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
  sportTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  sportEmoji: {
    fontSize: 16,
    marginRight: 6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 24,
  },
  greeting: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop:10,
    marginLeft:20,
    marginBottom: 4,
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 48,
    borderRadius: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  chipButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipText: {
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    flexDirection: 'column', // Asegura que las tarjetas estén apiladas verticalmente
    paddingBottom: 24,
  },
  sportCard: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 16,
    overflow: 'hidden',
    height: 120,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sportInfo: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  sportType: {
    fontSize: 15,
    opacity: 0.7,
    marginBottom: 4,
  },
  sportName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sportTime: {
    fontSize: 15,
    opacity: 0.7,
  },
  sportImageContainer: {
    width: 120,
    height: 120,
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    opacity: 0.2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    minWidth: 220,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  modalOption: {
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  notificationsModal: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 24,
    alignItems: 'center',
    elevation: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  notificationCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    width: 260,
    alignItems: 'flex-start',
  },
  reminderCard: {
    backgroundColor: '#FFF3CD', // Amarillo claro llamativo
    borderColor: '#FFEB3B',
    borderWidth: 1,
  },
  notificationTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2,
  },
  notificationDesc: {
    fontSize: 14,
    color: '#555',
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