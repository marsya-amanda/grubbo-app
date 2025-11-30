import { Ionicons } from "@expo/vector-icons";
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Pressable } from "react-native";


export default function DateTimeButton() {
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const mode = 'datetime';
    const modal = true;

    const onChange = (event: Event, selectedDate: Date) => {
        const currentDate = selectedDate;
        setOpen(false);
        setDate(currentDate);
      };
    
    return (
        <Pressable onPress={() => setOpen(true)}>
            <Ionicons name="calendar-outline" size={20} color="#837770"/>
            {open && 
            <DateTimePicker 
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                onChange={onChange}
            />
            }
        </Pressable>
    )
}