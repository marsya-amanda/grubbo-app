import { Ionicons } from "@expo/vector-icons";
import React, { useState } from 'react';
import DatePicker from "react-native-date-picker";
import { Pressable } from "react-native";


export default function DateTimePicker() {
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const mode = 'datetime';
    const modal = true;
    
    return (
        <Pressable onPress={() => setOpen(true)}>
            <Ionicons name="calendar-outline" size={20} color="#837770"/>
            <DatePicker
                date={date}
                minimumDate={new Date()}
                mode={mode}
                modal={modal}
                open={open}
                onConfirm={(selectedDate) => {
                    setDate(selectedDate);
                    setOpen(false);
                }}
                onCancel={() => setOpen(false)}
                title={null}
                confirmText="Done"
                cancelText="Cancel"
            />
        </Pressable>
    )
}