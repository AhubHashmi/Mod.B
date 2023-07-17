import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import styles from '../styling';
import SMTextField from '../component/SMTextInput';
import SMButton from '../component/SMButton';
import database from '@react-native-firebase/database';

function SignUp({ navigation }) {
    const [model, setModel] = useState({});

    let signupuser = () => {
        console.log(model);
        auth()
            .createUserWithEmailAndPassword(model.email, model.password)
            .then(res => {
                console.log(res);
                console.log(res.user.uid);
                database()
                    .ref(`appusers/${res.user.uid}`)
                    .set(model)
                    .then(() => {
                        navigation.navigate('Login', res.user.uid);
                    })
                    .catch(dbError => {
                        console.log(dbError);
                    });
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <>
            <View style={[styles.h100, styles.flexCenter, styles.bgLight]}>
                <Text>SignUp</Text>
                <View style={[styles.p2, styles.w100]}>
                    <SMTextField
                        onChangeText={e => setModel({ ...model, userName: e })}
                        label="User Name"
                    />
                </View>
                <View style={[styles.p2, styles.w100]}>
                    <SMTextField
                        onChangeText={e => setModel({ ...model, email: e })}
                        label="Email"
                    />
                </View>
                <View style={[styles.p2, styles.w100]}>
                    <SMTextField
                        onChangeText={e => setModel({ ...model, password: e })}
                        label="Password"
                    />
                </View>
                <View style={[styles.p2, styles.w100]}>
                    <SMButton onPress={signupuser} label="Sign Up" />
                </View>
            </View>
        </>
    );
}
export default SignUp;
