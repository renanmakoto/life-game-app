import { useNavigation } from "@react-navigation/native"
import React, { useState } from "react"
import { ScrollView, Text, View, StyleSheet, handleSetShowHome, handleNavHome } from "react-native"
import DefaultButton from "../../Components/Common/DefaultButton/DefaultButton"
import ExplanationCard from "../../Components/Explanation/ExpanationCard/ExpalantionCard"
import ChangeNavigationService from "../../Services/ChangeNavigationService"

export default function AppExplanation() {
    const navigation = useNavigation()
    const [showHome, setShowHome] = useState("false")
    const startDate = new Date()
    const appStartData = `${startDate.getFullYear()}-${startDate.getMonth()}-${startDate.getDate()}`

    function handleNavHome() {
        navigation.navigate("Home")
      }

      function handleSetShowHome() {
        if (showHome !== "true") {
          ChangeNavigationService.setShowHome({ showHome: "true", appStartData })
            .then(() => console.log(`Done! ${showHome} ${appStartData}`))
            .catch((err) => console.log(err))
          setShowHome("true")
          handleNavHome()
        }
      }

    return(
        <View style={styles.container}>
            <ScrollView>
                <View style={{ alignItems: "center" }}>
                    <Text style={styles.title}>
                        Let me explain {"\n"} it to you, first...
                    </Text>
                    <ExplanationCard />
                    <Text style={styles.descriptionCTA}>
                        Are you ready to level up in life?
                    </Text>
                    <Text style={styles.description}>
                        On the next screen you will be able to choose {"\n"} your 4 habits
                        individually.
                    </Text>
                    <DefaultButton
                        buttonText={"Continue"}
                        handlePress={handleSetShowHome}
                        width={250}
                        height={50}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"rgba(21, 21, 21, 0.98)",
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#FFFFFF",
        textAlign: "center",
        marginVertical: 40,
    },
    descriptionCTA: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#FFFFFF",
        marginTop: 20,
        marginBottom: 10,
    },
    description: {
        color: "#FFFFFF",
        textAlign: "center",
        marginBottom: 30,
    }
})