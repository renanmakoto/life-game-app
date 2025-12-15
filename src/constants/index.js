export const COLORS = {
  background: {
    primary: 'rgba(21, 21, 21, 0.98)',
    secondary: '#151515',
  },
  
  text: {
    primary: '#FFFFFF',
    secondary: '#BBBBBB',
  },
  
  habit: {
    mind: '#90B7F3',
    finance: '#85BB65',
    body: '#FF0044',
    mood: '#FE7F23',
  },
  
  status: {
    success: '#2DBE56',
    error: '#FF0044',
    warning: '#FE7F23',
  },
  
  border: '#FFFFFF',
  disabled: '#BBBBBB',
};

export const HABIT_AREAS = {
  MIND: 'Mind',
  FINANCE: 'Finance',
  BODY: 'Body',
  MOOD: 'Mood',
};

export const AREA_COLORS = {
  [HABIT_AREAS.MIND]: COLORS.habit.mind,
  [HABIT_AREAS.FINANCE]: COLORS.habit.finance,
  [HABIT_AREAS.BODY]: COLORS.habit.body,
  [HABIT_AREAS.MOOD]: COLORS.habit.mood,
};

export const FREQUENCIES = {
  DAILY: 'Daily',
  WEEKLY: 'Weekly',
  MONTHLY: 'Monthly',
};

export const FREQUENCY_OPTIONS = [
  { key: FREQUENCIES.DAILY, value: FREQUENCIES.DAILY },
  { key: FREQUENCIES.WEEKLY, value: FREQUENCIES.WEEKLY },
  { key: FREQUENCIES.MONTHLY, value: FREQUENCIES.MONTHLY },
];

export const WEEKDAYS = {
  MONDAY: 'Monday',
  TUESDAY: 'Tuesday',
  WEDNESDAY: 'Wednesday',
  THURSDAY: 'Thursday',
  FRIDAY: 'Friday',
  SATURDAY: 'Saturday',
  SUNDAY: 'Sunday',
};

export const WEEKDAY_NUMBERS = {
  [WEEKDAYS.MONDAY]: 1,
  [WEEKDAYS.TUESDAY]: 2,
  [WEEKDAYS.WEDNESDAY]: 3,
  [WEEKDAYS.THURSDAY]: 4,
  [WEEKDAYS.FRIDAY]: 5,
  [WEEKDAYS.SATURDAY]: 6,
  [WEEKDAYS.SUNDAY]: 7,
};

export const DAY_OPTIONS = [
  { key: WEEKDAYS.MONDAY, value: 'Mon' },
  { key: WEEKDAYS.TUESDAY, value: 'Tue' },
  { key: WEEKDAYS.WEDNESDAY, value: 'Wed' },
  { key: WEEKDAYS.THURSDAY, value: 'Thu' },
  { key: WEEKDAYS.FRIDAY, value: 'Fri' },
  { key: WEEKDAYS.SATURDAY, value: 'Sat' },
  { key: WEEKDAYS.SUNDAY, value: 'Sun' },
];

export const PROGRESS = {
  FULL: 1,
  HALF: 0.5,
  QUARTER: 0.25,
  EMPTY: 0,
};

export const DECAY_THRESHOLDS = {
  [FREQUENCIES.DAILY]: {
    half: 1,
    quarter: 2,
    empty: 3,
  },
  [FREQUENCIES.WEEKLY]: {
    half: 7,
    quarter: 8,
    empty: 9,
  },
  [FREQUENCIES.MONTHLY]: {
    half: 31,
    quarter: 32,
    empty: 33,
  },
};

export const REMOVE_CHECK_THRESHOLDS = {
  [FREQUENCIES.DAILY]: 0,
  [FREQUENCIES.WEEKLY]: 7,
  [FREQUENCIES.MONTHLY]: 30,
};

export const ROUTES = {
  START: 'Start',
  APP_EXPLANATION: 'AppExplanation',
  HOME: 'Home',
  HABIT_PAGE: 'HabitPage',
};

export const TABLES = {
  HABITS: 'habits',
  CHANGE_NAVIGATION: 'change_navigation',
};

export const MS_PER_DAY = 1000 * 60 * 60 * 24;

export const HABIT_ICONS = {
  [HABIT_AREAS.MIND]: require('../../assets/icons/Mind.png'),
  [HABIT_AREAS.FINANCE]: require('../../assets/icons/Money.png'),
  [HABIT_AREAS.BODY]: require('../../assets/icons/Body.png'),
  [HABIT_AREAS.MOOD]: require('../../assets/icons/Fun.png'),
};

export const STATUS_ICONS = {
  education: require('../../assets/icons/educationIcon.png'),
  money: require('../../assets/icons/moneyIcon.png'),
  body: require('../../assets/icons/bodyIcon.png'),
  fun: require('../../assets/icons/funIcon.png'),
};
