import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, FlatList } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const Home = () => {
  
  const totalPresent = history.filter(item => item.status === "Present").length;
  const totalAbsent = history.filter(item => item.status === "Absent").length;

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
        <Text style={styles.title}>Attendance App</Text>

       
        <View style={styles.card}>
          <View style={styles.icon}>
            <MaterialIcons name="person" size={40} color="#555" />
          </View>
          <View>
            <Text style={styles.name}>Azzahra Tiara Putri</Text>
            <Text>NIM : 0320240015</Text>
            <Text>Class : Informatika-2A</Text>
          </View>
        </View>

      
        <View style={styles.classCard}>
          <Text style={styles.subtitle}>Today's Class</Text>
          <Text>Mobile Programming</Text>
          <Text>08:00 - 10:00</Text>
          <Text>Lab 3</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>CHECK IN</Text>
          </TouchableOpacity>
        </View>

       
        <View style={styles.classCard}>
          <Text style={styles.subtitle}>Upcoming Class</Text>
          <Text>Software Engineering</Text>
          <Text>13:00 - 15:00</Text>
          <Text>Room 402</Text>
        </View>

        
        <View style={styles.summaryCard}>
          <Text style={styles.subtitle}>Attendance Summary</Text>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Present</Text>
              <Text style={[styles.summaryValue, { color: "green" }]}>{totalPresent}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Absent</Text>
              <Text style={[styles.summaryValue, { color: "red" }]}>{totalAbsent}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.subtitle}>Attendance History</Text>
        <FlatList
          data={history}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          scrollEnabled={false}
        />
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
});