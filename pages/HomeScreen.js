import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function HomeScreen() {
    const navigation = useNavigation();
    const [permission, requestPermission] = useCameraPermissions();
    const [isScanning, setIsScanning] = useState(true);
    const [isCheckedIn, setIsCheckedIn] = useState(false);
    
    // REF untuk mencegah double scan
    const isProcessingRef = useRef(false);

    // GANTI DENGAN IP LAPTOP MASING-MASING
    const BASE_URL = "http://172.20.10.2:8080/api/presensi";

    if (!permission) {
        return (
            <View style={styles.container}>
                <Text style={styles.infoText}>Memuat perizinan kamera...</Text>
            </View>
        );
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.infoText}>
                    Aplikasi butuh akses kamera untuk memindai QR Code Presensi Dosen!
                </Text>
                <TouchableOpacity style={styles.buttonRequest} onPress={requestPermission}>
                    <Text style={styles.buttonText}>Aktifkan Kamera</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const handleSubmitPresensi = async (qrData) => {
        // Di dalam handleSubmitPresensi di HomeScreen.js
const payload = {
    kodeMk: qrData.kodeMk,
    namaMk: qrData.namaMk, // TAMBAHKAN INI!
    nimMhs: "0325260031",
    pertemuanKe: qrData.pertemuanKe,
    date: new Date().toISOString().split('T')[0],
    jamPresensi: new Date().toLocaleTimeString('id-ID'),
    status: "Present",
    ruangan: qrData.ruangan
};

        try {
            const response = await fetch(BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            const result = await response.json();

            if (response.ok) {
                setIsCheckedIn(true);
                Alert.alert("Berhasil!", "Presensi sukses dicatat ke Database.", [
                    { text: "Lihat Riwayat", onPress: () => navigation.navigate('History') }
                ]);
            } else {
                Alert.alert("Gagal", result.message || "Terjadi kesalahan di server.");
            }
        } catch (error) {
            Alert.alert("Error Jaringan", "Pastikan IP Laptop benar dan API berjalan.");
            console.error(error);
        } finally {
            // Reset state setelah proses selesai
            setIsScanning(true);
            isProcessingRef.current = false;
        }
    };

    // Fungsi saat QR Code terdeteksi - DILENGKAPI PENCEGAHAN DOBEL
    const handleBarCodeScanned = (result) => {
        // CEK: jika tidak scanning ATAU sedang memproses, IGNORE
        if (!isScanning || isProcessingRef.current) return;
        
        // Langsung lock agar tidak bisa scan lagi
        setIsScanning(false);
        isProcessingRef.current = true;

        try {
            const qrData = JSON.parse(result.data);

            Alert.alert(
                "QR Code Terdeteksi",
                `Mata Kuliah: ${qrData.kodeMk}\nPertemuan: ${qrData.pertemuanKe}\nRuangan: ${qrData.ruangan}\n\nLanjutkan Presensi (Check-In)?`,
                [
                    {
                        text: "Batal",
                        onPress: () => {
                            setIsScanning(true);
                            isProcessingRef.current = false;
                        },
                        style: "cancel"
                    },
                    {
                        text: "Ya, Check In",
                        onPress: () => handleSubmitPresensi(qrData)
                    }
                ]
            );
        } catch (error) {
            Alert.alert("QR Tidak Valid", "Pastikan Anda memindai QR Code Presensi Dosen.");
            setIsScanning(true);
            isProcessingRef.current = false;
        }
    };

    return (
        <View style={styles.container}>
            <CameraView
                style={StyleSheet.absoluteFillObject}
                facing="back"
                onBarcodeScanned={isScanning ? handleBarCodeScanned : undefined}
                barcodeScannerSettings={{
                    barcodeTypes: ["qr"],
                }}
            />
            
            <View style={styles.overlay}>
                <View style={styles.unfocusedContainerTop}></View>
                
                <View style={styles.focusedContainer}>
                    <View style={styles.borderCornerTopLeft} />
                    <View style={styles.borderCornerTopRight} />
                    <View style={styles.borderCornerBottomLeft} />
                    <View style={styles.borderCornerBottomRight} />
                </View>
                
                <View style={styles.unfocusedContainerBottom}>
                    <Text style={styles.scanText}>Arahkan Kamera ke QR Code Dosen</Text>
                    
                    {!isScanning && (
                        <TouchableOpacity 
                            style={styles.scanAgainButton} 
                            onPress={() => {
                                setIsScanning(true);
                                isProcessingRef.current = false;
                            }}
                        >
                            <Text style={styles.scanAgainText}>Scan Lagi</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        position: 'relative',
    },
    infoText: {
        color: 'white',
        textAlign: 'center',
        margin: 30,
        fontSize: 16,
    },
    buttonRequest: {
        backgroundColor: '#0056b3',
        padding: 15,
        borderRadius: 10,
        alignSelf: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    unfocusedContainerTop: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    focusedContainer: {
        width: 250,
        height: 250,
        alignSelf: 'center',
        backgroundColor: 'transparent',
        position: 'relative',
    },
    unfocusedContainerBottom: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scanText: {
        color: 'white',
        fontSize: 16,
        marginTop: 20,
        fontWeight: 'bold',
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: 10,
        borderRadius: 5,
        textAlign: 'center',
    },
    borderCornerTopLeft: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 40,
        height: 40,
        borderTopWidth: 5,
        borderLeftWidth: 5,
        borderColor: '#007bff',
    },
    borderCornerTopRight: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 40,
        height: 40,
        borderTopWidth: 5,
        borderRightWidth: 5,
        borderColor: '#007bff',
    },
    borderCornerBottomLeft: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: 40,
        height: 40,
        borderBottomWidth: 5,
        borderLeftWidth: 5,
        borderColor: '#007bff',
    },
    borderCornerBottomRight: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 40,
        height: 40,
        borderBottomWidth: 5,
        borderRightWidth: 5,
        borderColor: '#007bff',
    },
    scanAgainButton: {
        backgroundColor: '#ffc107',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center',
    },
    scanAgainText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
});