import React from 'react';
import { StyleSheet, ScrollView, Text, View, Image, VirtualizedList } from 'react-native'
import PieChart from 'react-native-pie-chart'
import COLORS from '../../components/Colors';
import { FlatList } from 'react-native-gesture-handler';

const EmployeeDetails = () => {
    const widthAndHeight = 150
    const series = [10, 5]
    const sliceColor = [COLORS.blue, COLORS.lightBlue]

    const information = [
        {id: 1, name: 'watmon reagan nyero', work: 'employee'},
        {id: 2, name: 'eric jansen', work: 'manager'},
        {id: 3, name: 'eric jansen', work: 'manager'},
        {id: 4, name: 'eric jansen', work: 'manager'},
        {id: 5, name: 'eric jansen', work: 'manager'},
        {id: 6, name: 'eric jansen', work: 'manager'},
        {id: 7, name: 'eric jansen', work: 'manager'},
        {id: 8, name: 'eric jansen', work: 'manager'},
        
    ]

    const cardList = ({item}) => {
        return (
            <View>
                <View style={styles.card}>
                    <Image source={require("../../../assets/wat.jpg")} style={{width: 80, height: 80, borderRadius: 10}}/>
                    <View>
                        <Text style={{fontSize: 16, color: COLORS.blue}}>{item.name}</Text>
                        <Text style={{color: COLORS.blue}}>{item.work}</Text>
                    </View>
                </View>
            </View>
        );
    }
    return (
        <ScrollView style={{ flex: 1, marginHorizontal: 10}}>
        <View style={styles.container}>

            <View style={{flex: 1, alignItems: 'center'}}>

                <PieChart
                    widthAndHeight={widthAndHeight}
                    series={series}
                    sliceColor={sliceColor}
                    coverRadius={0.60}
                    coverFill={'#FFF'}
                />
            </View>

            <View style={{flex: 1, alignItems: 'center', alignSelf: 'center'}}>
                <View style={{flexDirection: 'row', gap: 5, margin: 3}}>
                    <View style={{width: 30, height: 30, backgroundColor: COLORS.blue}}/>
                    <Text style={{fontSize: 20}}>Employees</Text>
                </View>
                <View style={{flexDirection: 'row', gap: 5, margin: 3}}>
                    <View style={{width: 30, height: 30, backgroundColor: COLORS.lightBlue}}/>
                    <Text style={{fontSize: 20}}>Managers  </Text>
                </View>
            </View>
        </View>

        {/* <View style={{flex: 3, marginTop: 20}}>
        <FlatList
            data={information}
            renderItem={cardList}
        />
        </View> */}
        {
            information.map((item)=>(
                <View key={item.id}>
                <View style={styles.card}>
                    <Image source={require("../../../assets/wat.jpg")} style={{width: 80, height: 80, borderRadius: 10}}/>
                    <View>
                        <Text style={{fontSize: 16, color: COLORS.blue}}>{item.name}</Text>
                        <Text style={{color: COLORS.blue}}>{item.work}</Text>
                    </View>
                </View>
            </View>
            ))
        }

      </ScrollView>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      marginTop: 20
    },
    card: {
        marginTop: 5,
        width: '100%',
        gap: 50,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        elevation: 5,
        padding: 7, borderRadius: 5,
        borderLeftWidth: 4,
        borderLeftColor: COLORS.blue
    }
  })

export default EmployeeDetails;