import React, { useState, useReducer, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  Linking,
  Dimensions,
} from 'react-native';
import { Envelope, ChatCircle, MapPin } from 'phosphor-react-native';
import {
  LiquidGlassView,
  LiquidGlassContainerView,
  isLiquidGlassSupported,
} from '@callstack/liquid-glass';

const { width, height } = Dimensions.get('window');

// Form state reducer for better performance
const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SET_ERROR':
      return { ...state, emailError: action.error };
    case 'RESET_FORM':
      return { name: '', email: '', message: '', emailError: '' };
    default:
      return state;
  }
};

const Profile = () => {
  const [formState, dispatch] = useReducer(formReducer, {
    name: '',
    email: '',
    message: '',
    emailError: '',
  });

  const validateName = useCallback((text) => {
    const nameRegex = /^[a-zA-Z\s]*$/;
    const trimmedText = text.replace(/^\s+/, '').replace(/\s+/g, ' ');

    if (nameRegex.test(trimmedText)) {
      dispatch({ type: 'SET_FIELD', field: 'name', value: trimmedText });
    }
  }, []);

  const validateEmail = useCallback((text) => {
    dispatch({ type: 'SET_FIELD', field: 'email', value: text });
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(text)) {
      dispatch({ type: 'SET_ERROR', error: '' });
    } else {
      dispatch({ type: 'SET_ERROR', error: 'Invalid email address' });
    }
  }, []);

  const handleMessageChange = useCallback((text) => {
    dispatch({ type: 'SET_FIELD', field: 'message', value: text });
  }, []);

  const resetForm = useCallback(() => {
    dispatch({ type: 'RESET_FORM' });
  }, []);

  const handleSubmit = async () => {
    if (!formState.name || !formState.email || !formState.message || formState.emailError) {
      Alert.alert('Error', 'Please fill all fields correctly');
      return;
    }

    try {
      // Simulate API call
      Alert.alert('Success', 'Message sent successfully!');
      resetForm();
    } catch (error) {
      Alert.alert('Error', 'Failed to send message');
    }
  };

  const handleEmailPress = () => {
    Linking.openURL('mailto:connect@shubhanshubb.dev');
  };

  const handleWhatsAppPress = () => {
    Linking.openURL('https://api.whatsapp.com/send?phone=918809848399');
  };

  const handleLocationPress = () => {
    Linking.openURL('https://maps.app.goo.gl/DWT24LGpUgX8qMdT7');
  };

  const ContactCard = ({ IconComponent, title, subtitle, onPress, style = {} }) => (
    <TouchableOpacity onPress={onPress}>
      <LiquidGlassView
        style={[
          styles.contactCard,
          !isLiquidGlassSupported && { backgroundColor: 'rgba(0, 212, 170, 0.1)' },
          style
        ]}
        interactive
        effect="clear"
      >
        <View style={styles.iconContainer}>
          <IconComponent size={22} color="#00D4AA" weight="bold" />
        </View>
        <Text style={styles.contactTitle}>{title}</Text>
        <Text style={styles.contactSubtitle}>{subtitle}</Text>
      </LiquidGlassView>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Image
              source={{
                uri: 'https://shubhanshubb.dev/assets/SB_Avatar.png'
              }}
              style={styles.avatar}
              resizeMode="cover"
            />
          </View>
          <Text style={styles.name}>Shubhanshu Barnwal</Text>
          <Text style={styles.title}>App Developer</Text>
        </View>

        {/* Get In Touch Section */}
        <View style={styles.getInTouchSection}>
          <Text style={styles.getInTouchText}>Get In Touch</Text>
        </View>

        {/* Contact Cards */}
        <View style={styles.contactSection}>
          <View style={styles.contactCardsContainer}>
            <ContactCard
              IconComponent={Envelope}
              title="Email"
              subtitle="Mail me"
              onPress={handleEmailPress}
            />
            <ContactCard
              IconComponent={ChatCircle}
              title="WhatsApp"
              subtitle="Dm Hey!"
              onPress={handleWhatsAppPress}
            />
            <ContactCard
              IconComponent={MapPin}
              title="Location"
              subtitle="Bengaluru, IN"
              onPress={handleLocationPress}
            />
          </View>

          {/* Contact Form */}
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <LiquidGlassView
                style={[
                  styles.inputGlass,
                  !isLiquidGlassSupported && { backgroundColor: 'rgba(0, 212, 170, 0.05)' }
                ]}
                interactive
                effect="clear"
              >
                <TextInput
                  style={styles.input}
                  placeholder="Your Name"
                  placeholderTextColor="#B0B0B0"
                  value={formState.name}
                  onChangeText={validateName}
                />
              </LiquidGlassView>
            </View>

            <View style={styles.inputContainer}>
              <LiquidGlassView
                style={[
                  styles.inputGlass,
                  !isLiquidGlassSupported && { backgroundColor: 'rgba(0, 212, 170, 0.05)' }
                ]}
                interactive
                effect="clear"
              >
                <TextInput
                  style={styles.input}
                  placeholder="Your Email"
                  placeholderTextColor="#B0B0B0"
                  value={formState.email}
                  onChangeText={validateEmail}
                  keyboardType="email-address"
                />
              </LiquidGlassView>
              {formState.emailError ? (
                <Text style={styles.errorText}>{formState.emailError}</Text>
              ) : null}
            </View>

            <View style={styles.inputContainer}>
              <LiquidGlassView
                style={[
                  styles.inputGlass,
                  styles.messageInputGlass,
                  !isLiquidGlassSupported && { backgroundColor: 'rgba(0, 212, 170, 0.05)' }
                ]}
                interactive
                effect="clear"
              >
                <TextInput
                  style={[styles.input, styles.messageInput]}
                  placeholder="Your Message"
                  placeholderTextColor="#B0B0B0"
                  value={formState.message}
                  onChangeText={handleMessageChange}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </LiquidGlassView>
            </View>

            <TouchableOpacity
              onPress={handleSubmit}
              disabled={!formState.name || !formState.email || !formState.message || formState.emailError}
            >
              <LiquidGlassView
                style={[
                  styles.submitButton,
                  !isLiquidGlassSupported && { backgroundColor: '#00D4AA' },
                  (!formState.name || !formState.email || !formState.message || formState.emailError) && 
                  styles.submitButtonDisabled
                ]}
                interactive
                effect="clear"
              >
                <Text style={styles.submitButtonText}>Send Message</Text>
              </LiquidGlassView>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  avatarContainer: {
    borderRadius: 60,
    overflow: 'hidden',
    marginBottom: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 250,
    height: 250,
  },
  name: {
    fontSize: width > 400 ? 28 : 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  title: {
    fontSize: width > 400 ? 18 : 16,
    fontWeight: '500',
    color: '#00D4AA',
    textAlign: 'center',
  },
  getInTouchSection: {
    paddingVertical: 30,
    alignItems: 'center',
  },
  getInTouchText: {
    fontSize: width > 400 ? 20 : 18,
    fontWeight: '500',
    color: '#B0B0B0',
    letterSpacing: 0.5,
  },
  contactSection: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  contactCardsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    marginBottom: 40,
  },
  contactCard: {
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 170, 0.3)',
    borderRadius: 24,
    padding: 16,
    width: 'auto',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  iconContainer: {
    marginBottom: 8,
  },
  contactTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
    textAlign: 'center',
  },
  contactSubtitle: {
    fontSize: width > 400 ? 14 : 12,
    fontWeight: '500',
    color: '#00D4AA',
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    maxWidth: 500,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputGlass: {
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 170, 0.2)',
    borderRadius: 16,
    overflow: 'hidden',
  },
  messageInputGlass: {
    height: 120,
  },
  input: {
    padding: 16,
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '400',
    backgroundColor: 'transparent',
  },
  messageInput: {
    height: 120,
    paddingTop: 16,
  },
  errorText: {
    color: '#FF6B35',
    fontSize: 14,
    marginTop: 5,
    marginLeft: 5,
  },
  submitButton: {
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 100,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textTransform: 'none',
  },
});

export default Profile;