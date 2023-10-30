/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, ScrollView, Keyboard} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useSelector} from 'react-redux';
import {StyledButton, StyledText, StyledInput} from '../..';
import {PersonalDataIcon} from '../../../assets';
import {PATHS} from '../../../routes/paths';
import {styles} from './ModifyPersonalData.styles';

export const ModifyPersonalData = ({setHideFooter}) => {
  const {doctorData} = useSelector(state => state.doctorReducer);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
        setHideFooter(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
        setHideFooter(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = async data => {
    if (data) {
      try {
        console.log(data);
        navigation.navigate(PATHS.PERSONALDATADOC);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleBackActivity = () => {
    navigation.navigate(PATHS.PERSONALDATADOC);
  };

  return (
    <View style={styles.infoDocContainer}>
      <View style={styles.detailsContainer}>
        <PersonalDataIcon />
        <StyledText bold>Datos personales</StyledText>
      </View>
      <ScrollView
        contentContainerStyle={styles.inputContent}
        style={styles.inputWrapper}>
        <Controller
          control={control}
          name="sexo"
          defaultValue={doctorData.sexo[0]}
          rules={{
            required: 'El sexo es obligatorio',
            validate: {
              validSex: value =>
                ['M', 'F', 'O'].includes(value) || 'Ingresa M, F o O',
            },
          }}
          render={({field}) => (
            <StyledInput
              field={field}
              label="Sexo (M / F / O)"
              style={styles.input}
              name="sexo"
              error={errors.sexo?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="username"
          defaultValue={doctorData.username}
          rules={{
            required: 'El correo electrónico es obligatorio',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Correo electrónico inválido',
            },
          }}
          render={({field}) => (
            <StyledInput
              label="Email"
              style={styles.input}
              field={field}
              name="username"
              error={errors.username?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={{
            required: 'La contraseña es obligatoria',
            minLength: {
              value: 6,
              message: 'La contraseña debe tener al menos 6 caracteres',
            },
          }}
          render={({field}) => (
            <StyledInput
              label="Contraseña"
              style={styles.input}
              field={field}
              name="password"
              error={errors.password?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="telefono"
          defaultValue={doctorData.telefono}
          rules={{
            required: 'El teléfono es obligatorio',
            pattern: {
              value: /^[0-9]{9,10}$/,
              message: 'Número de teléfono inválido',
            },
          }}
          render={({field}) => (
            <StyledInput
              label="Teléfono"
              keyboardType="numeric"
              style={styles.input}
              field={field}
              name="telefono"
              error={errors.telefono?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="direccion"
          defaultValue={doctorData.direccion}
          rules={{
            required: 'La dirección es obligatoria',
          }}
          render={({field}) => (
            <StyledInput
              label="Dirección"
              style={styles.input}
              field={field}
              name="direccion"
              error={errors.direccion?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="especialidad"
          defaultValue={doctorData.especialidad}
          rules={{
            required: 'La especialidad es obligatoria',
          }}
          render={({field}) => (
            <StyledInput
              label="Especialidad"
              style={styles.input}
              field={field}
              name="especialidad"
              error={errors.especialidad?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="precio"
          defaultValue={doctorData.precio}
          rules={{
            required: 'El precio es obligatorio',
            validate: {
              isNumber: value =>
                !isNaN(parseFloat(value)) || 'El precio debe ser un número',
              greaterThan1000: value =>
                parseFloat(value) >= 1000 || 'El precio debe ser mayor a 1000',
            },
          }}
          render={({field}) => (
            <StyledInput
              label="Precio"
              style={styles.input}
              keyboardType="numeric"
              field={field}
              name="precio"
              error={errors.precio?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="radioAccion"
          defaultValue={doctorData.radioAccion}
          rules={{
            required: 'El radio de acción es obligatorio',
            validate: {
              isNumber: value =>
                !isNaN(parseFloat(value)) ||
                'El radio de acción debe ser un número',
            },
          }}
          render={({field}) => (
            <StyledInput
              label="Radio de acción (KM)"
              style={styles.input}
              keyboardType="numeric"
              field={field}
              name="radioAccion"
              error={errors.radioAccion?.message}
            />
          )}
        />
      </ScrollView>
      {!isKeyboardVisible && (
        <View style={styles.buttonsContainer}>
          <StyledButton onPress={handleSubmit(onSubmit)}>
            Confirmar
          </StyledButton>

          <StyledButton variant="secondary" onPress={handleBackActivity}>
            Volver
          </StyledButton>
        </View>
      )}
    </View>
  );
};
