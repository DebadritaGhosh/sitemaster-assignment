//Importing system
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import FontAwesome from "react-native-vector-icons/FontAwesome";
///Importing Components
import ActionButton from './ActionButton';
///Importing utils
import responsive from '../helpers/responsive';
import { color } from '../globalStyles/color';

const Card = ({ item }) => {

    const statusColorHandler = (status, choice) => {
        if (choice === "background") {
            if (status === "Ongoing") return color.lightGreen
            else if (status === "Upcoming") return color.lightBlue
            else if (status === "Completed") return color.lightYellow
            else return color.lightRed
        } else {
            if (status === "Ongoing") return color.darkGreen
            else if (status === "Upcoming") return color.darkBlue
            else if (status === "Completed") return color.darkYellow
            else return color.darkYellow
        }
    }

    const truncateText = (text, limit) => {
        if (text.length <= limit) {
            return text;
        }
        return text.substring(0, limit) + '...';
    };

    return (
        <Pressable style={styles.card}>
            <View style={styles.card__detailsContainer}>
                <View style={[styles.card__status, { backgroundColor: statusColorHandler(item.status, "background") }]}>
                    <Text style={[styles.card__status_text, { color: statusColorHandler(item.status) }]} >{item.status}</Text>
                    <FontAwesome
                        size={responsive(11)}
                        name={item.statusIcon}
                        color={statusColorHandler(item.status)}
                        style={{ marginLeft: 5 }}
                    />
                </View>
                <Text style={styles.card__title} >{item.title}</Text>
                <Text style={styles.card__description} >{truncateText(item.description, 22)}</Text>
            </View>
            <Image source={{ uri: item.image }} style={styles.card__image} />
            <ActionButton />
        </Pressable>
    )
}

export default Card

const styles = StyleSheet.create({
    card: {
        backgroundColor: color.primaryColor,
        width: "100%",
        maxHeight: responsive(120),
        height: responsive(120),
        position: "relative",
        borderRadius: 20,
        overflow: "hidden",
        marginBottom: responsive(15),
        elevation: 0.1
    },
    card__detailsContainer: {
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        width: "50%",
        height: "100%",
        zIndex: 10,
        paddingLeft: responsive(10),
        paddingTop: responsive(10),
    },
    card__status: {
        width: responsive(80),
        marginBottom: responsive(10),
        borderRadius: responsive(20),
        paddingVertical: responsive(2),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    card__status_text: {
        fontSize: responsive(11),
        fontFamily: "Outfit-Medium",
    },
    card__title: {
        marginBottom: responsive(5),
        fontFamily: "Outfit-Bold",
        color: color.darkBlack
    },
    card__description: {
        fontFamily: "Outfit-Regular",
        color: color.lightBlack
    },
    card__image: {
        height: "100%",
        width: "60%",
        resizeMode: "stretch",
        position: "absolute",
        right: 0,
        top: 0
    }
})