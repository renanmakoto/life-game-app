import DateTimePicker from '@react-native-community/datetimepicker'
import React, { useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native"
import { SelectList } from "react-native-dropdown-select-list"

export default function TimeDataPicker({
    frequency,
    dayNotification,
    timeNotification,
    setDayNotification,
    setTimeNotification
}) {
    const [date, setDate] = useState(new Date())
    const [mode, setMode] = useState("date")
    const [show, setShow] = useState(false)
    const [selected, setSelected] = useState("-")
    const [notificationDate, setNotificationDate] = useState()
    const [notificationTime, setNotificationTime] = useState()

    const onChange = (_, selectDate) => {
        const currentDate = selectDate || date
        setShow(Platform.OS === "ios")
        setDate(currentDate)
        let tempDate = new Date(currentDate)
        const notificationHour = tempDate.getHours().toString().padStart(2, "0")
        const notificationMin = tempDate.getMinutes().toString().padStart(2, "0")
        let dateNotification

        if (frequency === "Weekly") {
            dateNotification = selected
        }
        const timeNotification = `${notificationHour}:${notificationMin}`

        setNotificationDate(dateNotification)
        setNotificationTime(timeNotification)

        if (frequency === "Daily") {
            setDayNotification("Daily")
        } else {
            setDayNotification(dateNotification)
        }
        setTimeNotification(timeNotification)
    }

    const showMode = (currentMode) => {
        setShow(true)
        setMode(currentMode)
    }

    const data = [
        { key: "Monday", value: "Mon" },
        { key: "Tuesday", value: "Tue" },
        { key: "Wednesday", value: "Wed" },
        { key: "Thursday", value: "Thu" },
        { key: "Friday", value: "Fri" },
        { key: "Saturday", value: "Sat" },
        { key: "Sunday", value: "Sun" },
    ]
    //Not necessary to be put externally, for it is too little information

    return (
        <View>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => {
                    showMode("time")
                }}
            >
                <Text style={styles.buttonText}>
                    Select time
                </Text>
            </TouchableOpacity>
            
            <View style={styles.textContainer}>
                {frequency === "Daily" ? (
                    <Text style={styles.notificationText}>Habit Day: Daily</Text>
                ): null}
                {frequency === "Weekly" ? (
                    <SelectList
                        data={data}
                        search={false}
                        setSelected={setSelected}
                        onSelect={() => {
                            onChange()
                        }}
                        placeholder={selected}
                        boxStyles={styles.boxStyle}
                        inputStyles={styles.inputStyle}
                        dropdownStyles={styles.dropdownStyle}
                        dropdownItemStyles={styles.dropdownItemStyle}
                        dropdownTextStyles={styles.dropdownTextStyle}
                        arrowicon={
                            <Image
                                source={require("../../../assets/icons/arrowDropdown.png")}
                                style={styles.arrow}
                            />
                        }
                    />
                ) : null}

                {frequency === "Weekly" ? (
                    <Text style={styles.notificationText}>Habit Day: {notificationDate}</Text>
                ): null}
                <Text style={styles.notificationText}>Habit time: {notificationTime}</Text>
            </View>
            {show && (
                <DateTimePicker
                    testID="DateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        borderColor: "#FFFFFF",
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15,
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "bold",
    },
    textContainer: {
        marginVertical: 20,
    },
    notificationText: {
        fontSize: 18,
        color: "#FFFFFF",
    },
    boxStyle: {
        borderWidth: 1,
        borderColor: "#FFFFFF",
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    inputStyle: {
        color: "#FFFFFF"
    },
    dropdownStyle: {
        borderWidth: 0,
        maxHeight: 100,
    },
    dropdownItemStyle: {
        borderWidth: 1,
        borderColor: "#BBBB",
        borderRadius: 10,
        marginBottom: 15,
    },
    dropdownTextStyle: {
        color: "#BBBBBB",
    },
    arrow: {
        width: 20,
        height: 20,
    },
})