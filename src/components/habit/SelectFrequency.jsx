import React, { useEffect, useState } from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import PropTypes from 'prop-types';

import { COLORS, FREQUENCY_OPTIONS } from '../../constants';

export default function SelectFrequency({ habitFrequency, frequencyInput }) {
  const [selected, setSelected] = useState(habitFrequency || '-');

  useEffect(() => {
    frequencyInput(habitFrequency || undefined);
  }, [habitFrequency, frequencyInput]);

  const handleSelect = () => {
    frequencyInput(selected);
  };

  return (
    <View style={styles.container}>
      <SelectList
        setSelected={setSelected}
        data={FREQUENCY_OPTIONS}
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

SelectFrequency.propTypes = {
  habitFrequency: PropTypes.string,
  frequencyInput: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
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