import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../styling';
import logo from '../assets/logo.png';

function Splash({ navigation }) {
    return (
        <>
            <View style={[styles.bgLight, styles.h100, styles.flexCenter]}>
                <View>
                    <Image
                        source={logo}
                        resizeMode="contain"
                        style={{ width: 250, height: 250 }}
                    />
                </View>
                <View>
                    <Text style={[styles.fs3, styles.textCenter, styles.p3]}>
                        Food App with Firebase Authentication and realtime database.
                    </Text>
                </View>
                <View>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Login');
                        }}
                        style={styles.btn}>
                        <Text style={[styles.textWhite, styles.fs3]}>Get Started</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}
export default Splash;
