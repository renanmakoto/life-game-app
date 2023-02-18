import React from "react"
import { Image, Text, View, StyleSheet } from "react-native"

export default function ExplanationCard() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Through this App you will develop {"\n"} 4 habits of 4 important fields:
            </Text>
            <View style={styles.explanationContainer}>
                <Image 
                    source={require("../../../../assets/icons/educationIcon.png")} 
                    style={styles.icon}
                />
                <Text style={styles.description}>
                    <Text style={styles.mind}>Mind: </Text> Improve you intelligence/mindset
                </Text>
            </View>

            <View style={styles.explanationContainer}>
                <Image 
                    source={require("../../../../assets/icons/moneyIcon.png")} 
                    style={styles.icon}
                />
                <Text style={styles.description}>
                    <Text style={styles.money}>Finance: </Text> Help your financial life
                </Text>
            </View>

            <View style={styles.explanationContainer}>
                <Image 
                    source={require("../../../../assets/icons/bodyIcon.png")} 
                    style={styles.icon}
                />
                <Text style={styles.description}>
                    <Text style={styles.body}>Body: </Text> Be healthier and stronger
                </Text>
            </View>

            <View style={styles.explanationContainer}>
                <Image 
                    source={require("../../../../assets/icons/funIcon.png")} 
                    style={styles.icon}
                />
                <Text style={styles.description}>
                    <Text style={styles.fun}>Mood: </Text> Handle stress and feel happier
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#151515",
        width: 350,
        borderRadius: 25,
        padding: 30,
    },
    title: {
        fontWeight: "bold",
        color: "#FFFFFF",
        textAlign: "center",
        fontSize: 16,
    },
    explanationContainer: {
        flexDirection: "row",
        marginTop: 30,
    },
    icon: {
        width: 40,
        height: 40,
        marginRight: 5,
    },
    mind: {
        fontWeight: "bold",
        color: "#90B7F3"
    },
    money: {
        fontWeight: "bold",
        color: "#85BB65"
    },
    body: {
        fontWeight: "bold",
        color: "#FF0044",
    },
    fun: {
        fontWeight: "bold",
        color: "#FE7F23",
    },
    description: {
        fontWeight: "bold",
        color: "#FFFFFF"
    }
})