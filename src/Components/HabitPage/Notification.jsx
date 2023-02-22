import React from "react"
import { StyleSheet, View, Text } from "react-native"
import { Switch } from "react-native-gesture-handler"

export default function Notification({
    notificationToggle,
    setNotificationToggle,
}) {
    const toggleSwitch = () => {
        setNotificationToggle((previousState) => !previousState)
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>
                Notification
            </Text>
            <Switch
                trackColor={{ false: "#FF0044", true: "#2DBE56" }}
                thumbColor={"#FFFFFF"}
                ios_backgroundColor="#3E3E3E"
                onValueChange={toggleSwitch}
                value={notificationToggle}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    titleDisabled: {
        color: "#BBBB",
        fontSize: 20,
        marginRight: 10,
    },
    title: {
        color: "#FFFFFF",
        fontSize: 20,
        marginRight: 10,
    }
})