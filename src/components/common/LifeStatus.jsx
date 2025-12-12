import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Lottie from 'lottie-react-native';
import PropTypes from 'prop-types';

import AnimationService from '../../services/AnimationService';

export default function LifeStatus({
  mindHabit,
  moneyHabit,
  bodyHabit,
  funHabit,
}) {
  const [mindAnimation, setMindAnimation] = useState(null);
  const [moneyAnimation, setMoneyAnimation] = useState(null);
  const [robotAnimation, setRobotAnimation] = useState(null);

  useEffect(() => {
    AnimationService.animationStatus(
      mindHabit?.progressBar,
      moneyHabit?.progressBar,
      bodyHabit?.progressBar,
      funHabit?.progressBar,
      setMindAnimation,
      setMoneyAnimation,
      setRobotAnimation
    );
  }, [mindHabit, moneyHabit, bodyHabit, funHabit]);

  return (
    <View style={styles.container}>
      {mindAnimation && (
        <Lottie
          source={mindAnimation}
          autoPlay
          loop
          style={styles.educationAnimation}
        />
      )}
      {moneyAnimation && (
        <Lottie
          source={moneyAnimation}
          autoPlay
          loop
          style={styles.financeAnimation}
        />
      )}
      {robotAnimation && (
        <Lottie
          source={robotAnimation}
          autoPlay
          loop
          style={styles.robotAnimation}
        />
      )}
    </View>
  );
}

LifeStatus.propTypes = {
  mindHabit: PropTypes.object,
  moneyHabit: PropTypes.object,
  bodyHabit: PropTypes.object,
  funHabit: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 300,
  },
  educationAnimation: {
    width: 100,
    marginTop: 50,
    marginLeft: 5,
    position: 'absolute',
  },
  financeAnimation: {
    width: 100,
    marginTop: 50,
    marginLeft: 95,
    position: 'absolute',
  },
  robotAnimation: {
    width: 190,
    marginTop: 30,
    marginLeft: 25,
  },
});
