import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { Image, ScrollView, StyleSheet, View, useColorScheme } from 'react-native';


interface BookingCardProps {
  sport: string;
  fieldName: string;
  time: string;
  date: string;
  isPast: boolean;
}

const getSportEmoji = (sport: string) => {
  switch (sport.toLowerCase()) {
    case 'fútbol':
      return '⚽';
    case 'pádel':
      return '🎾';
    case 'voley':
      return '🏐';
    default:
      return '🏅';
  }
};

const BookingCard = ({ sport, fieldName, time, date, isPast }: BookingCardProps) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';
  let imageSource;
  if (fieldName === 'MiCancha') {
    imageSource = require('@/assets/images/micancha.png');
  } else if (fieldName === 'Leones') {
    imageSource = require('@/assets/images/leones.jpg');
  } else if (fieldName === 'Beach Voley') {
    imageSource = require('@/assets/images/leones.jpg');
  } else if (fieldName === 'Luck Padel') {
    imageSource = require('@/assets/images/luck.jpg');
  }
  return (
    <View style={[
      styles.card,
      { backgroundColor: Colors[theme].background }
    ]}>
      <View style={styles.cardContent}>
        <View style={styles.cardInfo}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <ThemedText style={styles.sportText}>{getSportEmoji(sport)} </ThemedText>
            <ThemedText style={styles.sportText}>{sport}</ThemedText>
          </View>
          <ThemedText style={styles.fieldName}>{fieldName}</ThemedText>
          <ThemedText style={styles.timeText}>{isPast ? `${date} ${time}hs` : time}</ThemedText>
          <View style={[
            styles.statusContainer,
            { backgroundColor: isPast ? '#FFE5E5' : '#E5FFE5' }
          ]}>
            <ThemedText style={[
              styles.statusText,
              { color: isPast ? '#FF4444' : '#44AA44' }
            ]}>
              {isPast ? 'Finalizada' : 'Próximamente'}
              {!isPast && ` · ${date}`}
            </ThemedText>
          </View>
        </View>
        {imageSource ? (
          <Image source={imageSource} style={styles.cardImage} />
        ) : (
          <View style={styles.imagePlaceholder} />
        )}
      </View>
    </View>
  );
};

const SAMPLE_BOOKINGS = [
  {
    id: '1',
    sport: 'Fútbol',
    fieldName: 'MiCancha',
    time: '20:00',
    date: 'Lunes 10/06',
    isPast: false,
  },
  {
    id: '2',
    sport: 'Fútbol',
    fieldName: 'Leones',
    time: '18:30',
    date: 'Miércoles 12/06',
    isPast: false,
  },
  {
    id: '5',
    sport: 'Pádel',
    fieldName: 'Luck Padel',
    time: '17:00',
    date: 'Martes 28/05',
    isPast: true,
  },
  {
    id: '3',
    sport: 'Voley',
    fieldName: 'Beach Voley',
    time: '19:00',
    date: 'Sábado 01/06',
    isPast: true,
  },
  {
    id: '4',
    sport: 'Fútbol',
    fieldName: 'MiCancha',
    time: '16:00',
    date: 'Viernes 30/05',
    isPast: true,
  },
];

export default function BookingsScreen() {
  // Separar reservas futuras y pasadas
  const upcomingBookings = SAMPLE_BOOKINGS.filter(booking => !booking.isPast);
  // Ordenar reservas finalizadas de más reciente a más antigua
  const pastBookings = SAMPLE_BOOKINGS.filter(booking => booking.isPast).sort((a, b) => {
    // Extraer fecha en formato dd/mm
    const parseDate = (dateStr: string) => {
      const match = dateStr.match(/(\d{2})\/(\d{2})/);
      if (!match) return 0;
      const day = parseInt(match[1]);
      const month = parseInt(match[2]);
      // Año fijo para mantener orden correcto
      return new Date(2025, month - 1, day).getTime();
    };
    return parseDate(b.date) - parseDate(a.date);
  });

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>Mis Reservas</ThemedText>
      </View>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {upcomingBookings.length > 0 && (
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Próximas</ThemedText>
            {upcomingBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                sport={booking.sport}
                fieldName={booking.fieldName}
                time={booking.time}
                date={booking.date}
                isPast={booking.isPast}
              />
            ))}
          </View>
        )}
        
        {pastBookings.length > 0 && (
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Finalizadas</ThemedText>
            {pastBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                sport={booking.sport}
                fieldName={booking.fieldName}
                time={booking.time}
                date={booking.date}
                isPast={booking.isPast}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#666',
  },  card: {
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardInfo: {
    flex: 1,
    marginRight: 12,
  },
  sportText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  fieldName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  timeText: {
    fontSize: 15,
    marginBottom: 8,
  },
  statusContainer: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '600',
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: '#E1E1E1',
    borderRadius: 12,
  },
  cardImage: {
    width: 80, // Aumentado
    height: 80, // Aumentado
    borderRadius: 16,
    marginLeft: 12,
    resizeMode: 'cover',
  },
});