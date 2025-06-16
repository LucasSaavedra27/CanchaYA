import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Dimensions, Image, Modal, ScrollView, StyleSheet, TouchableOpacity, useColorScheme, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';



const windowWidth = Dimensions.get('window').width;

interface ReviewProps {
  user: string;
  rating: number;
  date: string;
  comment: string;
  likes: number;
  replies: number;
}

export default function FieldDetailsScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';
  const { field } = useLocalSearchParams();

  // Datos ficticios de las canchas
  const fieldsData: any = {
    'MiCancha': {
      name: 'MiCancha',
      images: [
        require('@/assets/images/micancha1.png'),
        require('@/assets/images/micancha2.png'),
      ],
      address: 'Av. Virgen del Valle 734, Catamarca',
      sport: 'Fútbol',
      hours: '16:00 - 00:00',
      rating: 4.7,
      latitude: -28.468889, // Coordenada real de Av. Virgen del Valle 734
      longitude: -65.779167,
      reviews: [
        { user: 'Juan', rating: 5, date: '2025-06-01', comment: 'Excelente cancha, césped impecable.', likes: 3, replies: 1 },
        { user: 'Ana', rating: 4, date: '2025-06-10', comment: 'Muy buena atención.', likes: 2, replies: 0 },
      ]
    },
    'Leones': {
      name: 'Leones',
      images: [
        require('@/assets/images/leonesDetalle.png'),
        require('@/assets/images/leonesDetalle2.png'),
      ],
      address: 'Solidaridad y Altruismo 726, Catamarca',
      sport: 'Fútbol',
      hours: '16:00 - 01:00',
      rating: 4.5,
      latitude: -28.464167, // Coordenada real de Solidaridad y Altruismo 726
      longitude: -65.765278,
      reviews: [
        { user: 'Pedro', rating: 5, date: '2025-05-20', comment: 'Muy buen predio y ambiente.', likes: 4, replies: 2 },
        { user: 'Lucía', rating: 4, date: '2025-06-12', comment: 'Faltan más bancos.', likes: 1, replies: 0 },
      ]
    },
    'Luck Padel': {
      name: 'Luck Padel',
      images: [
        require('@/assets/images/luck1.png'),
        require('@/assets/images/luck2.png'),
      ],
      address: 'Av. Enrique Ocampo 768, Catamarca',
      sport: 'Pádel',
      hours: '10:00 - 00:00',
      rating: 4.8, 
      latitude: -28.470278, // Coordenada real de Av. Enrique Ocampo 768
      longitude: -65.782222,
      reviews: [
        { user: 'Marcos', rating: 5, date: '2025-06-05', comment: 'Las canchas de pádel son espectaculares.', likes: 5, replies: 1 },
        { user: 'Sofía', rating: 5, date: '2025-06-13', comment: 'Muy recomendable.', likes: 2, replies: 0 },
      ]
    },
    'Beach Voley': {
      name: 'Beach Voley',
      images: [
        require('@/assets/images/leonesv1.png'),
        require('@/assets/images/leonesv2.png'),
      ],
      address: 'Solidaridad y Altruismo 726, Catamarca',
      sport: 'Voley',
      hours: '16:00 - 01:00',
      price: '15.000',
      rating: 4.5,
      latitude: -28.464167, // Coordenada real de Solidaridad y Altruismo 726
      longitude: -65.765278,
      reviews: [
        { user: 'Martina', rating: 5, date: '2025-06-15', comment: 'Excelente cancha de voley, red y piso en perfecto estado.', likes: 5, replies: 1 },
        { user: 'Lucas', rating: 4, date: '2025-06-14', comment: 'Muy buen ambiente para jugar con amigos.', likes: 3, replies: 0 },
      ]
    }
  };

  const fieldData = fieldsData[field as string] || fieldsData['MiCancha'];
  // Para compatibilidad, si no hay array de imágenes, usar la imagen única
  const images = fieldData.images || [fieldData.image];

  const Review = ({ user, rating, date, comment, likes, replies }: ReviewProps) => (
    <View style={styles.reviewContainer}>
      <View style={styles.reviewHeader}>
        <View style={styles.userInfo}>
          <View style={styles.userAvatar}>
            <ThemedText>👤</ThemedText>
          </View>
          <View>
            <ThemedText style={styles.userName}>{user}</ThemedText>
            <View style={styles.ratingDateContainer}>
              <View style={styles.starsContainer}>
                {[...Array(5)].map((_, i) => (
                  <Ionicons
                    key={i}
                    name={i < rating ? "star" : "star-outline"}
                    size={14}
                    color={Colors[theme].tint}
                  />
                ))}
              </View>
              <ThemedText style={styles.reviewDate}>{date}</ThemedText>
            </View>
          </View>
        </View>
      </View>
      <ThemedText style={styles.reviewText}>{comment}</ThemedText>
      <View style={styles.reviewActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="thumbs-up-outline" size={16} color={Colors[theme].text} />
          <ThemedText style={styles.actionText}>{likes}</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble-outline" size={16} color={Colors[theme].text} />
          <ThemedText style={styles.actionText}>{replies}</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );

  const [expandedImage, setExpandedImage] = useState<any>(null);

  return (
    <ThemedView style={styles.container}>
        <Stack.Screen options={{
          title: "Detalle de la Cancha",
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors[theme].background,
          },
          headerTintColor: Colors[theme].text,
        }} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.imagePlaceholder}>
          <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={{ width: '100%', height: '100%' }}>
            {images.map((img: any, idx: number) => (
              <TouchableOpacity key={idx} activeOpacity={0.8} onPress={() => setExpandedImage(img)}>
                <Image source={img} style={{ width: windowWidth, height: '100%', borderRadius: 16, resizeMode: 'cover' }} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        {/* Modal para imagen expandida */}
        <Modal visible={!!expandedImage} transparent animationType="fade" onRequestClose={() => setExpandedImage(null)}>
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.95)', justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity style={{ position: 'absolute', top: 40, right: 20, zIndex: 11 }} onPress={() => setExpandedImage(null)}>
              <Ionicons name="close" size={36} color="#fff" />
            </TouchableOpacity>
            <ScrollView
              style={{ flex: 1 }}
              contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
              maximumZoomScale={3}
              minimumZoomScale={1}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              centerContent={true}
            >
              <Image source={expandedImage} style={{ width: windowWidth * 0.95, height: windowWidth * 1.1, resizeMode: 'contain', borderRadius: 16 }} />
            </ScrollView>
          </View>
        </Modal>
        <View style={styles.content}>
          <ThemedText style={styles.title}>{fieldData.name}</ThemedText>
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={20} color={Colors[theme].text} />
            <ThemedText style={styles.address}>{fieldData.address}</ThemedText>
          </View>
          <View style={styles.infoSection}>
            <View style={styles.infoItem}>
              <Ionicons name={fieldData.sport === 'Pádel' ? 'tennisball-outline' : 'football-outline'} size={20} color={Colors[theme].text} />
              <ThemedText style={styles.infoText}>{fieldData.sport}</ThemedText>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="time-outline" size={20} color={Colors[theme].text} />
              <ThemedText style={styles.infoText}>{fieldData.hours}</ThemedText>
            </View>
          </View>
          <View style={styles.ratingSection}>
            <View style={styles.ratingsSummary}>
              <View style={styles.overallRating}>
                <ThemedText style={styles.ratingNumber}>{fieldData.rating.toFixed(1)}</ThemedText>
                <View style={styles.starsContainer}>
                  {[...Array(5)].map((_, i) => (
                    <Ionicons
                      key={i}
                      name={i < Math.round(fieldData.rating) ? 'star' : 'star-outline'}
                      size={24}
                      color={Colors[theme].tint}
                    />
                  ))}
                </View>
                <ThemedText style={styles.totalReviews}>{fieldData.reviews.length} reseñas</ThemedText>
              </View>
              {/* Aquí puedes agregar barras de valoración si lo deseas */}
            </View>
          </View>
          <ThemedText style={styles.reviewsTitle}>Reseñas</ThemedText>
          {fieldData.reviews.map((review: any, idx: number) => (
            <Review key={idx} {...review} />
          ))}
          {/* Mapa del predio (Google Maps) */}
          <View style={{ width: '100%', height: 200, borderRadius: 16, overflow: 'hidden', marginTop: 24, marginBottom: 48, alignSelf: 'center' }}>
            <MapView
              style={{ flex: 1 }}
              initialRegion={{
                latitude: fieldData.latitude || -28.4696,
                longitude: fieldData.longitude || -65.7795,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker
                coordinate={{
                  latitude: fieldData.latitude || -28.4696,
                  longitude: fieldData.longitude || -65.7795,
                }}
                title={fieldData.name}
              />
            </MapView>
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomButton}>
        <TouchableOpacity 
          style={styles.bookButton}
          onPress={() => router.push('/booking-form')}
        >
          <ThemedText style={styles.bookButtonText}>Reservar</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    padding: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: '100%',
    height: 300,
    backgroundColor: '#E1E1E1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  address: {
    marginLeft: 4,
    fontSize: 16,
  },
  infoSection: {
    marginBottom: 24,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 16,
  },
  ratingSection: {
    marginBottom: 0,
  },
  ratingLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  reviewsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 0, // Reducido
    marginBottom: 12, // Reducido
  },
  ratingsSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  overallRating: {
    alignItems: 'center',
    flex: 1,
  },
  ratingBars: {
    flex: 2,
  },
  reviewsSection: {
    marginBottom: 24,
  },
  reviewContainer: {
    marginBottom: 24, // Aumenta el padding inferior entre reseñas y el usuario
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E1E1E1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
  },
  ratingDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewDate: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  reviewText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  reviewActions: {
    flexDirection: 'row',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  actionText: {
    marginLeft: 4,
    fontSize: 14,
  },
  locationSection: {
    marginBottom: 80,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  mapPlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: '#E1E1E1',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  bookButton: {
    backgroundColor: Colors.light.tint,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  ratingNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
    textAlign: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
    justifyContent: 'center',
  },
  totalReviews: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginTop: 2,
  },
});