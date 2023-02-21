import React from "react"
import { TouchableOpacity, View, StyleSheet, Text } from "react-native"
import { useNavigation } from "@react-navigation/native"


export default function CreateHabit({ habitArea, borderColor }) {
    const navigation = useNavigation()
    
    function handleCreate() {
        navigation.navigate("HabitPage", {
            create: true,
            habit: { habitArea: habitArea },
        })
    }
    
    return (
        <View>
            <TouchableOpacity 
                style={[styles.button, { borderColor: borderColor }]}
                activeOpacity={0.8}
                onPress={handleCreate}
            >
            <Text style={styles.habitTitle}>
                Add goal {habitArea === "Mind" ? "of" : "of"} {habitArea}
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