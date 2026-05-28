import React, { useState, useContext } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const BASE_URL = "http://172.20.10.2:8080/api/user";

export default function LoginScreen() {
  const { login } = useContext(AuthContext);

  const [nim, setNim] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          nim: nim,
          password: password,
        },
        {
          headers: {
            authcode: "astratech@123",
            "Content-Type": "application/json",
          },
        }
      );

      console.log("RESPONSE:", res.data);

      if (res.data.status === 200) {
        login(res.data.data);
      } else {
        Alert.alert("Login Gagal", res.data.message);
      }
    } catch (err) {
      console.log("ERROR:", err);
      Alert.alert("Error", "Tidak bisa konek ke server");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          placeholder="NIM"
          value={nim}
          onChangeText={setNim}
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
          style={styles.input}
        />

        <Button title="Login" onPress={handleLogin} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // tengah vertikal
    alignItems: "center", // tengah horizontal
    backgroundColor: "#fff",
  },

  form: {
    width: "80%",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
    padding: 12,
    borderRadius: 8,
  },
});