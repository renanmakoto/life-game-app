import React from "react"
import { TouchableOpacity, StyleSheet, View, Text } from "react-native"
import { useNavigation } from "@react-navigation/native"

export default function EditHabit({ habitArea, frequency, habit, checkColor }) {
    const navigation = useNavigation()

    function handleEdit() {
        navigation.navigate("HabitPage", {
            create: false,
            habit,
        })
        console.log("Edit button clicked")
    }

    function handleCheck() {
        console.log(`Check button from ${habit?.habitArea}`)
    }

    const textNotification = habit?.habitNotificationTime == null ? `No notification - ${habit?.habitFrequency}` : `${habit?.habitNotificationTime} - ${habit?.habitFrequency}`

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            style={styles.button}
            onPress={handleEdit}
        >
            <View style={styles.habitText}>
                <Text style={styles.habitTitle}>{habit?.habitName}</Text>
                <Text style={styles.habitFrequency}>{textNotification}</Text>
            </View>
            <TouchableOpacity 
                style={[styles.check, {borderColor: checkColor}]}
                onPress={handleCheck}    
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#151515",
        borderRadius: 5,
        width: 320,
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    habitTitle: {
        color: "#FFFFFF",
        fontWeight: "bold"
    },
    habitFrequency:{
        color: "#FFFFFF"    
    },
    check: {
        borderRadius: 10,
        borderWidth: 1,
        width: 20,
        height: 20,
    },
})