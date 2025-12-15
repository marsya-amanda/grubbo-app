import { Ionicons } from "@expo/vector-icons";
import React, { useState } from 'react';
import DateTimePicker, {DateTimePickerEvent} from '@react-native-community/datetimepicker';
import { Pressable, StyleSheet, View } from "react-native";


export default function DateTimeButton() {
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const mode = 'datetime';

    const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        const currentDate = selectedDate;
        if (event.type === 'dismissed') {
          setOpen(false);
          return;
        }
      
        if (currentDate) {
          setDate(currentDate);
        }
        setOpen(false);
      };
    
    return (
        <View style={styles.button}>
            <Pressable onPress={() => setOpen(true)}>
            <Ionicons name="calendar-outline" size={20} color="#837770"/>
            <View style={styles.picker}>
            {open && 
            <DateTimePicker 
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                onChange={onChange}
                display="spinner"
            />
            }
            </View>
        </Pressable>
        </View>
    )
};

const styles = StyleSheet.create({
    button: {
        marginLeft: 10
    },
    picker: {
        
    }
});