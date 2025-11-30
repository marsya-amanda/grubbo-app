import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import DateTimePicker from 'DateTimePicker.tsx';
import { Ionicons } from "@expo/vector-icons";

type Props = {
  placeholder?: string;
  value: string;
  onChangeText: (val: string) => void;
  onCalendarPress?: () => void;
};

export default function SearchField({
  placeholder,
  value,
  onChangeText
}: Props) {
  return (
    <View style={styles.wrapper}>
        <View style={styles.search}>
            <Ionicons name='search-outline' size={20} color="#837770" />
            <TextInput
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            placeholderTextColor="#837770"
            />
        </View>
        
        <DateTimePicker />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: 282,
    height: 44,
    backgroundColor: '#e9ddd6',
    borderRadius: 100,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 3,
  },
  search: {
    flexDirection: "row",
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 3
  }
});