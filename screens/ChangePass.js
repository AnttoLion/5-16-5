import React, { useState } from 'react';
import { ImageBackground, View, Image, Text, StyleSheet, TouchableOpacity, TextInput, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { API_URL } from '../common/constants/appConstants';
import { msgStr } from '../common/constants/message';

import { authStyles } from './styles/authStyles';
import { useAlertModal } from '../common/hooks/useAlertModal';


const ChangePass = () => {
    const navigation = useNavigation();
    const { showAlert } = useAlertModal();
    
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [passValidMessage, setPassValidMessage] = useState('');
    const [confirmPassValidMessage, setConfirmPassValidMessage] = useState('');

    const sendResetPass = () => {
        const payload = {
            password,
            clientHost:getCurrentHost()
        };

        fetch(`${API_URL}/changepass`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
        .then(async res => { 
            switch(res.status){
                case 200:
                    showAlert('success', msgStr('resetPasslinkSent'));
                break;
                case 404:
                    //setEmailValidMessage(msgStr('emailNotFound'));
                    break;
                default:
                    if(res.message) showAlert('error', res.message);
                    else showAlert('error', msgStr('unknownError'));
                    break;
            }
        })
        .catch(err => {
            console.log(err);
            showAlert('error', msgStr('serverError'));
        });
    };
    
    const checkPasswordInput = () => {
        if (!password.trim()) {
            setPassValidMessage(msgStr('emptyField'));
        } else {
            setPassValidMessage('');
        }
    };

    const checkConfirmPasswordInput = () => {
        console.log(confirmPassword.trim());
        if (!confirmPassword.trim()) {
            setConfirmPassValidMessage(msgStr('emptyField'));
        } if (password.trim() != confirmPassword.trim()) {
            setConfirmPassValidMessage(msgStr('noMatchPass'));
        } else {
            setConfirmPassValidMessage('');
        }
    };

    const login = () => {
        navigation.navigate('Auth');
    };

    return (
        <ImageBackground source={require('../assets/gradient-back.jpeg')} style={styles.image}>
            <View style={styles.card}>
                <Image style={styles.icon} source={require('../assets/icon.png')}></Image>
                <Text style={styles.heading}>{'Change Password'}</Text>
                <View style={styles.form}>
                    <View style={styles.inputs}>
                        <TextInput secureTextEntry={true} style={styles.input} placeholder="Password" onChangeText={setPassword} onBlur={checkPasswordInput}></TextInput>
                        {(passValidMessage.trim() != '') && <Text style={[styles.message, {marginBottom: 0}]}>{passValidMessage}</Text>}
                        <TextInput secureTextEntry={true} style={styles.input} placeholder="Password" onChangeText={setConfirmPassword} onBlur={checkConfirmPasswordInput}></TextInput>
                        {(confirmPassValidMessage.trim() != '') && <Text style={[styles.message, {marginBottom: 0}]}>{confirmPassValidMessage}</Text>}
                        <View style={styles.buttonGroup}>
                            <TouchableOpacity style={styles.button} onPress={sendResetPass}>
                                <Text style={styles.buttonText}>{'Send'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonAlt} onPress={login}>
                                <Text style={styles.buttonAltText}>{'Login'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>    
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = authStyles;

export default ChangePass;