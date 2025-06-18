import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, TouchableOpacity, useColorScheme, View } from 'react-native';

// --- Constantes para la configuración del picker de horas ---
const ITEM_HEIGHT = 50; // Altura de cada elemento de la hora
const VISIBLE_ITEMS_IN_VIEW = 3; // Cuántos ítems de hora son visibles en el contenedor
// Calcula el padding necesario para que el ítem central sea el seleccionado
const PADDING_FOR_CENTRAL_ITEM = ITEM_HEIGHT * (VISIBLE_ITEMS_IN_VIEW - 1) / 2;

export default function BookingFormScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';

  // --- Estados para el calendario y selecciones ---
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); // 0-11
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState<number | null>(new Date().getDate());
  const [selectedHour, setSelectedHour] = useState(1); // Hora seleccionada (1-12)
  const [selectedTimeAMPM, setSelectedTimeAMPM] = useState('AM');
  const [selectedDuration, setSelectedDuration] = useState(1);
  const [paymentOption, setPaymentOption] = useState('full');
  const [selectedCancha, setSelectedCancha] = useState(1);

  // Referencia para el ScrollView de las horas
  const hourScrollViewRef = useRef<ScrollView>(null);

  // --- Lógica del calendario ---
  const monthYearString = useMemo(() => {
    return new Date(currentYear, currentMonth).toLocaleString('es-ES', {
      month: 'long',
      year: 'numeric',
    });
  }, [currentMonth, currentYear]);

  const daysOfWeek = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];

  const daysInMonth = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
    const tempDaysInMonth = [];
    for (let i = 0; i < firstDay; i++) {
      tempDaysInMonth.push({ day: null, date: null });
    }
    for (let i = 1; i <= lastDay; i++) {
      tempDaysInMonth.push({
        day: daysOfWeek[new Date(currentYear, currentMonth, i).getDay()],
        date: i
      });
    }
    return tempDaysInMonth;
  }, [currentMonth, currentYear]);

  const changeMonth = (increment: number) => {
    let newMonth = currentMonth + increment;
    let newYear = currentYear;
    if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    } else if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    }
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
    setSelectedDate(null);
  };

  const hoursOptions = Array.from({ length: 12 }, (_, i) => i + 1); // Horas del 1 al 12
  const timeAMPMOptions = ['AM', 'PM'];
  const durationOptions = [1, 2, 3];

  // Función para desplazar a la hora seleccionada
  const scrollToSelectedHour = useCallback((hour: number, animated: boolean = true) => {
    const index = hoursOptions.indexOf(hour);
    if (index !== -1 && hourScrollViewRef.current) {
      hourScrollViewRef.current.scrollTo({
        y: index * ITEM_HEIGHT,
        animated: animated,
      });
    }
  }, [hoursOptions]);

  // Efecto para sincronizar el scroll al iniciar y cuando selectedHour cambie
  useEffect(() => {
    scrollToSelectedHour(selectedHour, false); // Desplaza a la hora inicial sin animación al cargar
  }, [selectedHour, scrollToSelectedHour]);

  // Función para manejar el final del scroll y actualizar la hora seleccionada
  const handleScrollEnd = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / ITEM_HEIGHT); // Redondea al ITEM_HEIGHT más cercano
    const hour = hoursOptions[index];
    if (hour !== undefined) {
      setSelectedHour(hour);
    }
  }, [hoursOptions]);


  const renderCalendarDay = (item: { day: string | null; date: number | null }, index: number) => {
    if (item.date === null) {
      return <View key={`empty-${index}`} style={styles.calendarDayEmpty} />;
    }
    const isSelected = item.date === selectedDate;
    return (
      <TouchableOpacity
        key={`day-${item.date}-${index}`}
        style={[
          styles.calendarDay,
          isSelected && { backgroundColor: Colors[theme].tint }
        ]}
        onPress={() => setSelectedDate(item.date)}
      >
        <ThemedText
          style={[
            styles.calendarDayText,
            isSelected && { color: '#FFFFFF' }
          ]}
        >
          {item.date}
        </ThemedText>
      </TouchableOpacity>
    );
  };

  const renderHourItem = (hour: number) => {
    const isSelected = hour === selectedHour;
    return (
      // TouchableOpacity permite al usuario tanto deslizar como tocar para seleccionar
      <TouchableOpacity
        key={hour}
        style={[
          styles.hourScrollItem,
          isSelected && { backgroundColor: Colors[theme].tint }
        ]}
        // Al tocar un elemento, actualiza la hora seleccionada y desplaza el scroll
        onPress={() => {
          setSelectedHour(hour);
          scrollToSelectedHour(hour); // Desplaza suavemente al elemento tocado
        }}
      >
        <ThemedText
          style={[
            styles.hourScrollText,
            isSelected && { color: '#FFFFFF' }
          ]}
        >
          {hour < 10 ? `0${hour}` : hour}:00
        </ThemedText>
      </TouchableOpacity>
    );
  };


  // --- DEFINICIÓN DE STYLES dentro del componente con useMemo para adaptabilidad a tema ---
  const styles = useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollView: {
      flex: 1,
    },
    content: {
      padding: 16,
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    calendarHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    monthText: {
      fontSize: 16,
      fontWeight: '600',
    },
    daysOfWeekContainer: {
      flexDirection: 'row',
      marginBottom: 8,
    },
    dayOfWeekItem: {
      flex: 1,
      alignItems: 'center',
    },
    dayOfWeekText: {
      fontSize: 14,
      fontWeight: '500',
    },
    calendarGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    calendarDay: {
      width: '14.28%', // 100% / 7 días
      aspectRatio: 1, // Hace que sea un cuadrado
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 8,
      borderRadius: 20,
      backgroundColor: Colors[theme].background,
    },
    calendarDayEmpty: {
      width: '14.28%',
      aspectRatio: 1,
    },
    calendarDayText: {
      fontSize: 16,
    },
    timeSelectionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: ITEM_HEIGHT * VISIBLE_ITEMS_IN_VIEW, // Altura total del contenedor del picker
      borderWidth: 1,
      borderColor: Colors[theme].border,
      borderRadius: 12,
      overflow: 'hidden', // Importante para recortar el contenido que excede el contenedor
    },
    hourPickerContainer: {
      width: '50%', // Ancho para el picker de horas
      height: '100%',
      justifyContent: 'center', // Centra el contenido verticalmente
      // backgroundColor: 'rgba(255,0,0,0.1)', // Para depuración: ver el área del contenedor
    },
    hourScrollViewContent: {
      paddingVertical: PADDING_FOR_CENTRAL_ITEM, // Padding para que el ítem seleccionado esté al centro
      alignItems: 'center', // Centra horizontalmente los ítems de la hora
    },
    hourScrollItem: {
      height: ITEM_HEIGHT,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%', // Asegura que el ítem ocupa todo el ancho disponible
      backgroundColor: Colors[theme].background, // Color de fondo para ítems no seleccionados
    },
    hourScrollText: {
      fontSize: 20,
      fontWeight: '600',
      color: Colors[theme].text,
    },
    ampmContainer: {
      width: '45%', // Ancho para los botones AM/PM
      flexDirection: 'column',
      justifyContent: 'space-around', // Distribuye AM/PM verticalmente
      paddingHorizontal: 10,
    },
    ampmOption: {
      flex: 1, // Para que ocupen el espacio disponible equitativamente
      paddingVertical: 10,
      borderRadius: 8,
      backgroundColor: Colors[theme].background,
      borderWidth: 1,
      borderColor: Colors[theme].border,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 4, // Espacio entre AM y PM
    },
    ampmOptionText: {
      fontSize: 16,
      fontWeight: '500',
      color: Colors[theme].text,
    },
    durationContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    durationOption: {
      flex: 1,
      paddingVertical: 12,
      paddingHorizontal: 15,
      borderRadius: 10,
      backgroundColor: Colors[theme].background,
      borderWidth: 1,
      borderColor: Colors[theme].border,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 4,
    },
    durationOptionLast: {
      marginRight: 0,
    },
    durationOptionText: {
      fontSize: 16,
      fontWeight: '500',
      color: Colors[theme].text,
    },
    paymentOption: {
      borderWidth: 1,
      borderColor: Colors[theme].border,
      borderRadius: 12,
      marginBottom: 12,
      overflow: 'hidden',
    },
    paymentOptionContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
    },
    paymentOptionTitle: {
      fontSize: 16,
      fontWeight: '600',
    },
    paymentOptionDescription: {
      fontSize: 14,
      color: Colors[theme].tabIconDefault,
    },
    radioContainer: {
      width: 24,
      height: 24,
      justifyContent: 'center',
      alignItems: 'center',
    },
    radioOuter: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: Colors[theme].icon,
      justifyContent: 'center',
      alignItems: 'center',
    },
    radioOuterSelected: {
      borderColor: Colors[theme].tint,
    },
    radioInner: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: Colors[theme].tint,
    },
    pointsSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
      marginTop: 24,
      paddingHorizontal: 10,
      paddingVertical: 10,
      backgroundColor: Colors[theme].background,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: Colors[theme].border,
    },
    pointsText: {
      fontSize: 16,
      fontWeight: '500',
    },
    pointsValue: {
      fontSize: 16,
      fontWeight: '600',
      color: Colors[theme].tint,
    },
    bottomSpacer: {
      height: 80,
    },
    bottomButton: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: 16,
      backgroundColor: Colors[theme].background,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderColor: Colors[theme].border,
    },
    confirmButton: {
      backgroundColor: Colors[theme].tint,
      padding: 16,
      borderRadius: 12,
      alignItems: 'center',
    },
    confirmButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
  }), [theme]);

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{
        title: "Reservar Cancha",
        headerShown: true,
        headerStyle: {
          backgroundColor: Colors[theme].background,
        },
        headerTintColor: Colors[theme].text,
      }} />

      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {/* Sección de selección de fecha */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Seleccionar Fecha</ThemedText>

            <View style={styles.calendarHeader}>
              <TouchableOpacity onPress={() => changeMonth(-1)}>
                <Ionicons name="chevron-back" size={24} color={Colors[theme].text} />
              </TouchableOpacity>

              <ThemedText style={styles.monthText}>{monthYearString}</ThemedText>

              <TouchableOpacity onPress={() => changeMonth(1)}>
                <Ionicons name="chevron-forward" size={24} color={Colors[theme].text} />
              </TouchableOpacity>
            </View>

            {/* Días de la semana */}
            <View style={styles.daysOfWeekContainer}>
              {daysOfWeek.map((day, index) => (
                <View key={index} style={styles.dayOfWeekItem}>
                  <ThemedText style={styles.dayOfWeekText}>{day}</ThemedText>
                </View>
              ))}
            </View>

            {/* Días del mes */}
            <View style={styles.calendarGrid}>
              {daysInMonth.map((item, index) => renderCalendarDay(item, index))}
            </View>
          </View>

          {/* Sección de selección de hora */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Seleccionar Hora</ThemedText>

            <View style={styles.timeSelectionContainer}>
              {/* Contenedor del picker de horas */}
              <View style={styles.hourPickerContainer}>
                <ScrollView
                  ref={hourScrollViewRef}
                  showsVerticalScrollIndicator={false}
                  snapToInterval={ITEM_HEIGHT}
                  decelerationRate="fast"
                  onMomentumScrollEnd={handleScrollEnd}
                  scrollEnabled={true}
                  nestedScrollEnabled={true} // <- importante para Android
                  keyboardShouldPersistTaps="handled"
                  contentContainerStyle={[
                    styles.hourScrollViewContent,
                    { minHeight: ITEM_HEIGHT * (hoursOptions.length + 2) } // padding extra arriba/abajo
                  ]}
                >
                  {hoursOptions.map((hour) => renderHourItem(hour))}
                </ScrollView>
              </View>

              {/* Contenedor para AM/PM */}
              <View style={styles.ampmContainer}>
                {timeAMPMOptions.map((period, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.ampmOption,
                      selectedTimeAMPM === period && { backgroundColor: Colors[theme].tint }
                    ]}
                    onPress={() => setSelectedTimeAMPM(period)}
                  >
                    <ThemedText
                      style={[
                        styles.ampmOptionText,
                        selectedTimeAMPM === period && { color: '#FFFFFF' }
                      ]}
                    >
                      {period}
                    </ThemedText>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* Sección de duración */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Duración</ThemedText>

            <View style={styles.durationContainer}>
              {durationOptions.map((duration, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.durationOption,
                    selectedDuration === duration && { backgroundColor: Colors[theme].tint }
                  ]}
                  onPress={() => setSelectedDuration(duration)}
                >
                  <ThemedText
                    style={[
                      styles.durationOptionText,
                      selectedDuration === duration && { color: '#FFFFFF' }
                    ]}
                  >
                    {duration} {duration === 1 ? 'Hora' : 'Horas'}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Sección de selección de cancha */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Seleccionar Cancha</ThemedText>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              {[1, 2, 3].map((cancha) => (
                <TouchableOpacity
                  key={cancha}
                  style={[
                    styles.durationOption,
                    selectedCancha === cancha && { backgroundColor: Colors[theme].tint }
                  ]}
                  onPress={() => setSelectedCancha(cancha)}
                >
                  <ThemedText
                    style={[
                      styles.durationOptionText,
                      selectedCancha === cancha && { color: '#fff' }
                    ]}
                  >
                    Cancha {cancha}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Sección de pago */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Pago</ThemedText>

            <TouchableOpacity
              style={styles.paymentOption}
              onPress={() => setPaymentOption('full')}
            >
              <View style={styles.paymentOptionContent}>
                <View>
                  <ThemedText style={styles.paymentOptionTitle}>Pago Completo</ThemedText>
                  <ThemedText style={styles.paymentOptionDescription}>Pagar el monto total ahora</ThemedText>
                </View>
                <View style={styles.radioContainer}>
                  <View style={[styles.radioOuter, paymentOption === 'full' && styles.radioOuterSelected]}>
                    {paymentOption === 'full' && <View style={styles.radioInner} />}
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.paymentOption}
              onPress={() => setPaymentOption('deposit')}
            >
              <View style={styles.paymentOptionContent}>
                <View>
                  <ThemedText style={styles.paymentOptionTitle}>Depósito</ThemedText>
                  <ThemedText style={styles.paymentOptionDescription}>Pagar un depósito ahora, y el resto en la cancha</ThemedText>
                </View>
                <View style={styles.radioContainer}>
                  <View style={[styles.radioOuter, paymentOption === 'deposit' && styles.radioOuterSelected]}>
                    {paymentOption === 'deposit' && <View style={styles.radioInner} />}
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* Sección de puntos */}
          <View style={styles.pointsSection}>
            <ThemedText style={styles.pointsText}>Ganar Puntos</ThemedText>
            <ThemedText style={styles.pointsValue}>+50</ThemedText>
          </View>

          {/* Espacio para que el botón no tape contenido */}
          <View style={styles.bottomSpacer} />
        </View>
      </ScrollView>

      {/* Botón de confirmar reserva */}
      <View style={styles.bottomButton}>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => {
            console.log("Fecha seleccionada:", selectedDate);
            console.log("Hora seleccionada:", `${selectedHour}:00 ${selectedTimeAMPM}`);
            console.log("Duración:", selectedDuration, "horas");
            console.log("Opción de pago:", paymentOption);
            // router.back();
          }}
        >
          <ThemedText style={styles.confirmButtonText}>Confirmar Reserva</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}
