import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import PropTypes from 'prop-types';

import HabitsData from '../../data/habitsData';
import { COLORS, HABIT_AREAS } from '../../constants';

const AREA_DATA_MAP = {
  [HABIT_AREAS.MIND]: HabitsData.dataMind,
  [HABIT_AREAS.FINANCE]: HabitsData.dataMoney,
  [HABIT_AREAS.BODY]: HabitsData.dataBody,
  [HABIT_AREAS.MOOD]: HabitsData.dataFun,
};

export default function SelectHabit({ habit, habitInput }) {
  const [selected, setSelected] = useState(habit?.habitName || '-');
  const [data, setData] = useState([]);

  useEffect(() => {
    const areaData = AREA_DATA_MAP[habit?.habitArea] || [];
    setData(areaData);
    habitInput(habit?.habitName || undefined);
  }, [habit, habitInput]);

  const handleSelect = () => {
    habitInput(selected);
  };

  return (
    <View>
      <SelectList
        setSelected={setSelected}
        data={data}
        search={false}
        onSelect={handleSelect}
        placeholder={selected}
        boxStyles={styles.boxStyle}
        inputStyles={styles.inputStyle}
        dropdownStyles={styles.dropdownStyle}
        dropdownItemStyles={styles.dropdownItemStyle}
        dropdownTextStyles={styles.dropdownTextStyle}
        arrowicon={
          <Image
            source={require('../../../assets/icons/arrowDropdown.png')}
            style={styles.arrow}
          />
        }
      />
    </View>
  );
}

SelectHabit.propTypes = {
  habit: PropTypes.object,
  habitInput: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  boxStyle: {
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  inputStyle: {
    color: COLORS.text.primary,
  },
  dropdownStyle: {
    borderWidth: 0,
  },
  dropdownItemStyle: {
    borderWidth: 1,
    borderColor: COLORS.text.secondary,
    borderRadius: 10,
    marginBottom: 15,
  },
  dropdownTextStyle: {
    color: COLORS.text.secondary,
  },
  arrow: {
    width: 20,
    height: 20,
  },
});