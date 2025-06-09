import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, useColorScheme, View } from 'react-native';




const windowWidth = Dimensions.get('window').width;

interface RatingBarProps {
  rating: number;
  percentage: number;
}

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

  const RatingBar = ({ rating, percentage }: RatingBarProps) => (
    <View style={styles.ratingBarContainer}>
      <ThemedText style={styles.ratingNumber}>{rating}</ThemedText>
      <View style={styles.ratingBarWrapper}>
        <View style={[styles.ratingBar, { width: `${percentage}%` }]} />
      </View>
      <ThemedText style={styles.ratingPercentage}>{percentage}%</ThemedText>
    </View>
  );

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
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color={Colors[theme].text} />
          </TouchableOpacity>
        </View>

        <View style={styles.imagePlaceholder}>
          <ThemedText>Imagen de la cancha</ThemedText>
        </View>

        <View style={styles.content}>
          <ThemedText style={styles.title}>Cancha Los Amigos</ThemedText>
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={20} color={Colors[theme].text} />
            <ThemedText style={styles.address}>Av. Belgrano 1234, Catamarca</ThemedText>
          </View>

          <View style={styles.infoSection}>
            <View style={styles.infoItem}>
              <Ionicons name="football-outline" size={20} color={Colors[theme].text} />
              <ThemedText style={styles.infoText}>Fútbol</ThemedText>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="time-outline" size={20} color={Colors[theme].text} />
              <ThemedText style={styles.infoText}>8:00 AM - 10:00 PM</ThemedText>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="cash-outline" size={20} color={Colors[theme].text} />
              <ThemedText style={styles.infoText}>$50/hora</ThemedText>
            </View>
          </View>

          <View style={styles.ratingsSection}>
            <View style={styles.ratingsSummary}>
              <View style={styles.overallRating}>
                <ThemedText style={styles.ratingNumber}>4.5</ThemedText>
                <View style={styles.starsContainer}>
                  {[...Array(5)].map((_, i) => (
                    <Ionicons
                      key={i}
                      name={i < 4 ? "star" : "star-half"}
                      size={20}
                      color={Colors[theme].tint}
                    />
                  ))}
                </View>
                <ThemedText style={styles.totalReviews}>120 reviews</ThemedText>
              </View>
              <View style={styles.ratingBars}>
                <RatingBar rating={5} percentage={40} />
                <RatingBar rating={4} percentage={30} />
                <RatingBar rating={3} percentage={15} />
                <RatingBar rating={2} percentage={10} />
                <RatingBar rating={1} percentage={5} />
              </View>
            </View>

            <View style={styles.reviewsSection}>
              <Review
                user="Lucas"
                rating={5}
                date="Hace 2 semanas"
                comment="Excelente cancha, bien mantenida y perfecta para un partido entre amigos."
                likes={10}
                replies={2}
              />
              <Review
                user="Sofía"
                rating={4}
                date="Hace 1 mes"
                comment="Buena experiencia en general, pero la iluminación podría mejorar."
                likes={5}
                replies={1}
              />
            </View>

            <View style={styles.locationSection}>
              <ThemedText style={styles.sectionTitle}>Ubicación</ThemedText>
              <View style={styles.mapPlaceholder}>
                <ThemedText>Mapa del predio</ThemedText>
              </View>
            </View>
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
  ratingsSection: {
    marginBottom: 24,
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
  ratingBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  totalReviews: {
    fontSize: 14,
    color: '#666',
  },
  ratingBarWrapper: {
    flex: 1,
    height: 4,
    backgroundColor: '#E1E1E1',
    marginHorizontal: 8,
    borderRadius: 2,
  },
  ratingBar: {
    height: '100%',
    backgroundColor: Colors.light.tint,
    borderRadius: 2,
  },
  ratingPercentage: {
    fontSize: 12,
    width: 30,
  },
  reviewsSection: {
    marginBottom: 24,
  },
  reviewContainer: {
    marginBottom: 16,
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
});