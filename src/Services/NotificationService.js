import * as Notifications from "expo-notifications"
async function createNotification(
  habitInput,
  frequencyInput,
  dayNotification,
  timeNotification
) {
  const habitHour = Number(timeNotification.slice(0, 2))
  const habitMinutes = Number(timeNotification.slice(3, 5))

  let weekDay

  if (dayNotification === "Monday") {
    weekDay = 1
  } else if (dayNotification === "Tuesday") {
    weekDay = 2
  } else if (dayNotification === "Wednesday") {
    weekDay = 3
  } else if (dayNotification === "Thursday") {
    weekDay = 4
  } else if (dayNotification === "Friday") {
    weekDay = 5
  } else if (dayNotification === "Saturday") {
    weekDay = 6
  } else if (dayNotification === "Sunday") {
    weekDay = 7
  }

  let triggerNotification
  if (frequencyInput === "Daily") {
    triggerNotification = {
      hour: habitHour,
      minute: habitMinutes,
      repeats: true,
    }
  } else if (frequencyInput === "Weekly") {
    triggerNotification = {
      repeats: true,
      weekday: weekDay,
      hour: habitHour,
      minute: habitMinutes,
    }
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Habit reminder:",
      body: `${habitInput}`,
    },
    identifier: `${habitInput}`,
    trigger: triggerNotification,
  }).then((id) => {
    console.log(id)
  })
}

async function deleteNotification(habitInput) {
  await Notifications.cancelScheduledNotificationAsync(habitInput).then(() => {
    console.log("Deletion successfully made!")
  })
}

export default {
  createNotification,
  deleteNotification,
}
