import React, { useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { View, ScrollView, Text, StyleSheet } from "react-native"

import LifeStatus from "../../Components/Common/LifeStatus/LifeStatus"
import StatusBar from "../../Components/Home/StatusBar/StatusBar"

export default function Home() {
    const navigation = useNavigation()

    const [mindHabit, setMindHabit] = useState()
    const [moneyHabit, setMoneyHabit] = useState()
    const [bodyHabit, setBodyHabit] = useState()
    const [funHabit, setFunHabit] = useState()

    function handleNavExplanation() {
        navigation.navigate("AppExplanation")
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={{ alignItems: "center" }}>
                    <Text style={styles.dailyChecks}>❤️ 20 days - ✓ 80 checks</Text> 
                    <LifeStatus />
                    <StatusBar />
                </View>
                <Text
                    style={styles.explanationText}
                    onPress={() => {
                        handleNavExplanation()
                    }}
                >
                    See explanation again
                </Text>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(21, 21, 21, 0.98)",
    },
    dailyChecks: {
        color: "#FFFFFF",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 18,
        marginTop: 40,
    },
    explanationText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 16,
        paddingTop: 15,
        paddingBottom: 25,
    },
})