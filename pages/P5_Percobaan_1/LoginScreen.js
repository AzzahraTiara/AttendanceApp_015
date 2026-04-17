import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";

export default function LoginScreen({ navigation }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        if (username === "astratech" && password === "123") {
            navigation.replace("Home");
        } else {
            alert("Username atau Password salah");
        }
        };
    return (
        <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 20, marginBottom: 10 }}>Login</Text>
        <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
        />
        <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={{ borderWidth: 1, marginBottom: 20, padding: 8 }}
        />
        <Button title="Login" onPress={handleLogin} />
    </View>
 );
}
