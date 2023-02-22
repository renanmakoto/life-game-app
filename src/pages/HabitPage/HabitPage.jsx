import React, { useState, useEffect, useRef } from "react"
import { 
    View, 
    Text, 
    StyleSheet, 
    Image, 
    TouchableOpacity, 
    ScrollView, 
    Alert 
} from "react-native"
import { useNavigation } from "@react-navigation/native"

import SelectHabit from "../../Components/HabitPage/SelectHabit"
import SelectFrequency from "../../Components/HabitPage/SelectFrequency"
import Notification from "../../Components/HabitPage/Notification"
import TimeDataPicker from "../../Components/HabitPage/TimeDataPicker"

export default function HabitPage({ route }) {
    const navigation = useNavigation()
    const [habitInput, setHabitInput] = useState()
    const [frequencyInput, setFrequencyInput] = useState()
    const [notificationToggle, setNotificationToggle] = useState()
    const [dayNotification, setDayNotification] = useState()
    const [timeNotification, setTimeNotification] = useState()

    const { create, habit } = route.params

    return (
        <View style={styles.container}>
            <ScrollView>
                <View>
                    <TouchableOpacity 
                        style={styles.backPageBtn} 
                        onPress={() => navigation.goBack()}
                    >
                        <Image 
                            source={require("../../../assets/icons/arrowBack.png")} 
                            style={styles.arrowBack}    
                        />
                    </TouchableOpacity>
                    <View style={styles.mainContent}>
                        <Text style={styles.title}>Habit settings</Text>
                        <Text style={styles.inputText}>Area</Text>
                        <View style={styles.inputContainer}>
                            <Text style={styles.area}>{habit?.habitArea}</Text>
                        </View>
                        <Text style={styles.inputText}>Habit</Text>
                        <SelectHabit habit={habit} habitInput={setHabitInput} />
                        <Text style={styles.inputText}>Frequency</Text>
                        <SelectFrequency 
                            habitFrequency={habit?.habitFrequency} 
                            frequencyInput={setFrequencyInput} 
                        />
                        {frequencyInput === "Monthly" ? null : (
                            <Notification
                                notificationToggle={notificationToggle}
                                setNotificationToggle={setNotificationToggle}
                            />
                        )}
                        {notificationToggle ? (
                            frequencyInput === "Monthly" ? null : (
                                <TimeDataPicker
                                    frequency={frequencyInput}
                                    dayNotification={dayNotification}
                                    timeNotification={timeNotification}
                                    setDayNotification={setDayNotification}
                                    setTimeNotification={setTimeNotification}
                                />
                            )
                        ) : null}
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(21, 21, 21, 0.98)",
    },
    backPageBtn: {
        width: 40,
        height: 40,
        margin: 25,
    },
    arrowBack: {
        width: 40,
        height: 40,
    },
    mainContent: {
        width: 250,
        alignSelf: "center",
    },
    title: {
        fontWeight: "bold",
        textAlign: "center",
        color: "#FFFFFF",
        fontSize: 30,
    },
    inputText: {
        color: "#FFFFFF",
        fontSize: 16,
        marginTop: 35,
        marginBottom: 10,
        marginLeft: 5,
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: "#FFFFFF",
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    area: {
        color: "#BBBBBB",
        fontSize: 15,
    },
})