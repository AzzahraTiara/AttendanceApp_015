import React from "react";
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function DetailScreen({ route }) {
  // PERBAIKAN: Terima parameter dengan nama "presensi" (sesuai HistoryScreen)
  const { presensi } = route.params;

  // Error handling jika data tidak ada
  if (!presensi) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.errorText}>Data tidak ditemukan</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Format tanggal
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.header}>
            <MaterialIcons name="assignment-turned-in" size={40} color="#0056b3" />
            <Text style={styles.title}>
              {presensi.namaMk || presensi.course || presensi.kodeMk || "Mata Kuliah"}
            </Text>
          </View>

          {/* Informasi Mata Kuliah */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informasi Mata Kuliah</Text>
            
            <View style={styles.row}>
              <Text style={styles.label}>Kode MK</Text>
              <Text style={styles.value}>{presensi.kodeMk || '-'}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Pertemuan ke-</Text>
              <Text style={styles.value}>{presensi.pertemuanKe || '-'}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Ruangan</Text>
              <Text style={styles.value}>{presensi.ruangan || presensi.room || '-'}</Text>
            </View>
          </View>

          {/* Informasi Waktu */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informasi Waktu</Text>
            
            <View style={styles.row}>
              <Text style={styles.label}>Tanggal</Text>
              <Text style={styles.value}>{formatDate(presensi.date || presensi.waktu)}</Text>
            </View>
            
            <View style={styles.row}>
              <Text style={styles.label}>Jam Presensi</Text>
              <Text style={styles.value}>{presensi.jamPresensi || '-'}</Text>
            </View>
          </View>

          {/* Status */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Status</Text>
            
            <View style={[
              styles.statusContainer,
              presensi.status === "Present" ? styles.statusPresent : styles.statusAbsent
            ]}>
              <MaterialIcons 
                name={presensi.status === "Present" ? "check-circle" : "cancel"} 
                size={24} 
                color={presensi.status === "Present" ? "#155724" : "#721c24"} 
              />
              <Text style={[
                styles.statusText,
                presensi.status === "Present" ? styles.statusPresentText : styles.statusAbsentText
              ]}>
                {presensi.status === "Present" ? "HADIR" : "TIDAK HADIR"}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#F5F5F5", 
    padding: 16 
  },
  card: { 
    backgroundColor: "white", 
    padding: 20, 
    borderRadius: 12, 
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: { 
    fontSize: 18, 
    fontWeight: "bold", 
    color: "#333",
    textAlign: 'center',
    marginTop: 8,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0056b3",
    marginBottom: 12,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 12,
    paddingVertical: 4,
  },
  label: { 
    fontSize: 14, 
    color: "#666",
    fontWeight: '500',
  },
  value: { 
    fontSize: 14, 
    fontWeight: "bold", 
    color: "#333",
    flex: 1,
    textAlign: 'right',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  statusPresent: {
    backgroundColor: '#d4edda',
  },
  statusAbsent: {
    backgroundColor: '#f8d7da',
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  statusPresentText: {
    color: '#155724',
  },
  statusAbsentText: {
    color: '#721c24',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    padding: 20,
  },
});