import db from "../Database/Database"

const checkHabit = (obj) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "UPDATE habits SET lastCheck=?, habitIsChecked=?, habitChecks=? WHERE habitArea=?;",
                [obj.lastCheck, obj.habitIsChecked, obj.habitChecks, obj.habitArea],
                (_, { rowsAffected }) => {
                    if (rowsAffected > 0) {
                        resolve(rowsAffected)
                    } else {
                        reject("Error updating obj")
                    }
                },
                (_, error) => reject(error)
            )
        })
    })
}

const removeCheckHabit = (obj) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "UPDATE habits SET habitIsCheked=? WHERE habitArea=?;",
                [obj.habitIsChecked, obj.habitArea],
                (_, { rowsAffected }) => {
                    if (rowsAffected > 0) {
                        resolve(rowsAffected)
                    } else {
                        reject("Error updating obj")
                    }
                },
                (_, error) => reject(error)
            )
        })
    })
}

const removeCheck = (mindHabit, moneyHabit, bodyHabit, funHabit) => {
    const date = new Date()
  
    const mindLastCheck =
      date.getDate() - (new Date(mindHabit?.lastCheck).getDate() + 1)
  
    if (mindHabit?.habitFrequency === "Daily" && mindLastCheck > 0) {
      removeCheckHabit({
        habitIsChecked: 0,
        habitArea: mindHabit?.habitArea,
      })
    }

    if (mindHabit?.habitFrequency === "Weekly" && mindLastCheck > 7) {
      removeCheckHabit({
        habitIsChecked: 0,
        habitArea: mindHabit?.habitArea,
      })
    }

    if (mindHabit?.habitFrequency === "Monthly" && mindLastCheck > 30) {
      removeCheckHabit({
        habitIsChecked: 0,
        habitArea: mindHabit?.habitArea,
      })
    }
  
    const moneyLastCheck =
      date.getDate() - (new Date(moneyHabit?.lastCheck).getDate() + 1)
  
    if (moneyHabit?.habitFrequency === "Daily" && moneyLastCheck > 0) {
      removeCheckHabit({
        habitIsChecked: 0,
        habitArea: moneyHabit?.habitArea,
      })
    }

    if (moneyHabit?.habitFrequency === "Weekly" && moneyLastCheck > 7) {
      removeCheckHabit({
        habitIsChecked: 0,
        habitArea: moneyHabit?.habitArea,
      })
    }

    if (moneyHabit?.habitFrequency === "Monthly" && moneyLastCheck > 30) {
      removeCheckHabit({
        habitIsChecked: 0,
        habitArea: moneyHabit?.habitArea,
      })
    }

    const BodyLastCheck =
      date.getDate() - (new Date(bodyHabit?.lastCheck).getDate() + 1)
  
    if (bodyHabit?.habitFrequency === "Daily" && BodyLastCheck > 0) {
      removeCheckHabit({
        habitIsChecked: 0,
        habitArea: bodyHabit?.habitArea,
      })
    }

    if (bodyHabit?.habitFrequency === "Weekly" && BodyLastCheck > 7) {
      removeCheckHabit({
        habitIsChecked: 0,
        habitArea: bodyHabit?.habitArea,
      })
    }

    if (bodyHabit?.habitFrequency === "Monthly" && BodyLastCheck > 30) {
      removeCheckHabit({
        habitIsChecked: 0,
        habitArea: bodyHabit?.habitArea,
      })
    }

    const FunLastCheck =
      date.getDate() - (new Date(funHabit?.lastCheck).getDate() + 1)

    if (funHabit?.habitFrequency === "Daily" && FunLastCheck > 0) {
      removeCheckHabit({
        habitIsChecked: 0,
        habitArea: funHabit?.habitArea,
      })
    }

    if (funHabit?.habitFrequency === "Weekly" && FunLastCheck > 7) {
      removeCheckHabit({
        habitIsChecked: 0,
        habitArea: funHabit?.habitArea,
      })
    }

    if (funHabit?.habitFrequency === "Monthly" && FunLastCheck > 30) {
      removeCheckHabit({
        habitIsChecked: 0,
        habitArea: funHabit?.habitArea,
      })
    }
}
  
const checkStatus = (mindHabit, moneyHabit, bodyHabit, funHabit) => {
  const date = new Date()
  
    
  // Mind verification
  const mindLastCheck = date - new Date(mindHabit?.lastCheck)
  
  const mindDiff = parseInt(mindLastCheck / (1000 * 3600 * 24))
  
  if (mindHabit?.habitFrequency === "Daily") {
    if (mindDiff === 1) {
      HabitsService.changeProgress({
        progressBar: 0.5,
        habitArea: mindHabit?.habitArea,
      })
    } else if (mindDiff === 2) {
       HabitsService.changeProgress({
        progressBar: 0.25,
        habitArea: mindHabit?.habitArea,
      })
    } else if (mindDiff >= 3) {
      HabitsService.changeProgress({
        progressBar: 0,
        habitArea: mindHabit?.habitArea,
      })
    }
  }

  if (mindHabit?.habitFrequency === "Weekly") {
    if (mindDiff === 8) {
      HabitsService.changeProgress({
        progressBar: 0.5,
        habitArea: mindHabit?.habitArea,
      })
    } else if (mindDiff === 9) {
      HabitsService.changeProgress({
        progressBar: 0.25,
        habitArea: mindHabit?.habitArea,
      })
    } else if (mindDiff >= 10) {
      HabitsService.changeProgress({
        progressBar: 0,
        habitArea: mindHabit?.habitArea,
      })
    }
  }

  if (mindHabit?.habitFrequency === "Monthly") {
    if (mindDiff === 31) {
      HabitsService.changeProgress({
        progressBar: 0.5,
        habitArea: mindHabit?.habitArea,
      })
    } else if (mindDiff === 32) {
      HabitsService.changeProgress({
        progressBar: 0.25,
        habitArea: mindHabit?.habitArea,
      })
    } else if (mindDiff >= 33) {
      HabitsService.changeProgress({
        progressBar: 0,
        habitArea: mindHabit?.habitArea,
      })
    }
  }
  
  //Finance verification
  const moneyLastCheck = date - new Date(moneyHabit?.lastCheck)
  
  const moneyDiff = parseInt(moneyLastCheck / (1000 * 3600 * 24))
  
  if (moneyHabit?.habitFrequency === "Daily") {
    if (moneyDiff === 1) {
      HabitsService.changeProgress({
        progressBar: 0.5,
        habitArea: moneyHabit?.habitArea,
      })
    } else if (moneyDiff === 2) {
      HabitsService.changeProgress({
        progressBar: 0.25,
        habitArea: moneyHabit?.habitArea,
      })
    } else if (moneyDiff >= 3) {
      HabitsService.changeProgress({
        progressBar: 0,
        habitArea: moneyHabit?.habitArea,
      })
    }
  }

  if (moneyHabit?.habitFrequency === "Weekly") {
    if (moneyDiff === 7) {
      HabitsService.changeProgress({
        progressBar: 0.5,
        habitArea: moneyHabit?.habitArea,
      })
    } else if (moneyDiff === 8) {
      HabitsService.changeProgress({
        progressBar: 0.25,
        habitArea: moneyHabit?.habitArea,
      })
    } else if (moneyDiff >= 9) {
      HabitsService.changeProgress({
        progressBar: 0,
        habitArea: moneyHabit?.habitArea,
      })
    }
  }

  if (moneyHabit?.habitFrequency === "Monthly") {
    if (moneyDiff === 31) {
      HabitsService.changeProgress({
        progressBar: 0.5,
        habitArea: moneyHabit?.habitArea,
      })
    } else if (moneyDiff === 32) {
      HabitsService.changeProgress({
        progressBar: 0.25,
        habitArea: moneyHabit?.habitArea,
      })
    } else if (moneyDiff >= 33) {
      HabitsService.changeProgress({
        progressBar: 0,
        habitArea: moneyHabit?.habitArea,
      })
    }
  }

  // Body verification
  const bodyLastCheck = date - new Date(bodyHabit?.lastCheck)
  
  const bodyDiff = parseInt(bodyLastCheck / (1000 * 3600 * 24))
  if (bodyHabit?.habitFrequency === "Daily") {
    if (bodyDiff === 1) {
      HabitsService.changeProgress({
        progressBar: 0.5,
        habitArea: bodyHabit?.habitArea,
      })
    } else if (bodyDiff === 2) {
      HabitsService.changeProgress({
        progressBar: 0.25,
        habitArea: bodyHabit?.habitArea,
      })
    } else if (bodyDiff >= 3) {
      HabitsService.changeProgress({
        progressBar: 0,
        habitArea: bodyHabit?.habitArea,
      })
    }
  }

  if (bodyHabit?.habitFrequency === "Weekly") {
    if (bodyDiff === 7) {
      HabitsService.changeProgress({
        progressBar: 0.5,
        habitArea: bodyHabit?.habitArea,
      })
    } else if (bodyDiff === 8) {
      HabitsService.changeProgress({
        progressBar: 0.25,
        habitArea: bodyHabit?.habitArea,
      })
    } else if (bodyDiff >= 9) {
      HabitsService.changeProgress({
        progressBar: 0,
        habitArea: bodyHabit?.habitArea,
      })
    }
  }
  
  if (bodyHabit?.habitFrequency === "Monthly") {
    if (bodyDiff === 31) {
      HabitsService.changeProgress({
        progressBar: 0.5,
        habitArea: bodyHabit?.habitArea,
      })
    } else if (bodyDiff === 32) {
      HabitsService.changeProgress({
        progressBar: 0.25,
        habitArea: bodyHabit?.habitArea,
      })
    } else if (bodyDiff >= 33) {
      HabitsService.changeProgress({
        progressBar: 0,
        habitArea: bodyHabit?.habitArea,
      })
    }
  }

  // Fun verification
  const funLastCheck = date - new Date(funHabit?.lastCheck)
  
  const funDiff = parseInt(funLastCheck / (1000 * 3600 * 24))
  if (funHabit?.habitFrequency === "Daily") {
    if (funDiff === 1) {
      HabitsService.changeProgress({
        progressBar: 0.5,
        habitArea: funHabit?.habitArea,
      })
    } else if (funDiff === 2) {
      HabitsService.changeProgress({
        progressBar: 0.25,
        habitArea: funHabit?.habitArea,
      })
    } else if (funDiff >= 3) {
      HabitsService.changeProgress({
        progressBar: 0,
        habitArea: funHabit?.habitArea,
      })
    }
  }

  if (funHabit?.habitFrequency === "Weekly") {
    if (funDiff === 7) {
      HabitsService.changeProgress({
        progressBar: 0.5,
        habitArea: funHabit?.habitArea,
      })
    } else if (funDiff === 8) {
      HabitsService.changeProgress({
        progressBar: 0.25,
        habitArea: funHabit?.habitArea,
      })
    } else if (funDiff >= 9) {
      HabitsService.changeProgress({
        progressBar: 0,
        habitArea: funHabit?.habitArea,
      })
    }
  }

  if (funHabit?.habitFrequency === "Monthly") {
    if (funDiff === 31) {
      HabitsService.changeProgress({
        progressBar: 0.5,
        habitArea: funHabit?.habitArea,
      })
    } else if (funDiff === 32) {
      HabitsService.changeProgress({
        progressBar: 0.25,
        habitArea: funHabit?.habitArea,
      })
    } else if (funDiff >= 33) {
      HabitsService.changeProgress({
        progressBar: 0,
        habitArea: funHabit?.habitArea,
      })
    }
  }
}

export default {
    checkHabit,
    removeCheckHabit,
    removeCheck,
    checkStatus,
}