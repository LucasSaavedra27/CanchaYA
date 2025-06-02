import { Image, StyleSheet, TouchableOpacity, View, useColorScheme } from 'react-native';
import { Stack, router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ThemedView style={styles.container}>
        <View style={styles.headerContainer}>
          <Image
            source={require('../assets/images/LOGO-prueba.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <ThemedText type="title" style={styles.title}>CanchaYA</ThemedText>
          <ThemedText style={[styles.subtitle, { color: Colors[theme].subtitle }]}>
            Reservar una cancha nunca fue tan fácil.
          </ThemedText>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: Colors[theme].googleButton,
                borderColor: Colors[theme].buttonBorder
              }
            ]}>
            <Ionicons
              name="logo-google"
              size={24}
              color={Colors[theme].text}
              style={styles.buttonIcon}
            />
            <ThemedText style={styles.buttonText}>Continuar con Google</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: Colors[theme].facebookButton,
                borderColor: Colors[theme].facebookButton
              }
            ]}>
            <Ionicons
              name="logo-facebook"
              size={24}
              color="#FFFFFF"
              style={styles.buttonIcon}
            />
            <ThemedText style={[styles.buttonText, styles.whiteText]}>Continuar con Facebook</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: Colors[theme].phoneButton,
                borderColor: Colors[theme].buttonBorder
              }
            ]}>
            <Ionicons
              name="phone-portrait-outline"
              size={24}
              color={Colors[theme].text}
              style={styles.buttonIcon}
            />
            <ThemedText style={styles.buttonText}>Continuar con Phone</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: Colors[theme].emailButton,
                borderColor: Colors[theme].emailButton
              }
            ]}>
            <ThemedText style={[styles.buttonText, styles.whiteText]}>Continuar con Email</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: Colors[theme].tint,
                borderColor: Colors[theme].tint
              }
            ]}
            onPress={() => router.replace('/(tabs)')}>
            <ThemedText style={[styles.buttonText, styles.whiteText]}>Continuar Prueba</ThemedText>
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <ThemedText>¿Ya tienes una cuenta?</ThemedText>
            <TouchableOpacity>
              <ThemedText style={{ color: Colors[theme].tint, fontWeight: '600' }}>Iniciar Sesión</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    gap: 12,
    marginBottom: 40,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  buttonIcon: {
    marginRight: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  whiteText: {
    color: '#FFFFFF',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
    marginTop: 8,
  },
});
