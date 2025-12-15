import React, { useEffect, useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, ScrollView, Text, StyleSheet } from 'react-native';

import LifeStatus from '../components/common/LifeStatus';
import StatusBar from '../components/home/StatusBar';
import CreateHabit from '../components/home/CreateHabit';
import EditHabit from '../components/home/EditHabit';
import DefaultButton from '../components/common/DefaultButton';
import ChangeNavigationService from '../services/ChangeNavigationService';
import HabitsService from '../services/HabitsService';
import CheckService from '../services/CheckService';
import { COLORS, HABIT_AREAS, AREA_COLORS, ROUTES, PROGRESS } from '../constants';
import { getDaysDifference, pluralize } from '../utils';

export default function Home({ route }) {
  const navigation = useNavigation();
  
  const [mindHabit, setMindHabit] = useState(null);
  const [moneyHabit, setMoneyHabit] = useState(null);
  const [bodyHabit, setBodyHabit] = useState(null);
  const [funHabit, setFunHabit] = useState(null);
  
  const [daysAlive, setDaysAlive] = useState(0);
  const [totalChecks, setTotalChecks] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const deleteArea = route.params?.deleteArea;

  const loadHabits = useCallback(async () => {
    try {
      const [mind, money, body, mood] = await Promise.all([
        HabitsService.findByArea(HABIT_AREAS.MIND),
        HabitsService.findByArea(HABIT_AREAS.FINANCE),
        HabitsService.findByArea(HABIT_AREAS.BODY),
        HabitsService.findByArea(HABIT_AREAS.MOOD),
      ]);

      setMindHabit(mind[0] || null);
      setMoneyHabit(money[0] || null);
      setBodyHabit(body[0] || null);
      setFunHabit(mood[0] || null);
    } catch (error) {
      console.error('Error loading habits:', error);
    }
  }, []);

  const loadAppStartDate = useCallback(async () => {
    try {
      const result = await ChangeNavigationService.checkShowHome(1);
      const days = getDaysDifference(result.appStartData);
      setDaysAlive(days);
    } catch (error) {
      console.error('Error loading app start date:', error);
    }
  }, []);

  const handleExplanation = () => {
    navigation.navigate(ROUTES.APP_EXPLANATION);
  };

  const handleGameOver = async () => {
    try {
      await Promise.all([
        HabitsService.dropTable(),
        ChangeNavigationService.dropTable(),
      ]);
      navigation.navigate(ROUTES.START);
    } catch (error) {
      console.error('Error resetting game:', error);
    }
  };

  useEffect(() => {
    loadHabits();
    loadAppStartDate();
  }, [loadHabits, loadAppStartDate]);

  useEffect(() => {
    if (deleteArea) {
      const areaSetterMap = {
        [HABIT_AREAS.MIND]: setMindHabit,
        [HABIT_AREAS.FINANCE]: setMoneyHabit,
        [HABIT_AREAS.BODY]: setBodyHabit,
        [HABIT_AREAS.MOOD]: setFunHabit,
      };
      
      const setter = areaSetterMap[deleteArea];
      if (setter) {
        setter(null);
      }
    }
  }, [deleteArea]);

  useEffect(() => {
    CheckService.removeCheck(mindHabit, moneyHabit, bodyHabit, funHabit);
    CheckService.checkStatus(mindHabit, moneyHabit, bodyHabit, funHabit);

    const checks = [mindHabit, moneyHabit, bodyHabit, funHabit]
      .reduce((sum, habit) => sum + (habit?.habitChecks || 0), 0);
    setTotalChecks(checks);

    const gameOver = [mindHabit, moneyHabit, bodyHabit, funHabit]
      .some((habit) => habit?.progressBar === PROGRESS.EMPTY);
    setIsGameOver(gameOver);
  }, [mindHabit, moneyHabit, bodyHabit, funHabit]);

  const renderHabitCard = (habit, area) => {
    if (habit) {
      return <EditHabit habit={habit} checkColor={AREA_COLORS[area]} />;
    }
    return <CreateHabit habitArea={area} borderColor={AREA_COLORS[area]} />;
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {!isGameOver ? (
            <Text style={styles.statsText}>
              ❤️ {daysAlive} {pluralize(daysAlive, 'day', 'days')} - ✔️ {totalChecks} {pluralize(totalChecks, 'check', 'checks')}
            </Text>
          ) : (
            <Text style={styles.gameOverTitle}>Game Over</Text>
          )}

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

          {!isGameOver ? (
            <View>
              {renderHabitCard(mindHabit, HABIT_AREAS.MIND)}
              {renderHabitCard(moneyHabit, HABIT_AREAS.FINANCE)}
              {renderHabitCard(bodyHabit, HABIT_AREAS.BODY)}
              {renderHabitCard(funHabit, HABIT_AREAS.MOOD)}
              
              <Text style={styles.explanationLink} onPress={handleExplanation}>
                See explanation again
              </Text>
            </View>
          ) : (
            <View style={styles.resetContainer}>
              <DefaultButton
                buttonText="Reset game"
                handlePress={handleGameOver}
                width={250}
                height={50}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  content: {
    alignItems: 'center',
  },
  statsText: {
    color: COLORS.text.primary,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    marginTop: 40,
  },
  explanationLink: {
    color: COLORS.text.primary,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
    paddingTop: 15,
    paddingBottom: 25,
  },
  gameOverTitle: {
    marginVertical: 25,
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  resetContainer: {
    marginVertical: 40,
  },
});
