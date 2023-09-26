import React from 'react';
import {View} from 'react-native';
import {ClockIcon, DefaultProfile} from '../../../assets';
import {StyledText} from '../StyledText/StyledText.component';
import {styles} from './UserDataItem.styles';

export const UserDataItem = ({
  name = 'Nombre',
  category = 'Especialidad',
  showTime,
  logo,
  time = '15',
}) => {
  const showTimeStyle = showTime ? styles.wrapper : styles.wrapperCenter;

  return (
    <View style={showTimeStyle}>
      <View style={styles.dataWrapper}>
        {logo ? logo : <DefaultProfile />}
        <View>
          <StyledText bold size="md">
            {name}
          </StyledText>
          <StyledText color="grey">{category}</StyledText>
        </View>
      </View>
      {showTime && (
        <View style={styles.time}>
          <ClockIcon fill="#8696BB" style={styles.icon} />
          <StyledText color="grey">{time} m</StyledText>
        </View>
      )}
    </View>
  );
};