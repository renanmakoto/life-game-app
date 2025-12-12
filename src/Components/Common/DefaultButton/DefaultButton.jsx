import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { COLORS } from '../../../constants';

export default function DefaultButton({
  buttonText,
  handlePress,
  width = 200,
  height = 50,
  disabled = false,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { width, height },
        disabled && styles.buttonDisabled,
      ]}
      activeOpacity={0.7}
      onPress={handlePress}
      disabled={disabled}
    >
      <Text style={[styles.buttonText, disabled && styles.textDisabled]}>
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
}

DefaultButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
  handlePress: PropTypes.func.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  disabled: PropTypes.bool,
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonDisabled: {
    borderColor: COLORS.disabled,
    opacity: 0.5,
  },
  buttonText: {
    color: COLORS.text.primary,
    fontWeight: 'bold',
    fontSize: 20,
  },
  textDisabled: {
    color: COLORS.disabled,
  },
});