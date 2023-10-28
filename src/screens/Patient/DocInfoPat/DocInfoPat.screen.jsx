import React from 'react';
import {useSelector} from 'react-redux';
import {View} from 'react-native';
import {
  FooterPatient,
  StyledButton,
  StyledText,
  UserDataItem,
  WelcomePerfilHeader,
} from '../../../components';
import {ActivityIcon} from '../../../assets';
import {formatDate} from '../../../utils/commonMethods';
import {PATHS} from '../../../routes/paths';
import {styles} from './DocInfoPat.styles';

export const DocInfoPat = ({navigation}) => {
  const {userActivity, userData} = useSelector(state => state.userReducer);
  const handleBackActivity = () => {
    navigation.navigate(PATHS.ACTIVITYPAT);
  };

  return (
    <View style={styles.docInfoPatWrapper}>
      <WelcomePerfilHeader
        username={`${userData.nombre} ${userData.apellido}`}
        email={userData.username}
      />
      <View style={styles.infoDocContainer}>
        <View style={styles.container}>
          <View style={styles.detailsContainer}>
            <ActivityIcon />
            <StyledText bold>Detalles</StyledText>
          </View>
          <UserDataItem
            style={styles.userData}
            name={`${userActivity.name} ${userActivity.lastName}`}
            category={userActivity.speciality}
          />
          <View style={styles.textsContainer}>
            <StyledText color="grey" size="default">
              Fecha de atencion: {formatDate(userActivity.date)}
            </StyledText>
            <StyledText color="grey" size="default">
              Monto: ${userActivity.price}
            </StyledText>
            <StyledText color="grey" size="default">
              Calificacion: {userActivity.review} estrellas
            </StyledText>
            <StyledText color="grey" size="default">
              Ubicacion de atencion: {userActivity.address}
            </StyledText>
          </View>
        </View>
        <StyledButton onPress={handleBackActivity} children="Volver" />
      </View>
      <FooterPatient current="profile" />
    </View>
  );
};
