import { PROGRESS } from '../constants';

const ANIMATIONS = {
  education: {
    full: require('../../assets/education/education-100.json'),
    half: require('../../assets/education/education-50.json'),
    quarter: require('../../assets/education/education-25.json'),
  },
  money: {
    full: require('../../assets/money/money-100.json'),
    half: require('../../assets/money/money-50.json'),
    quarter: require('../../assets/money/money-25.json'),
  },
  robot: {
    gameOver: require('../../assets/robot/robot-00-00.json'),
    '100-100': require('../../assets/robot/robot-100-100.json'),
    '100-50': require('../../assets/robot/robot-100-50.json'),
    '100-25': require('../../assets/robot/robot-100-25.json'),
    '50-100': require('../../assets/robot/robot-50-100.json'),
    '50-50': require('../../assets/robot/robot-50-50.json'),
    '50-25': require('../../assets/robot/robot-50-25.json'),
    '25-100': require('../../assets/robot/robot-25-100.json'),
    '25-50': require('../../assets/robot/robot-25-50.json'),
    '25-25': require('../../assets/robot/robot-25-25.json'),
  },
};

const progressToPercent = (progress) => {
  if (progress === PROGRESS.FULL || progress === undefined) return '100';
  if (progress === PROGRESS.HALF) return '50';
  if (progress === PROGRESS.QUARTER) return '25';
  return '100';
};

const getEducationAnimation = (progress) => {
  if (progress === PROGRESS.HALF) return ANIMATIONS.education.half;
  if (progress === PROGRESS.QUARTER) return ANIMATIONS.education.quarter;
  return ANIMATIONS.education.full;
};

const getMoneyAnimation = (progress) => {
  if (progress === PROGRESS.HALF) return ANIMATIONS.money.half;
  if (progress === PROGRESS.QUARTER) return ANIMATIONS.money.quarter;
  return ANIMATIONS.money.full;
};

const getRobotAnimation = (bodyProgress, moodProgress) => {
  const bodyPercent = progressToPercent(bodyProgress);
  const moodPercent = progressToPercent(moodProgress);
  const key = `${bodyPercent}-${moodPercent}`;
  
  return ANIMATIONS.robot[key] || ANIMATIONS.robot['100-100'];
};

const isGameOver = (...progressValues) => {
  return progressValues.some((progress) => progress === PROGRESS.EMPTY);
};

const animationStatus = (
  mindProgress,
  moneyProgress,
  bodyProgress,
  moodProgress,
  setMind,
  setMoney,
  setRobot
) => {
  if (isGameOver(mindProgress, moneyProgress, bodyProgress, moodProgress)) {
    setMind(null);
    setMoney(null);
    setRobot(ANIMATIONS.robot.gameOver);
    return;
  }

  setMind(getEducationAnimation(mindProgress));
  setMoney(getMoneyAnimation(moneyProgress));
  setRobot(getRobotAnimation(bodyProgress, moodProgress));
};

export default {
  animationStatus,
  getEducationAnimation,
  getMoneyAnimation,
  getRobotAnimation,
  isGameOver,
};