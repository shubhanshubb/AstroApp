import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, ScrollView } from 'react-native';
import {
  LiquidGlassView,
  LiquidGlassContainerView,
  isLiquidGlassSupported,
} from '@callstack/liquid-glass';
import { Bell, Moon, Gear } from 'phosphor-react-native';

const Setting = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const SettingItem = ({
    IconComponent,
    title,
    switchValue,
    onSwitchChange,
  }) => (
    <LiquidGlassView
      style={[
        styles.settingItem,
        !isLiquidGlassSupported && {
          backgroundColor: 'rgba(0, 212, 170, 0.08)',
        },
      ]}
      effect="clear"
      interactive={false}
    >
      <View style={styles.row}>
        <View style={styles.rowLeft}>
          <IconComponent size={22} color="#00D4AA" weight="bold" />
          <Text style={styles.title}>{title}</Text>
        </View>
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          trackColor={{ false: '#666', true: '#00D4AA' }}
          thumbColor="#fff"
        />
      </View>
    </LiquidGlassView>
  );

  return (
    <View style={styles.container}>
      <LiquidGlassContainerView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <Text style={styles.header}>Settings</Text>

          <SettingItem
            IconComponent={Bell}
            title="Notifications"
            switchValue={notifications}
            onSwitchChange={setNotifications}
          />

          <SettingItem
            IconComponent={Moon}
            title="Dark Mode"
            switchValue={darkMode}
            onSwitchChange={setDarkMode}
          />

          <LiquidGlassView
            style={[
              styles.settingItem,
              !isLiquidGlassSupported && {
                backgroundColor: 'rgba(0, 212, 170, 0.08)',
              },
            ]}
            effect="clear"
            interactive={false}
          >
            <View style={styles.row}>
              <View style={styles.rowLeft}>
                <Gear size={22} color="#00D4AA" weight="bold" />
                <Text style={styles.title}>App Info</Text>
              </View>
              <Text style={styles.subtitle}>v1.0.0</Text>
            </View>
          </LiquidGlassView>
        </ScrollView>
      </LiquidGlassContainerView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  scroll: { padding: 20, gap: 16 },
  header: { fontSize: 24, fontWeight: '600', color: '#fff', marginBottom: 10 },
  settingItem: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,212,170,0.15)',
    padding: 16,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  title: { fontSize: 16, fontWeight: '500', color: '#fff' },
  subtitle: { fontSize: 14, color: '#aaa' },
});

export default Setting;
