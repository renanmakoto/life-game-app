import React, { useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { View, ScrollView, Text, StyleSheet } from "react-native"

import LifeStatus from "../../Components/Common/LifeStatus/LifeStatus"
import StatusBar from "../../Components/Home/StatusBar/StatusBar"
import CreateHabit from "../../Components/Home/CreateHabit/CreateHabit"
import EditHabit from "../../Components/Home/EditHabit/EditHabit"
import ChangeNavigationService from "../../Services/ChangeNavigationService/"
import HabitsService from "../../Services/HabitsService"
import CheckService from "../../Services/CheckService"

export default function Home({ route }) {
    const navigation = useNavigation()
    const [mindHabit, setMindHabit] = useState()
    const [moneyHabit, setMoneyHabit] = useState()
    const [bodyHabit, setBodyHabit] = useState()
    const [funHabit, setFunHabit] = useState()
    const [robotDaysLife, setRobotDaysLife] = useState()
    const today = new Date()
    const [checks, setChecks] = useState()

    function handleNavExplanation() {
        navigation.navigate("AppExplanation")
    }

    const deleteArea = route.params?.deleteArea

    useEffect(() => {
        HabitsService.findByArea("Mind").then((mind) => {
            setMindHabit(mind[0])
          })
          HabitsService.findByArea("Finance").then((money) => {
            setMoneyHabit(money[0])
          })
          HabitsService.findByArea("Body").then((body) => {
            setBodyHabit(body[0])
          })
          HabitsService.findByArea("Mood").then((fun) => {
            setFunHabit(fun[0])
          })
      
          if (deleteArea) {
            if (deleteArea == "Mind") {
              setMindHabit(null)
            }
            if (deleteArea == "Financeiro") {
              setMoneyHabit(null)
            }
            if (deleteArea == "Body") {
              setBodyHabit(null)
            }
            if (deleteArea == "Mood") {
              setFunHabit(null)
            }
          } 

        ChangeNavigationService.checkShowHome(1)
        .then((showHome) => {
            const month = `${today.getMonth() + 1}`.padStart(2, "0")
            const day = `${today.getDate()}`.padStart(2, "0")
            const formDate = `${today.getFullYear()}-${month}-${day}`
            const checkDays = new Date(formDate) - new Date(showHome.appStartData) + 1

        if (checkDays === 0) {
          setRobotDaysLife(checkDays.toString().padStart(2, "0"))
        } else {
          setRobotDaysLife(parseInt(checkDays / (1000 * 3600 * 24)))
        }
      })
      .catch((err) => console.log(err))
  }, [route.params])

    useEffect(() => {
        CheckService.removeCheck(mindHabit, moneyHabit, bodyHabit, funHabit)
        CheckService.checkStatus(mindHabit, moneyHabit, bodyHabit, funHabit)
        const mindChecks = mindHabit ? mindHabit?.habitChecks : 0
        const moneyChecks = moneyHabit ? moneyHabit?.habitChecks : 0
        const bodyChecks = bodyHabit ? bodyHabit?.habitChecks : 0
        const funChecks = funHabit ? funHabit?.habitChecks : 0
        setChecks(mindChecks + moneyChecks + bodyChecks + funChecks)
        if (
            mindHabit?.progressBar === 0 ||
            moneyHabit?.progressBar === 0 ||
            bodyHabit?.progressBar === 0 ||
            funHabit?.progressBar === 0
        ) {
            setGameOver(true)
        }
    }, [mindHabit, moneyHabit, bodyHabit, funHabit])

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={{ alignItems: "center" }}>
                <Text style={styles.dailyChecks}>
                    ❤️ {robotDaysLife} {robotDaysLife === "01" ? "day" : "days"} - ✔️{" "}
                        {checks} {checks === 1 ? "Check" : "Checks"}
                </Text>

                    <LifeStatus 
                        mindHabit={mindHabit}
                        moneyHabit={moneyHabit}
                        bodyHabit={bodyHabit}
                        funHabit={funHabit}
                    />
                    <StatusBar 
                        mindHabit={mindHabit?.progressBar}
                        moneyHabit={moneyHabit?.progressBar}
                        bodyHabit={bodyHabit?.progressBar}
                        funHabit={funHabit?.progressBar}
                    />
                    
                    {mindHabit ? (
                        <EditHabit
                            habit={mindHabit}
                            checkColor="#90B7F3"
                        />
                        ) : (
                            <CreateHabit
                                habitArea="Mind"
                                borderColor="#90B7F3"
                            />
                        )            
                    }

                    {moneyHabit ? (
                        <EditHabit
                            habit={moneyHabit}
                            checkColor="#85BB65"
                        />
                        ) : (
                            <CreateHabit
                                habitArea="Finance"
                                borderColor="#85BB65"
                            />
                        )            
                    }
                                         
                    {bodyHabit ? (
                        <EditHabit
                            habit={bodyHabit}
                            checkColor="#FF0044"
                        />
                        ) : (
                            <CreateHabit
                                habitArea="Body"
                                borderColor="#FF0044"
                            />
                        )            
                    }

                    {funHabit ? (
                        <EditHabit
                            habit={funHabit}
                            checkColor="#FE7F23"
                        />
                        ) : (
                            <CreateHabit
                                habitArea="Mood"
                                borderColor="#FE7F23"
                            />
                        )            
                    }


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