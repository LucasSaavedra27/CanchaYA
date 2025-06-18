import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { ColorScheme, ThemeColors } from '@/types/colors';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';

interface PaymentClient {
  name: string;
  phone: string;
  email: string;
}

interface PaymentBooking {
  fieldNumber: number;
  date: string;
  time: string;
  duration: number;
}

interface Payment {
  id: string;
  date: string;
  method: string;
  amount: number;
  status: 'completed' | 'pending';
  client: PaymentClient;
  booking: PaymentBooking;
  reference?: string;
  notes?: string;
}

type SortOrder = 'asc' | 'desc';
type FilterStatus = 'all' | 'completed' | 'pending';

interface FiltersState {
  search: string;
  status: FilterStatus;
  sortOrder: SortOrder;
}

interface StatusInfo {
  icon: string;
  color: string;
  text: string;
}

interface StylesProps {
  themeColors: ThemeColors;
}

// Datos de ejemplo
// Datos de ejemplo para mostrar la interfaz
const PAYMENTS: Payment[] = [
  {
    id: '1',
    date: '2024-07-26',
    method: 'MercadoPago',
    amount: 30000,
    status: 'completed',
    client: {
      name: 'Juan Pérez',
      phone: '099123456',
      email: 'juan@email.com'
    },
    booking: {
      fieldNumber: 1,
      date: '2024-07-26',
      time: '19:00',
      duration: 2,
    },
    reference: 'MP-123456',
    notes: 'Pago completado'
  },
  {
    id: '2',
    date: '2024-07-20',
    method: 'Efectivo',
    amount: 15000,
    status: 'pending',
    client: {
      name: 'María García',
      phone: '099789456',
      email: 'maria@email.com'
    },
    booking: {
      fieldNumber: 2,
      date: '2024-07-20',
      time: '20:00',
      duration: 1,
    },
    notes: 'Depósito pendiente - Seña del 50%'
  },
  {
    id: '3',
    date: '2024-07-15',
    method: 'MercadoPago',
    amount: 45000,
    status: 'completed',
    client: {
      name: 'Carlos López',
      phone: '099456123',
      email: 'carlos@email.com'
    },
    booking: {
      fieldNumber: 3,
      date: '2024-07-15',
      time: '21:00',
      duration: 3,
    },
    reference: 'MP-789012',
    notes: 'Reserva para torneo'
  }
];

const createStyles = ({ themeColors }: StylesProps) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.background,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 56,
      paddingBottom: 16,
      paddingHorizontal: 20,
      backgroundColor: themeColors.background,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.border,
    },
    backButton: {
      padding: 8,
      marginRight: 8,
      borderRadius: 20,
    },
    headerTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      flex: 1,
      textAlign: 'center',
      marginRight: 40,
      color: themeColors.text,
    },
    filtersContainer: {
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.border,
      backgroundColor: themeColors.background,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 8,
      backgroundColor: themeColors.background,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: themeColors.border,
      marginBottom: 12,
    },
    searchInput: {
      flex: 1,
      marginLeft: 8,
      fontSize: 16,
      color: themeColors.text,
    },
    filterOptions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    filterButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      backgroundColor: themeColors.background,
      borderWidth: 1,
      borderColor: themeColors.border,
    },
    filterButtonActive: {
      backgroundColor: themeColors.tint,
    },
    filterButtonActiveText: {
      color: '#FFFFFF',
    },
    filterButtonText: {
      fontSize: 14,
      fontWeight: '500',
      color: themeColors.text,
    },
    sortButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 8,
      borderRadius: 8,
      backgroundColor: themeColors.background,
      borderWidth: 1,
      borderColor: themeColors.border,
    },
    sortButtonText: {
      marginLeft: 8,
      fontSize: 14,
      fontWeight: '500',
      color: themeColors.text,
    },
    listContent: {
      paddingHorizontal: 20,
      paddingBottom: 40,
    },
    noResults: {
      textAlign: 'center',
      marginTop: 24,
      fontSize: 16,
      color: themeColors.tabIconDefault,
    },
    paymentRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 16,
      padding: 16,
      backgroundColor: themeColors.background,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: themeColors.border,
    },
    paymentInfo: {
      flex: 1,
    },
    paymentDate: {
      fontSize: 16,
      fontWeight: '600',
      color: themeColors.text,
      marginBottom: 4,
    },
    clientName: {
      fontSize: 14,
      color: themeColors.tabIconDefault,
      marginBottom: 8,
    },
    paymentMetaData: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    paymentMethod: {
      fontSize: 13,
      color: themeColors.tabIconDefault,
    },
    bookingInfo: {
      alignItems: 'flex-end',
    },
    fieldNumber: {
      fontSize: 13,
      color: themeColors.tabIconDefault,
      marginBottom: 4,
    },
    paymentAmount: {
      fontSize: 18,
      fontWeight: '600',
      color: themeColors.text,
    },
    modalOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    paymentDetails: {
      backgroundColor: themeColors.background,
      borderRadius: 16,
      width: '100%',
      maxHeight: '90%',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    detailsHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.border,
    },
    detailsTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: themeColors.text,
    },
    closeButton: {
      padding: 4,
    },
    detailsContent: {
      padding: 20,
    },
    detailsSection: {
      marginBottom: 24,
    },
    detailsSectionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: themeColors.tabIconDefault,
      marginBottom: 12,
    },
    detailsText: {
      fontSize: 15,
      color: themeColors.text,
      marginBottom: 8,
    },
    statusContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    statusBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      gap: 4,
    },
    statusText: {
      color: '#FFFFFF',
      fontSize: 12,
      fontWeight: '500',
    },
  });

export default function PaymentsHistoryScreen() {
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [filters, setFilters] = useState<FiltersState>({
    search: '',
    status: 'all',
    sortOrder: 'desc'
  });
  const scheme = useColorScheme();
  const theme: ColorScheme = scheme === 'dark' ? 'dark' : 'light';
  const themeColors = Colors[theme];

  const styles = useMemo(() => createStyles({ themeColors }), [themeColors]);

  const filteredPayments = useMemo(() => {
    let result = [...PAYMENTS];

    // Aplicar filtro de búsqueda
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(payment => 
        payment.client.name.toLowerCase().includes(searchLower) ||
        payment.id.toLowerCase().includes(searchLower) ||
        payment.method.toLowerCase().includes(searchLower)
      );
    }

    // Aplicar filtro de estado
    if (filters.status !== 'all') {
      result = result.filter(payment => payment.status === filters.status);
    }

    // Aplicar ordenamiento
    result.sort((a, b) => {
      const dateA = new Date(`${a.date}`).getTime();
      const dateB = new Date(`${b.date}`).getTime();
      return filters.sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [filters]);

  const formatDateTime = (date: string, time: string) => {
    return new Date(`${date} ${time}`).toLocaleString('es-ES', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatAmount = (amount: number) => {
    return amount.toLocaleString('es-ES', {
      style: 'currency',
      currency: 'ARG',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };

  const getStatusInfo = (status: Payment['status']): StatusInfo => {
    return {
      completed: {
        icon: 'checkmark-circle',
        color: '#4CAF50',
        text: 'Completado'
      },
      pending: {
        icon: 'time',
        color: '#FFC107',
        text: 'Pendiente'
      }
    }[status];
  };

  const renderFilters = () => (
    <View style={styles.filtersContainer}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={themeColors.tabIconDefault} />
        <TextInput
          value={filters.search}
          onChangeText={(text) => setFilters(prev => ({ ...prev, search: text }))}
          placeholder="Buscar pagos..."
          placeholderTextColor={themeColors.tabIconDefault}
          style={styles.searchInput}
        />
      </View>
      
      <View style={styles.filterOptions}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filters.status === 'all' && styles.filterButtonActive
          ]}
          onPress={() => setFilters(prev => ({ ...prev, status: 'all' }))}
        >
          <ThemedText style={[
            styles.filterButtonText,
            filters.status === 'all' && styles.filterButtonActiveText
          ]}>Todos</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filters.status === 'completed' && styles.filterButtonActive
          ]}
          onPress={() => setFilters(prev => ({ ...prev, status: 'completed' }))}
        >
          <ThemedText style={[
            styles.filterButtonText,
            filters.status === 'completed' && styles.filterButtonActiveText
          ]}>Completados</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filters.status === 'pending' && styles.filterButtonActive
          ]}
          onPress={() => setFilters(prev => ({ ...prev, status: 'pending' }))}
        >
          <ThemedText style={[
            styles.filterButtonText,
            filters.status === 'pending' && styles.filterButtonActiveText
          ]}>Pendientes</ThemedText>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.sortButton}
        onPress={() => setFilters(prev => ({
          ...prev,
          sortOrder: prev.sortOrder === 'desc' ? 'asc' : 'desc'
        }))}
      >
        <Ionicons
          name={filters.sortOrder === 'desc' ? 'arrow-down' : 'arrow-up'}
          size={20}
          color={themeColors.tabIconDefault}
        />
        <ThemedText style={styles.sortButtonText}>
          {filters.sortOrder === 'desc' ? 'Más recientes' : 'Más antiguos'}
        </ThemedText>
      </TouchableOpacity>
    </View>
  );

  const renderPaymentDetails = (payment: Payment) => {
    const statusInfo = getStatusInfo(payment.status);
    return (
      <View style={styles.paymentDetails}>
        <View style={styles.detailsHeader}>
          <ThemedText style={styles.detailsTitle}>Detalles del Pago</ThemedText>
          <TouchableOpacity 
            onPress={() => setSelectedPayment(null)}
            style={styles.closeButton}
          >
            <Ionicons name="close" size={24} color={themeColors.tabIconDefault} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.detailsContent}>
          {/* Información del Cliente */}
          <View style={styles.detailsSection}>
            <ThemedText style={styles.detailsSectionTitle}>Cliente</ThemedText>
            <ThemedText style={styles.detailsText}>Nombre: {payment.client.name}</ThemedText>
            <ThemedText style={styles.detailsText}>Teléfono: {payment.client.phone}</ThemedText>
            <ThemedText style={styles.detailsText}>Email: {payment.client.email}</ThemedText>
          </View>

          {/* Información de la Reserva */}
          <View style={styles.detailsSection}>
            <ThemedText style={styles.detailsSectionTitle}>Reserva</ThemedText>
            <ThemedText style={styles.detailsText}>Cancha: #{payment.booking.fieldNumber}</ThemedText>
            <ThemedText style={styles.detailsText}>
              Fecha y hora: {formatDateTime(payment.booking.date, payment.booking.time)}
            </ThemedText>
            <ThemedText style={styles.detailsText}>
              Duración: {payment.booking.duration} {payment.booking.duration === 1 ? 'hora' : 'horas'}
            </ThemedText>
          </View>

          {/* Información del Pago */}
          <View style={styles.detailsSection}>
            <ThemedText style={styles.detailsSectionTitle}>Pago</ThemedText>
            <ThemedText style={styles.detailsText}>Monto: {formatAmount(payment.amount)}</ThemedText>
            <ThemedText style={styles.detailsText}>Método: {payment.method}</ThemedText>
            <View style={styles.statusContainer}>
              <ThemedText style={styles.detailsText}>Estado: </ThemedText>
              <View style={[styles.statusBadge, { backgroundColor: statusInfo.color }]}>
                <Ionicons name={statusInfo.icon as any} size={16} color="#fff" />
                <ThemedText style={styles.statusText}>{statusInfo.text}</ThemedText>
              </View>
            </View>
            {payment.reference && (
              <ThemedText style={styles.detailsText}>Referencia: {payment.reference}</ThemedText>
            )}
          </View>

          {/* Notas */}
          {payment.notes && (
            <View style={styles.detailsSection}>
              <ThemedText style={styles.detailsSectionTitle}>Notas</ThemedText>
              <ThemedText style={styles.detailsText}>{payment.notes}</ThemedText>
            </View>
          )}
        </ScrollView>
      </View>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={themeColors.tabIconDefault} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Historial de pagos</ThemedText>
      </View>

      {renderFilters()}

      <ScrollView contentContainerStyle={styles.listContent}>
        {filteredPayments.length > 0 ? (
          filteredPayments.map((payment) => {
            const statusInfo = getStatusInfo(payment.status);
            return (
              <TouchableOpacity
                key={payment.id}
                style={styles.paymentRow}
                onPress={() => setSelectedPayment(payment)}
              >
                <View style={styles.paymentInfo}>
                  <ThemedText style={styles.paymentDate}>
                    {formatDateTime(payment.booking.date, payment.booking.time)}
                  </ThemedText>
                  <ThemedText style={styles.clientName}>{payment.client.name}</ThemedText>
                  <View style={styles.paymentMetaData}>
                    <ThemedText style={styles.paymentMethod}>{payment.method}</ThemedText>
                    <View style={[styles.statusBadge, { backgroundColor: statusInfo.color }]}>
                      <Ionicons name={statusInfo.icon as any} size={12} color="#fff" />
                      <ThemedText style={styles.statusText}>{statusInfo.text}</ThemedText>
                    </View>
                  </View>
                </View>
                <View style={styles.bookingInfo}>
                  <ThemedText style={styles.fieldNumber}>Cancha #{payment.booking.fieldNumber}</ThemedText>
                  <ThemedText style={styles.paymentAmount}>{formatAmount(payment.amount)}</ThemedText>
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <ThemedText style={styles.noResults}>
            No se encontraron pagos
          </ThemedText>
        )}
      </ScrollView>

      {selectedPayment && (
        <View style={styles.modalOverlay}>
          {renderPaymentDetails(selectedPayment)}
        </View>      )}
    </ThemedView>
  );
}
