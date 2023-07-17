import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import database from '@react-native-firebase/database';
import { useEffect } from 'react';
import styles from '../styling';
import { useState } from 'react';

export default function Cart() {
    const [list, setList] = useState([]);
    let getOrder = () => {
        database().ref('Menu/').once('value', snapshot => {
            const data = snapshot.val();
            console.log(Object.values(data));
            data ? setList(Object.values(data).reverse()) : null;
            setList(Object.values(data));
        });
    };

    useEffect(() => {
        getOrder();
    }, []);

    return (
        <ScrollView style={[styles.p2, styles.bgLight]}>
            {list.map((e, i) => {
                return (
                    <View style={[styles.p2, styles.bgLight]} key={i}>
                        <Text style={[styles.fs3, styles.textBold, styles.px2, styles.m1]}>Your Order ;</Text>
                        <Text style={[styles.fs3, styles.textPrimary]}>Name : {e.name}</Text>
                        <Text style={[styles.fs3, styles.textPrimary]}>Description : {e.description}</Text>
                        <Text style={[styles.fs3, styles.textPrimary]}>Calories : {e.calories}</Text>
                    </View>
                )
            })}
        </ScrollView>
    );
}