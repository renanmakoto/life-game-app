import React, { useEffect, useState } from "react"
import { Image, View, StyleSheet, Alert } from "react-native"
import { SelectList } from "react-native-dropdown-select-list"

export default function SelectFrequency({ habitFrequency, frequencyInput }) {
    const [selected, setSelected] = useState(
        habitFrequency ? habitFrequency : "-"
    )

    const data = [
        { key: "Daily", value: "Daily" },
        { key: "Weekly", value: "Weekly" },
        { key: "Monthly", value: "Monthly" },
    ]

    useEffect(() => {
        frequencyInput(habitFrequency ? habitFrequency : undefined)
    }, [])
    
    return (
        <View style={{ marginBottom: 20 }}>
             <SelectList
                setSelected={setSelected}
                data={data}
                search={false}
                onSelect={() => {
                    alert(selected)
                    frequencyInput(selected)
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
        </View>
    )
}

const styles = StyleSheet.create({
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
    },
    dropdownItemStyle: {
        borderWidth: 1,
        borderColor: "#BBBB",
        borderRadius: 10,
        marginBottom: 15,
    },
    dropdownTextStyle: {
        color: "#BBBBBB"
    },
    arrow: {
        width: 20,
        height: 20,
    },
})