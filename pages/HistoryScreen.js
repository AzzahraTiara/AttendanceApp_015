import React, { useState, useCallback, useContext } from "react";
import {
  View, Text, SafeAreaView, StyleSheet, FlatList,
  TouchableOpacity, ActivityIndicator, Alert
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';

const BASE_URL = "http://192.168.1.9:8080/api/presensi";
const AUTH_CODE = "astratech@123";

export default function HistoryScreen({ navigation }) {
  const { userData } = useContext(AuthContext);

  const [historyData, setHistoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null); // TAMBAHKAN error state

  // Pagination State
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);

  // FUNGSI GET API DENGAN PAGINATION
  const fetchAttendanceData = async (targetPage = 0) => {
    if (isLoading || (isLastPage && targetPage !== 0)) return;

    setIsLoading(true);
    setError(null); // Reset error

    try {
      // CEK apakah userData dan mhsNim ada
      if (!userData?.mhsNim) {
        console.log("DEBUG: userData atau mhsNim tidak ada:", userData);
        setError("Data user tidak ditemukan. Silakan login ulang.");
        setIsLoading(false);
        return;
      }

      const url = `${BASE_URL}/history/${userData.mhsNim}?page=${targetPage}&size=10`;
      console.log("DEBUG: Memanggil URL:", url);
      console.log("DEBUG: authCode:", AUTH_CODE);
      
      const response = await fetch(url, {
        headers: {
          'authcode': AUTH_CODE,
          'Content-Type': 'application/json'
        }
      });
      
      console.log("DEBUG: Response status:", response.status);
      
      // CEK response status
      if (!response.ok) {
        const errorText = await response.text();
        console.log("DEBUG: Error response:", errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
      
      const json = await response.json();
      console.log("DEBUG: Response JSON:", JSON.stringify(json, null, 2));
      
      // CEK format response (mungkin berbeda)
      let newItems = [];
      if (json.content) {
        newItems = json.content;
      } else if (Array.isArray(json)) {
        newItems = json;
      } else if (json.data) {
        newItems = json.data;
      } else {
        newItems = [];
      }
      
      console.log("DEBUG: Jumlah data diterima:", newItems.length);

      if (targetPage === 0) {
        setHistoryData(newItems);
      } else {
        setHistoryData(prev => [...prev, ...newItems]);
      }

      setPage(targetPage);
      // CEK isLastPage berdasarkan response
      if (json.last !== undefined) {
        setIsLastPage(json.last);
      } else if (newItems.length < 10) {
        setIsLastPage(true);
      } else {
        setIsLastPage(false);
      }

    } catch (error) {
      console.error("DEBUG: Error detail:", error);
      setError(error.message);
      Alert.alert("Error", `Gagal mengambil data: ${error.message}`);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (userData?.mhsNim) {
        console.log("DEBUG: userData.mhsNim =", userData.mhsNim);
        fetchAttendanceData(0);
      } else {
        console.log("DEBUG: userData tidak ada, isinya:", userData);
        setError("Silakan login terlebih dahulu");
        setIsLoading(false);
      }
    }, [userData?.mhsNim])
  );

  const onRefresh = () => {
    setIsRefreshing(true);
    fetchAttendanceData(0);
  };

  const handleLoadMore = () => {
    if (!isLastPage && !isLoading && !error) {
      fetchAttendanceData(page + 1);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate("Detail", { presensi: item })}
    >
      <View style={{ flex: 1 }}>
        {/* Ganti item.course dengan field yang sesuai */}
        <Text style={styles.course}>{item.namaMk || item.course || item.kodeMk || "Mata Kuliah"}</Text>
        <Text style={styles.date}>
          {item.date || item.tanggal || new Date(item.waktu).toLocaleDateString('id-ID')} | {item.jamPresensi || item.jam}
        </Text>
      </View>
      <Text style={item.status === "Present" || item.status === "present" ? styles.present : styles.absent}>
        {item.status === "Present" || item.status === "present" ? "Hadir" : "Tidak Hadir"}
      </Text>
      <MaterialIcons name="chevron-right" size={24} color="#999" style={{ marginLeft: 10 }} />
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (!isLoading) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#0056A0" />
        <Text style={styles.loaderText}>Menarik data dari server...</Text>
      </View>
    );
  };

  // TAMPILKAN ERROR jika ada
  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <MaterialIcons name="error-outline" size={48} color="#dc3545" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={() => fetchAttendanceData(0)}>
            <Text style={styles.retryText}>Coba Lagi</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={historyData}
        keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
        renderItem={renderItem}
        contentContainerStyle={styles.content}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={
          !isLoading && (
            <View style={styles.emptyContainer}>
              <MaterialIcons name="history" size={64} color="#ccc" />
              <Text style={styles.emptyText}>Tidak ada riwayat absensi</Text>
              <Text style={styles.emptySubText}>Scan QR Code untuk memulai presensi</Text>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },
  content: { padding: 20, flexGrow: 1 },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2
  },
  course: { fontSize: 16, fontWeight: "bold", color: "#333", flex: 1 },
  date: { fontSize: 12, color: "gray", marginTop: 4 },
  present: { color: "green", fontWeight: "bold" },
  absent: { color: "red", fontWeight: "bold" },
  footerLoader: {
    paddingVertical: 20,
    alignItems: "center",
  },
  loaderText: {
    marginTop: 8,
    color: "#666",
    fontSize: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 16,
    color: "#999",
    fontSize: 16,
    fontWeight: "bold",
  },
  emptySubText: {
    textAlign: "center",
    marginTop: 8,
    color: "#bbb",
    fontSize: 14,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#dc3545",
    textAlign: "center",
    marginTop: 16,
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: "#0056b3",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: {
    color: "white",
    fontWeight: "bold",
  },
});