import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {styles} from './Register.styles';
import {StyledText} from '../../../components';
import {BigButton} from '../../../components/Common/BigButton/BigButton.component';

export const Register = () => {
  return (
    <View>
      <View style={styles.header} />
      <StyledText bold style={styles.title}>
        Registrate
      </StyledText>
      <View style={styles.body}>
        <StyledText>Elige tipo de cuenta</StyledText>
        <View style={styles.buttonsWrapper}>
          <BigButton isDoctor />
          <BigButton />
        </View>
        <View style={styles.loginWrapper}>
          <StyledText color="grey">¿Ya tienes cuenta?</StyledText>
          <TouchableOpacity>
            <StyledText color="blue">ingresa</StyledText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
