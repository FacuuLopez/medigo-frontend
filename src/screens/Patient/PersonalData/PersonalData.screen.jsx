import React from 'react';
import {View} from 'react-native';
import {
  FooterPatient,
  StyledButton,
  StyledText,
  WelcomePerfilHeader,
} from '../../../components';
import {PersonalDataIcon} from '../../../assets';
import {PATHS} from '../../../routes/paths';
import {styles} from './PersonalData.styles';

export const PersonalData = ({navigation}) => {
  const handleBackProfile = () => {
    navigation.navigate(PATHS.PERFILPATIENT);
  };

  return (
    <View style={styles.docInfoPatWrapper}>
      <WelcomePerfilHeader username="Joe Doe" email="joedoe@gmail.com" />
      <View style={styles.infoDocContainer}>
        <View style={styles.textsContainer}>
          <View style={styles.detailsContainer}>
            <PersonalDataIcon />
            <StyledText bold>Datos personales</StyledText>
          </View>
          <StyledText color="grey" size="default">
            DNI: 22222222
          </StyledText>
          <StyledText color="grey" size="default">
            Telefono: 11 3333 3333
          </StyledText>
        </View>

        <View style={styles.buttonsContainer}>
          <StyledButton
            onPress={handleBackProfile}
            children="Modificar datos"
          />

          <StyledButton
            variant="secondary"
            onPress={handleBackProfile}
            children="Volver"
          />
        </View>
      </View>
      <FooterPatient />
    </View>
  );
};