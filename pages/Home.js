import React, { useState, useEffect, useMemo,useRef } from "react";
import { 
  View, Text, SafeAreaView, StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert , TextInput
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';


// Data awal (Initial State)
const initialHistory = [
  { id: "1", course: "Web Programming", date: "2026-03-01", status: "Present" },
  { id: "2", course: "Database System", date: "2026-03-02", status: "Present" },
  { id: "3", course: "Mobile Programming", date: "2026-03-02", status: "Absent" },
  { id: "4", course: "Structure Data", date: "2026-03-02", status: "Absent" },
];

const Home = () => {
  // 1. STATE UNTUK RIWAYAT PRESENSI
  const [historyData, setHistoryData] = useState(initialHistory);

  // 2. STATE UNTUK STATUS TOMBOL CHECK-IN
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  // 3. STATE UNTUK JAM DIGITAL
  const [currentTime, setCurrentTime] = useState('Memuat jam...');

  //4. STATE & REF UNTUK INPUT CATATAN (Contoh penggunaan useRef)
  const [note, setNote] = useState('');
  const noteInputRef= useRef(null);

  // 5. OPTIMASI KOMPUTASI DENGAN useMemo
  const attendanceStats = useMemo(() => {
    console.log("Menghitung ulang statistik kehadiran...");
    const presentCount = historyData.filter(item => item.status === 'Present').length;
    const absentCount = historyData.filter(item => item.status === 'Absent').length;

    return { totalPresent: presentCount, totalAbsent: absentCount };
  }, [historyData]);


  // EFEK SIKLUS HIDUP (Mounting & Unmounting)
  useEffect(() => {
    // Jalankan timer setiap 1000 milidetik (1 detik)
    const timer = setInterval(() => {
      const timeString = new Date().toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setCurrentTime(timeString);
    }, 1000);

    // CLEANUP: Matikan timer jika layar ditutup
    return () => clearInterval(timer);
  }, []); // Array kosong [] artinya jalankan hanya satu kali saat awal dibuka

  // FUNGSI LOGIKA ABSEN
 
const handleCheckIn = () => {
  if (isCheckedIn) {
    Alert.alert("Perhatian", "Anda sudah melakukan Check In.");
    return;
  }

  // Validasi Catatan menggunakan useRef
  if (note.trim() === '') {
    Alert.alert("Peringatan", "Catatan kehadiran wajib diisi!");
    noteInputRef.current.focus(); // <-- Sihir useRef: Memaksa kursor pindah ke input
    return;
  }

  const newAttendance = {
    id: Date.now().toString(),
    course: "Mobile Programming",
    date: new Date().toLocaleDateString('id-ID'),
    status: "Present",
    // Anda juga bisa menambahkan properti catatan ke objek jika ingin ditampilkan
  };

  setHistoryData([newAttendance, ...historyData]);
  setIsCheckedIn(true);
  Alert.alert("Sukses", `Berhasil Check In pada pukul ${currentTime}`);
};

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View>
        <Text style={styles.course}>{item.course}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      
      <View style={styles.statusRow}>
        <MaterialIcons 
          name={item.status === "Present" ? "check-circle" : "cancel"} 
          size={16} 
          color={item.status === "Present" ? "green" : "red"} 
        />
        <Text style={item.status === "Present" ? styles.present : styles.absent}>
          {" "}{item.status}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Attendance App</Text>
          {/* Tampilkan State Jam Digital */}
          <Text style={styles.clockText}>{currentTime}</Text>
        </View>

        {/* Student Card */}
        <View style={styles.card}>
          <View style={styles.icon}>
            <MaterialIcons name="person" size={40} color="#555" />
          </View>
          <View>
            <Text style={styles.name}>Azzahra Tiara</Text>
            <Text>NIM : 0320240015</Text>
            <Text>Class : Informatika-2A</Text>
          </View>
        </View>

        {/* Today's Class */}
       {/* Today's Class */}
      <View style={styles.classCard}>
        <Text style={styles.subtitle}>Today's Class</Text>
        <Text>Mobile Programming</Text>
        <Text>08:00 - 10:00</Text>
        <Text>Lab 3</Text>

        {/* Fitur Baru: Kolom Input Catatan dengan useRef */}
        {!isCheckedIn && (
          <TextInput
            ref={noteInputRef} // <-- Menempelkan referensi ke elemen ini
            style={styles.inputCatatan}
            placeholder="Tulis catatan (cth: Hadir lab)"
            value={note}
            onChangeText={setNote}
          />
        )}

        <TouchableOpacity
          style={[styles.button, isCheckedIn ? styles.buttonDisabled : styles.buttonActive]}
          onPress={handleCheckIn}
          disabled={isCheckedIn}
        >
          <Text style={styles.buttonText}>
            {isCheckedIn ? "CHECKED IN" : "CHECK IN"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Fitur Baru: Statistik Kehadiran (Hasil useMemo) */}
      <View style={styles.statsCard}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{attendanceStats.totalPresent}</Text>
          <Text style={styles.statLabel}>Total Present</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statNumber, { color: 'red' }]}>{attendanceStats.totalAbsent}</Text>
          <Text style={styles.statLabel}>Total Absent</Text>
        </View>
      </View>

      {/* Attendance History */}
      <View style={styles.classCard}>
        <Text style={styles.subtitle}>Attendance History</Text>
        
        <FlatList
          data={historyData} // <-- Ubah 'history' menjadi 'historyData'
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};




const history = [
  { id: "1", course: "Mobile Programming", date: "2026-03-01", status: "Present" },
  { id: "2", course: "Database System", date: "2026-03-02", status: "Present" },
  { id: "3", course: "Operating System", date: "2026-03-03", status: "Absent" },
  { id: "4", course: "Computer Network", date: "2026-03-04", status: "Present" },
  { id: "5", course: "Web Dev", date: "2026-03-05", status: "Present" },
  { id: "6", course: "UI/UX Design", date: "2026-03-06", status: "Present" },
  { id: "7", course: "Discrete Math", date: "2026-03-07", status: "Absent" },
  { id: "8", course: "Algorithm", date: "2026-03-08", status: "Present" },
  { id: "9", course: "Statistics", date: "2026-03-09", status: "Present" },
  { id: "10", course: "English IT", date: "2026-03-10", status: "Present" },
  { id: "11", course: "Cyber Security", date: "2026-03-11", status: "Absent" },
  { id: "12", course: "Cloud Computing", date: "2026-03-12", status: "Present" },
  { id: "13", course: "Data Science", date: "2026-03-13", status: "Present" },
  { id: "14", course: "Machine Learning", date: "2026-03-14", status: "Present" },
  { id: "15", course: "AI Ethics", date: "2026-03-15", status: "Present" },
  { id: "16", course: "Software Testing", date: "2026-03-16", status: "Absent" },
  { id: "17", course: "Backend Dev", date: "2026-03-17", status: "Present" },
  { id: "18", course: "Frontend Dev", date: "2026-03-18", status: "Present" },
  { id: "19", course: "Numerical Method", date: "2026-03-19", status: "Present" },
  { id: "20", course: "Calculus", date: "2026-03-20", status: "Absent" },
  { id: "21", course: "Physics", date: "2026-03-21", status: "Present" },
  { id: "22", course: "Project Management", date: "2026-03-22", status: "Present" },
  { id: "23", course: "Logic IT", date: "2026-03-23", status: "Present" },
  { id: "24", course: "Soft Skill", date: "2026-03-24", status: "Present" },
];

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  icon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  classCard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  summaryCard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  summaryItem: {
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 14,
    color: "gray",
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: "center",
  },
  course: {
    fontSize: 16,
  },
  date: {
    fontSize: 12,
    color: "gray",
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  present: {
    color: "green",
    fontWeight: "bold",
  },
  absent: {
    color: "red",
    fontWeight: "bold",
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  clockText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    fontVariant: ['tabular-nums'],
  },
  buttonActive: {
    backgroundColor: "#007AFF",
  },
  buttonDisabled: {
    backgroundColor: "#A0C4FF", // Warna lebih pucat saat disable
  },
  inputCatatan: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 15,
    backgroundColor: '#fafafa',
  },
  statsCard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
  },
  statLabel: {
    fontSize: 14,
    color: 'gray',
  },
});