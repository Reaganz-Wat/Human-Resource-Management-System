import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, Pressable,  } from 'react-native';
import COLORS from '../../components/Colors';
import Header from '../../components/Header';
import { FlatList } from 'react-native-gesture-handler';


const Home = ({navigation}) => {

    const [data, setData] = useState([
        {name: 'User', key: '1', topColor: '#5D5FEE', backgColor: '#c7d7eb', icon: require('../../../assets/profile.png')},
        {name: 'Manager', key: '2', topColor: '#FF4F00', backgColor: '#F7D088', icon: require('../../../assets/manager.png')},
        {name: 'Departments', key: '3', topColor: '#235D3A', backgColor: '#ABE0B7', icon: require('../../../assets/department.png')},
        {name: 'Employee', key: '4', topColor: '#511F52', backgColor: '#ECD4EA', icon: require('../../../assets/employees.png')},
        {name: 'Attendance', key: '5', topColor: '#485935', backgColor: '#CADBB7', icon: require('../../../assets/attendance.png')},
        {name: 'Salary', key: '6', topColor: '#A556B9', backgColor: '#E6AFF5', icon: require('../../../assets/salary.png')},
        {name: 'Performance Reviews', key: '7', topColor: '#F41E1E', backgColor: '#F6AEAE', icon: require('../../../assets/increase.png')},
        {name: 'Jobs', key: '8', topColor: '#206C05', backgColor: '#D2FBC2', icon: require('../../../assets/job-offer.png')},
        {name: 'Training Programs', key: '9', topColor: '#986807', backgColor: '#F4CB77', icon: require('../../../assets/training.png')},
        {name: 'Payroll', key: '10', topColor: '#511F52', backgColor: '#ECD4EA', icon: require('../../../assets/payroll.png')},
        {name: 'Employee Benefits', key: '11', topColor: '#5D5FEE', backgColor: '#c7d7eb', icon: require('../../../assets/benefits.png')},
        {name: 'Reports', key: '12', topColor: '#235D3A', backgColor: '#ABE0B7', icon: require('../../../assets/report.png')}
    ]);

    const renderedItem = ({item})=>(

        <Pressable onPress={()=>handleClick(item.key)}>
            <View 
                style={[styles.card, {borderTopColor: item.topColor, backgroundColor: item.backgColor}]}
                >
                <View style={styles.cardInner}>
                    <Image style={styles.img} source={item.icon}/>
                    <Text style={{fontSize: 18, fontWeight: 'bold', color: item.topColor}}> {item.name} </Text>
                </View>
            </View>
        </Pressable>

    )

    const handleClick = (itemID) => {
        console.log("Clicked itemID", itemID);
        if (itemID == 3) {
            // navigate to the departments screen
            navigation.navigate('AdminDepartments');
        }
        if (itemID == 4) {
            navigation.navigate('Employee');
        }
    }


    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
            <View style={{flex: 1}}>

                {/* Head of the code */}
                <Header title="Home"/>

                {/* The body of the code */}
                <View style={styles.container}>
                    {/* <Input label="Search Categories" iconName="magnify" placeholder="Search . . . . ."/> */}
                    
                    {/* Cards for the details */}
                    <FlatList
                        numColumns={2}
                        // keyExtractor={(item)=>item.key}
                        data={data}
                        renderItem={renderedItem}
                        columnWrapperStyle={{
                            justifyContent: 'space-around'
                        }}
                        showsVerticalScrollIndicator={false}
                    />

                </View>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:10,
        paddingHorizontal: 15,
        backgroundColor: COLORS.white,
        marginBottom: 50
    },
    card: {
        width: 160,
        height: 200,
        borderRadius: 10,
        borderTopWidth: 4,
        marginVertical: 5,
        elevation: 6, // Add elevation for shadow effect
        shadowColor: '#000', // Shadow color
        shadowOpacity: 0.4, // Shadow opacity
        shadowRadius: 5, // Shadow radius
        shadowOffset: {
            width: 0, // Shadow x offset
            height: 3, // Shadow y offset
        },
    },
    img: {
        width: 80,
        height: 80,
        borderRadius: 5
    },
    cardInner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pressable: {
        backgroundColor: 'lightblue',
        padding: 10,
        borderRadius: 5,
      },
});

export default Home;