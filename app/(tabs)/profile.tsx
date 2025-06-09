import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Image, ScrollView, StyleSheet, TouchableOpacity, useColorScheme, View } from 'react-native';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';

  const FieldItem = ({ image, clubName, fieldName }: { image: any, clubName: string, fieldName: string }) => (
    <View style={styles.itemContainer}>
      <Image source={image} style={styles.fieldImage} />
      <View style={styles.itemTextContainer}>
        <ThemedText style={styles.itemTitle}>{clubName}</ThemedText>
        <ThemedText style={styles.itemSubtitle}>{fieldName}</ThemedText>
      </View>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>Mi Perfil</ThemedText>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color={Colors[theme].text} />
        </TouchableOpacity>
      </View>

      <View style={styles.profileContainer}>
      <Image 
        source={require('@/assets/images/avatar.png')} 
        style={styles.avatar} 
      />
        <ThemedText style={styles.name}>Lucas Ramirez</ThemedText>
        <ThemedText style={styles.points}>1200 Points</ThemedText>

        <TouchableOpacity style={[styles.editButton, { backgroundColor: Colors[theme].background }]}>
          <ThemedText style={styles.editText}>Editar Perfil</ThemedText>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.sectionContainer} showsVerticalScrollIndicator={false}>
        <ThemedText style={styles.sectionTitle}>Historial reservas</ThemedText>
        <FieldItem 
          image={require('@/assets/images/cancha1.png')} 
          clubName="F8" 
          fieldName="17/05/25 16:00hs - 17:00hs" 
        />
        <FieldItem 
          image={require('@/assets/images/cancha2.png')} 
          clubName="Mi Cancha" 
          fieldName="7/05/25 12:00hs - 13:00hs" 
        />
        <FieldItem 
          image={require('@/assets/images/cancha3.png')} 
          clubName="F5 9 de Julio" 
          fieldName="3/05/25 20:00hs - 21:00hs" 
        />

        <ThemedText style={styles.sectionTitle}>Favoritos</ThemedText>
        <FieldItem 
          image={require('@/assets/images/cancha2.png')} 
          clubName="Mi Cancha" 
          fieldName="Av. Belgrano 240" 
        />
        <FieldItem 
          image={require('@/assets/images/cancha3.png')} 
          clubName="F5 9 de Julio" 
          fieldName="Av. Virgen del Valle 123" 
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
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  editText: {
    fontSize: 14,
    fontWeight: '500',
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
});
