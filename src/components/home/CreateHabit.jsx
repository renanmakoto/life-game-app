import React from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

import { COLORS, ROUTES } from '../../constants';

export default function CreateHabit({ habitArea, borderColor }) {
  const navigation = useNavigation();

  const handleCreate = () => {
    navigation.navigate(ROUTES.HABIT_PAGE, {
      create: true,
      habit: { habitArea },
    });
  };

  return (
    <View>
      <TouchableOpacity
        style={[styles.button, { borderColor }]}
        activeOpacity={0.8}
        onPress={handleCreate}
      >
        <Text style={styles.habitTitle}>Add {habitArea} goal</Text>
      </TouchableOpacity>
    </View>
  );
}

CreateHabit.propTypes = {
  habitArea: PropTypes.string.isRequired,
  borderColor: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  button: {
    width: 315,
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  habitTitle: {
    color: COLORS.text.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
