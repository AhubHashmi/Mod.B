import { View, Text } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-vector-icons/FontAwesome'

export default function VectorIcons() {
    return (
        <View>
            <Text>
                <Icon name="user" size={40} color="#900" /> USER
            </Text>
        </View>
    )
}