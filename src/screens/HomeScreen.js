//Importing system
import { Image, Pressable, StyleSheet, Text, View, FlatList, LayoutAnimation, UIManager, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react';
import Octicons from "react-native-vector-icons/Octicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
///Importing Components
import MyStatusBar from '../components/MyStatusBar'
import Card from '../components/Card'
///Importing utils
import { color } from '../globalStyles/color'
import responsive from '../helpers/responsive'
import { images } from '../globalStyles/images'

const localData = [
    {
        status: "Ongoing",
        statusIcon: "clock-o",
        image: "https://images.unsplash.com/photo-1515263487990-61b07816b324?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    {
        status: "Upcoming",
        statusIcon: "clock-o",
        image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1084&q=80",
    },
    {
        status: "Ongoing",
        statusIcon: "clock-o",
        image: "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
    },
    {
        status: "Completed",
        statusIcon: "calendar-check-o",
        image: "https://images.unsplash.com/photo-1597047084993-bf337e09ede0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    {
        status: "Halted",
        statusIcon: "calendar-times-o",
        image: "https://images.unsplash.com/photo-1576647296530-fa0e45d8ff8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    },
]


// Enable LayoutAnimation
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

const HomeScreen = () => {

    const [products, setProducts] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const [sortOrder, setsortOrder] = useState('asc');


    const handleSearchIconClick = () => {
        setSearchText('');
        setFilteredData([...products]);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring); // Enable animation
        setIsSearchExpanded(!isSearchExpanded);
        setsortOrder('asc');
    };

    const sortArrayByPriceHandler = () => {
        setSearchText('');
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring); // Enable animation
        setIsSearchExpanded(false);
        const productData = [...products]
        if (sortOrder === 'asc') {
            productData.sort((a, b) => b.price - a.price);
            setsortOrder('des');
            // console.warn("productData", productData);
        } else {
            productData.sort((a, b) => a.price - b.price);
            setsortOrder('asc');
        }
        setFilteredData([...productData])
    }

    const handleSearch = (text) => {
        setSearchText(text)
        const filteredItems = products.filter(
            (item) =>
                item.title.toLowerCase().includes(text.toLowerCase()) ||
                item.description.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredData(filteredItems);
    };

    const fetchData = () => {
        const productData = [];
        fetch('https://dummyjson.com/products?limit=5')
            .then(res => res.json())
            .then(res => {
                console.log(res.products)
                res.products.map((prod, i) => productData.push({
                    id: i,
                    title: prod.title,
                    description: prod.description,
                    price: prod.price,
                    status: localData[i].status,
                    statusIcon: localData[i].statusIcon,
                    image: localData[i].image,
                }));

                productData.sort((a, b) => a.price - b.price);

                setProducts([...productData]);
                setFilteredData([...productData]);
                console.log("productData ======================> ", productData)
            })
            .catch((e) => console.error(e));
    }





    useEffect(() => {
        fetchData();
    }, []);

    return (
        <View style={styles.homeScreen__container}>
            <MyStatusBar backgroundColor={'white'} barStyle={'dark-content'} />
            {/* <Text style={{ fontFamily: "Outfit-Bold"}}>HomeScreen</Text> */}
            <View style={styles.homeScreen__header}>
                {isSearchExpanded ? null : <Image source={images.logo} style={styles.homeScreen__logo} />}
                <View style={[styles.homeScreen__searchBarContainer, { width: isSearchExpanded ? "100%" : "20%" }]}>

                    {isSearchExpanded && (
                        <TextInput
                            style={styles.homeScreen__searchField}
                            placeholder="Search..."
                            value={searchText}
                            onChangeText={(text) => handleSearch(text)}
                            onSubmitEditing={handleSearchIconClick}
                        />
                    )}

                    <MaterialIcons
                        size={responsive(25)}
                        name={isSearchExpanded ? "cancel" : "search"}
                        color={color.darkBlack}
                        onPress={handleSearchIconClick}
                    />
                    <MaterialIcons
                        size={responsive(25)}
                        name="menu"
                        color={color.darkBlack}
                    />

                </View>
            </View>
            <View style={styles.homeScreen__title}>
                <Text style={styles.homeScreen__title_leftText}>{products.length} projects</Text>
                <Pressable onPress={sortArrayByPriceHandler} style={styles.homeScreen__title_rightContainer}>
                    <Text style={styles.homeScreen__title_rightText}>Sorted By Price </Text>
                    <Octicons
                        size={responsive(15)}
                        name={sortOrder === 'asc' ? "arrow-down" : 'arrow-up'}
                        color={color.darkPurple}
                        style={{ marginLeft: 1 }}
                    />
                </Pressable>
            </View>
            <View style={{ flex: 1, padding: responsive(10), }}>
                <FlatList
                    data={filteredData}
                    renderItem={({ item }) => <Card item={item} />}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                />

            </View>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    homeScreen__container: {
        flex: 1,
        backgroundColor: color.primaryColor,
    },
    homeScreen__header: {
        backgroundColor: color.primaryColor,
        minHeight: responsive(60),
        padding: responsive(10),
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        elevation: 10
    },
    homeScreen__logo: {
        width: responsive(120),
        objectFit: "contain"
    },
    homeScreen__searchBarContainer: {
        width: "20%",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row"
    },
    homeScreen__searchField: {
        width: "75%",
        fontSize: responsive(11),
        paddingVertical: responsive(5),
        paddingHorizontal: responsive(5),
        borderRadius: 8,
        backgroundColor: color.lightGrey,
        fontFamily: "Outfit-Regular",
    },
    homeScreen__title: {
        paddingHorizontal: responsive(10),
        paddingVertical: responsive(15),
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row"
    },
    homeScreen__title_leftText: {
        color: color.lightBlack,
        fontFamily: "Outfit-Bold"
    },
    homeScreen__title_rightContainer: {
        backgroundColor: color.lightPurple,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        paddingVertical: responsive(5),
        paddingHorizontal: responsive(10),
        borderRadius: responsive(20),
    },
    homeScreen__title_rightText: {
        color: color.darkPurple,
        fontFamily: "Outfit-Bold",
        fontSize: responsive(11),
    },
})