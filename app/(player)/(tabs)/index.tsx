import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';

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
  const SportItem = ({ sport, name, time, price }: SportItemProps) => (
    <TouchableOpacity 
      style={[
        styles.sportCard,
        { backgroundColor: Colors[theme].background }
      ]}
      onPress={() => router.push('/field-details')}
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
        <View style={[styles.imagePlaceholder, { backgroundColor: Colors[theme].buttonBorder }]} />
      </View>
    </TouchableOpacity>
  );

  const getSportEmoji = (sport: string) => {
    switch (sport.toLowerCase()) {
      case 'fútbol':
        return '⚽';
      case 'tenis':
        return '🎾';
      case 'pádel':
        return '🎾';
      default:
        return '🏅';
    }
  };

  const FilterChip = ({ label, isSelected }: FilterChipProps) => (
    <TouchableOpacity 
      style={[
        styles.chipButton,
        { 
          backgroundColor: isSelected ? Colors[theme].tint : Colors[theme].background,
          borderColor: isSelected ? Colors[theme].tint : Colors[theme].buttonBorder
        }
      ]}
    >
      <ThemedText style={[
        styles.chipText,
        { color: isSelected ? '#FFFFFF' : Colors[theme].text }
      ]}>
        {label}
      </ThemedText>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <View>
          <ThemedText style={styles.greeting}>
            <ThemedText>Hola, </ThemedText>
            <ThemedText>Mateo</ThemedText>
          </ThemedText>
        </View>
        <TouchableOpacity>
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
        <FilterChip label="Deporte" isSelected />
        <FilterChip label="Precio" />
        <FilterChip label="Horario" />
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <SportItem 
          sport="Fútbol"
          name="Cancha Los Amigos"
          time="18:00 - 20:00"
          price="2500"
        />
        <SportItem 
          sport="Tenis"
          name="Club Central"
          time="17:00 - 19:00"
          price="2000"
        />
        <SportItem 
          sport="Pádel"
          name="Pádel Catamarca"
          time="19:00 - 21:00"
          price="1800"
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
});
