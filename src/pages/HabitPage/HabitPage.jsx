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
import * as Notifications from "expo-notifications"

import NotificationService from "../../Services/NotificationService"
import SelectHabit from "../../Components/HabitPage/SelectHabit"
import SelectFrequency from "../../Components/HabitPage/SelectFrequency"
import Notification from "../../Components/HabitPage/Notification"
import TimeDataPicker from "../../Components/HabitPage/TimeDataPicker"
import UpdateDeleteButton from "../../Components/HabitPage/UpdateDeleteButtons"
import DefaultButton from "../../Components/Common/DefaultButton/DefaultButton"
import HabitsService from "../../Services/HabitsService"

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
})

export default function HabitPage({ route }) {
    const navigation = useNavigation()
    const [habitInput, setHabitInput] = useState()
    const [frequencyInput, setFrequencyInput] = useState()
    const [notificationToggle, setNotificationToggle] = useState()
    const [dayNotification, setDayNotification] = useState()
    const [timeNotification, setTimeNotification] = useState()

    const { create, habit } = route.params

    const habitCreated = new Date()
    const formatDate = `${habitCreated.getFullYear()}-${habitCreated.getMonth() + 1}-${habitCreated.getDate()}`

    const [notification, setNotification] = useState(false)
    const notificationListener = useRef()
    const responseListener = useRef()

    function handleCreateHabit() {
        if (habitInput === undefined || frequencyInput === undefined) {
            Alert.alert("You must to select a habit to continue")
        } else if (
            notificationToggle === true && 
            frequencyInput === "Daily" && 
            timeNotification === undefined
            ) {
                Alert.alert("You must to set the notification time")
        } else if (
            notificationToggle === true &&
            frequencyInput === "Daily" &&
            dayNotification === undefined &&
            timeNotification === undefined
            ) {
                Alert.alert("You must to set the notification time")
        } else {
            if (notificationToggle) {
                NotificationService.createNotification(
                    habitInput,
                    frequencyInput,
                    dayNotification,
                    timeNotification,
                )
            }

            HabitsService.createHabit({
                habitArea: habit?.habitArea,
                habitName: habitInput,
                habitFrequency: frequencyInput,
                habitHasNotification: notificationToggle,
                habitNotificationFrequency: dayNotification,
                habitNotificationTime: timeNotification,
                lastCheck: formatDate,
                daysWithoutChecks: 0,
                habitIsChecked: 0,
                progressBar: 1,
                habitChecks: 0,
            }).then(() => {
                Alert.alert("Habit created succesfully!")

            navigation.navigate("Home", {
            createdHabit: `Created in ${habit?.habitArea}`,
            })
        })
        }
    }

    function handleUpdateHabit() {
        if (notificationToggle === true && !dayNotification && !timeNotification) {
            Alert.alert("You must set the notification frequency and time")
        } else {
            HabitsService.updateHabit({
                habitArea: habit?.habitArea,
                habitName: habitInput,
                habitFrequency: frequencyInput,
                habitHasNotification: notificationToggle,
                habitNotificationFrequency: dayNotification,
                habitNotificationTime: timeNotification,
                habitNotificationId: notificationToggle ? habitInput : null,

            }).then(() => {
                Alert.alert("Habit updated successfully")
                if (!notificationToggle) {

                } else {

                }
            })

            navigation.navigate("Home", {
                updatedHabit: `Updated in ${habit?.habitArea}`,
            })
        }
    }

    useEffect(() => {
        if (habit?.habitHasNotification == 1) {
            setNotificationToggle(true)
            setDayNotification(habit?.habitNotificationFrequency)
            setTimeNotification(habit?.habitNotificationTime)
        }
    }, [])

    useEffect(() => {
        if (notificationToggle === false) {
            setTimeNotification(null)
            setDayNotification(null)
        }
    }, [notificationToggle])

    useEffect(() => {
        notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
            setNotification(notification)
        })
        responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
            console.log(response)
        })
        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current)
            Notifications.removeNotificationSubscription(responseListener.current)
        }
    }, [])

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

                        {create === false ? (
                            <UpdateDeleteButton
                                handleUpdate={handleUpdateHabit}
                                habitArea={habit?.habitArea}
                                habitInput={habitInput}
                            />
                        ) : (
                            <View style={styles.configButton}>
                                <DefaultButton
                                    buttonText={"Create"}
                                    handlePress={handleCreateHabit}
                                    width={250}
                                    height={50}
                                />
                            </View>
                            )
                        }
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