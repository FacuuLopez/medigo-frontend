/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useContext} from 'react';
import {AppState, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {StyledText} from '../../Common/StyledText/StyledText.component';
import {ClockIcon, DefaultProfile} from '../../../assets';
import {StyledButton} from '../../Common/StyledButton/StyledButton.component';
import {
  addDoctorLicense,
  removeDoctorDetails,
  removeRequestDetails,
  setUserState,
} from '../../../redux/user.slice';
import {
  apiCancelDoctor,
  apiLastRequestState,
} from '../../../utils/api/patientRoutes';
import {setSpinner} from '../../../utils/setSpinner';
import {setModal} from '../../../utils/setModal';
import {UserContext} from '../../../context/UserProvider';
import {formatTime} from '../../../utils/commonMethods';
import {styles} from './AppointmentConfirmed.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOTAL_TIME = 1200;

export const AppointmentConfirmed = ({logo, setDoctorReviewModal}) => {
  const {doctorDetails} = useSelector(state => state.userReducer);
  const {tokenUsuario} = useContext(UserContext);
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const getTitle = () => {
    if (doctorDetails.sexo === 'F') {
      return 'Dra.';
    }

    return 'Dr.';
  };

  const handleCancelAppoinment = async () => {
    try {
      setSpinner(true);
      const cancelRequest = await apiCancelDoctor();

      if (cancelRequest.state === 'cancelada') {
        dispatch(setUserState({appointmentState: false}));
        dispatch(removeDoctorDetails());
        dispatch(removeRequestDetails());
        setModal({
          title: 'Consulta cancelada',
          message: 'Consulta cancelada con exito',
          show: true,
        });
      }
    } catch (e) {
      console.log(e);
    } finally {
      setSpinner(false);
    }
  };

  const checkIfAppointmentEnded = async () => {
    try {
      console.log('tokenUsuario', tokenUsuario);
      if (tokenUsuario.length > 5) {
        console.log('tokenUsuarioEntro', tokenUsuario.length);
        const response = await apiLastRequestState();

        if (response.result === 'cancelada') {
          setSpinner(true);
          dispatch(setUserState({appointmentState: false}));
          dispatch(addDoctorLicense(doctorDetails.nroMatricula));
          dispatch(removeDoctorDetails());
          dispatch(removeRequestDetails());
          setModal({
            show: true,
            title: 'Consulta cancelada',
            message:
              'El medico cancelo la consulta. Puedes realizar una consulta nueva',
          });
        } else if (response.result === 'calificando') {
          setSpinner(true);
          dispatch(setUserState({appointmentState: false}));
          setDoctorReviewModal();
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      setSpinner(false);
    }
  };

  const checkIfAppointmentEndedWithToken = async () => {
    try {
      const tokenUsuarioSaved = await AsyncStorage.getItem('tokenUsuario');
      if (tokenUsuarioSaved) {
        await checkIfAppointmentEnded();
      }
    } catch (error) {
      console.error('Error fetching token or making API call:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (count === TOTAL_TIME - 120) {
        setDisabled(true);
        setTimeout(() => {
          setCount(count - 1);
        }, 1000);
      } else if (count % 6 === 0) {
        await checkIfAppointmentEndedWithToken();

        setTimeout(() => {
          setCount(count - 1);
        }, 1000);
      } else if (count > 0) {
        setTimeout(() => {
          setCount(count - 1);
        }, 1000);
      }
    };

    fetchData();
  }, [count]);

  useEffect(() => {
    setCount(TOTAL_TIME);
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <StyledText size="md" bold>
          Doctor en camino
        </StyledText>

        <View style={styles.wrapper}>
          <View style={styles.dataWrapper}>
            {logo ? logo : <DefaultProfile />}
            <View>
              <StyledText color="white" bold size="md">
                {`${getTitle()} ${doctorDetails.nombre} ${
                  doctorDetails.apellido
                }`}
              </StyledText>
              <StyledText color="white">
                {doctorDetails.especialidad}
              </StyledText>
            </View>
          </View>
          <View style={styles.time}>
            <ClockIcon fill="#FFF" style={styles.icon} />
            <StyledText color="white">
              {formatTime(doctorDetails.tiempo)} m
            </StyledText>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <StyledText color="grey">
          Tiempo restante para cancelar: 2 minutos
        </StyledText>
        <StyledButton
          style={{opacity: disabled ? 0.3 : 1}}
          disabled={disabled}
          variant="warning"
          onPress={handleCancelAppoinment}>
          Cancelar
        </StyledButton>
      </View>
    </View>
  );
};
