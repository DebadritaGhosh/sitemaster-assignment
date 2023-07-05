//Importing system
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
//Importing utils
import responsive from '../helpers/responsive'
import { color } from '../globalStyles/color'

const ActionButton = () => {
    return (
        <View style={styles.actionButton}>
            <View style={styles.actionButton__dots} />
            <View style={[styles.actionButton__dots, { marginHorizontal: responsive(2) }]} />
            <View style={styles.actionButton__dots} />

        </View>
    )
}

export default ActionButton

const styles = StyleSheet.create({
    actionButton: {
        backgroundColor: "rgba(51, 51, 51, 0.7)",
        height: responsive(35),
        width: responsive(35),
        position: "absolute",
        zIndex: 10,
        borderRadius: 50,
        top: responsive(10),
        right: responsive(10),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    actionButton__dots: {
        backgroundColor: color.primaryColor,
        height: responsive(4),
        width: responsive(4),
        borderRadius: 4
    }
})