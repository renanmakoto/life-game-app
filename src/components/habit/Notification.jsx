import React from 'react';
import { StyleSheet, View, Text, Switch } from 'react-native';
import PropTypes from 'prop-types';

import { COLORS } from '../../constants';

export default function Notification({
  notificationToggle,
  setNotificationToggle,
}) {
  const handleToggle = () => {
    setNotificationToggle((previousState) => !previousState);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notification</Text>
      <Switch
        trackColor={{
          false: COLORS.status.error,
          true: COLORS.status.success,
        }}
        thumbColor={COLORS.text.primary}
        ios_backgroundColor="#3E3E3E"
        onValueChange={handleToggle}
        value={notificationToggle}
      />
    </View>
  );
}

Notification.propTypes = {
  notificationToggle: PropTypes.bool,
  setNotificationToggle: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    color: COLORS.text.primary,
    fontSize: 20,
    marginRight: 10,
  },
});