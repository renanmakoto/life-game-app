import db from "../Database/Database"

const checkHabit = (obj) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "UPDATE habits SET lastCheck=7, habitIsChecked=7, habitChecks=7 WHERE habitArea=?;",
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

export default {
    checkHabit,
}