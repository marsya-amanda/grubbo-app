import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // ensure expo-vector-icons installed

type Props = {
  label: string;
  placeholder?: string;
  value: string;
  onChangeText: (val: string) => void;
  onCalendarPress?: () => void;
};

export default function SearchField({
  placeholder,
  value,
  onChangeText,
  onCalendarPress,
}: Props) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor="#837770"
        />
        <Pressable style={styles.iconBtn} onPress={onCalendarPress}>
          <Ionicons name="calendar-outline" size={14} color="#837770" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: 282,
    height: 44
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#837770",
    borderRadius: 12,
    backgroundColor: "#999999",
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    fontFamily: "Helvetica",
    color: "#837770",
  },
  iconBtn: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderLeftWidth: 2,
    borderLeftColor: "#837770",
  },
});