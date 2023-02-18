import React from "react"

import { TouchableOpacity, View, StyleSheet, Text } from "react-native"

export default function CreateHabit({habitArea, borderColor}) {
    function handleCreate() {
        console.log(`Area button clicked: ${habitArea}`)
    }
    
    return (
        <View>
            <TouchableOpacity 
                style={[styles.button, { borderColor: borderColor }]}
                activeOpacity={0.8}
                onPress={handleCreate}
            >
            <Text style={styles.habitTitle}>
                Add goal {habitArea === "Mind" ? "da" : "do"} {habitArea}
            </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        width: 315,
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 2,
        borderStyle: "dotted",
        borderColor: "#FFFFFF",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    habitTitle: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },
})