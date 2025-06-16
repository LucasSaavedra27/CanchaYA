import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, TouchableOpacity, useColorScheme, View } from 'react-native';


interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  image: string;
}

const StatCard = ({ title, value, subtitle, image }: StatCardProps) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';

  return (
    <View style={[styles.statCard, { backgroundColor: Colors[theme].background }]}>
      <View style={styles.statInfo}>
        <ThemedText style={styles.statTitle}>{title}</ThemedText>
        <ThemedText style={styles.statValue}>{value}</ThemedText>
        <ThemedText style={styles.statSubtitle}>{subtitle}</ThemedText>
      </View>
      <View style={styles.statImageContainer}>
        <View style={styles.imagePlaceholder}>
          {image === 'field' && <Ionicons name="football-outline" size={24} color={Colors[theme].text} />}
          {image === 'money' && <Ionicons name="cash-outline" size={24} color={Colors[theme].text} />}
          {image === 'calendar' && <Ionicons name="calendar-outline" size={24} color={Colors[theme].text} />}
        </View>
      </View>
    </View>
  );
};

interface BarProps {
  height: number;
  day: string;
}

const Bar = ({ height, day }: BarProps) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';

  return (
    <View style={styles.barContainer}>
      <View style={[styles.bar, { height: `${height}%`, backgroundColor: Colors[theme].tint }]} />
      <ThemedText style={styles.barLabel}>{day}</ThemedText>
    </View>
  );
};

export default function DashboardScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>Dashboard</ThemedText>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color={Colors[theme].text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <ThemedText style={styles.sectionTitle}>Resumen diario</ThemedText>
          
          <View style={styles.statsGrid}>
            <StatCard
              title="Total reservas"
              value="12"
              subtitle="Reservas diarias"
              image="field"
            />
            <StatCard
              title="Ingresos estimados"
              value="$3,600"
              subtitle="Ganancias potenciales"
              image="money"
            />
            <StatCard
              title="Turnos disponibles"
              value="8"
              subtitle="Franjas horarias abiertas para reservas"
              image="calendar"
            />
          </View>

          <View style={styles.weeklyActivity}>
            <View style={styles.weeklyHeader}>
              <ThemedText style={styles.sectionTitle}>Actividad semanal</ThemedText>
              <View style={styles.weeklyStats}>
                <ThemedText style={styles.bookingsNumber}>45</ThemedText>
                <ThemedText style={styles.bookingsLabel}>
                  Últimos 7 días <ThemedText style={styles.positiveChange}>+15%</ThemedText>
                </ThemedText>
              </View>
            </View>

            <View style={styles.chart}>
              <Bar height={20} day="Lun" />
              <Bar height={80} day="Mar" />
              <Bar height={30} day="Mie" />
              <Bar height={90} day="Jue" />
              <Bar height={70} day="Vie" />
              <Bar height={40} day="Sab" />
              <Bar height={60} day="Dom" />
            </View>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  statsGrid: {
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statInfo: {
    flex: 1,
  },
  statTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  statImageContainer: {
    marginLeft: 16,
  },
  imagePlaceholder: {
    width: 48,
    height: 48,
    backgroundColor: '#E1E1E1',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  weeklyActivity: {
    backgroundColor: Colors.light.background,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  weeklyHeader: {
    marginBottom: 24,
  },
  weeklyStats: {
    marginTop: 8,
  },
  bookingsNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bookingsLabel: {
    fontSize: 14,
    color: '#666',
  },
  positiveChange: {
    color: '#44AA44',
    fontWeight: '600',
  },
  chart: {
    height: 200,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingVertical: 16,
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bar: {
    width: 24,
    borderRadius: 12,
    marginBottom: 8,
  },
  barLabel: {
    fontSize: 12,
    color: '#666',
  },
});
