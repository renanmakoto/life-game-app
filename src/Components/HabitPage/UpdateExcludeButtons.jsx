import React from "react"
import { View, StyleSheet, TouchableOpacity, Alert, Text, Image } from "react-native"
import { useNavigation } from "@react-navigation/native"

export default function UpdateDeleteButton({
    habitInput,
    handleUpdate,
    habitArea,
}) {
    const navigation = useNavigation()

    function handleDeleteHabit() {
        navigation.navigate("Home", {
            deleteArea: `${habitArea}`,
        })
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.updateButton}
                activeOpacity={0.8}
                onPress={() => {
                    Alert.alert(
                        "If you move forward, you will update the habit. Are you sure?",
                        "If you do it, you may change the habit, frequency and notification.",
                        [
                            {
                                text: "Cancel",
                            },
                            {
                                text: "Update",
                                onPress: handleUpdate,
                            }
                        ]
                    )
                }}
            >
                <Text style={styles.updateButtonText}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.trashButton}
                activeOpacity={0.8}
                onPress={() => {
                    Alert.alert(
                        "Are you sure you want to delete the habit?",
                        "If you do it, you will lose all the progress ou failures of the habit.",
                        [
                            {
                                text: "Cancel",
                                onPress: () => {
                                    Alert.alert("Deleting cancelled succesfully!")
                                }
                            },
                            {
                                text: "Delete",
                                onPress: handleDeleteHabit,
                            }
                        ]
                    )
                }}
            >
                <Image
                    source={require("../../../assets/icons/trash.png")}
                    style={styles.trashIcon}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginBottom: 20,
    },
    updateButton: {
        borderWidth: 1,
        borderColor: "#FFFFFF",
        width: 150,
        height: 50,
        marginRight: 10,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
    },
    updateButtonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 18,
    },
    trashButton: {
        borderWidth: 1,
        borderColor: "#FF0044",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        width: 90,
    },
    trashIcon: {
        width: 25,
        height: 25,
    }
})