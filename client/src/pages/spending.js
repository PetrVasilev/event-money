import React from 'react'
import { ScrollView, View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import moment from 'moment'

const Spending = ({ route, navigation }) => {
    const { spending } = route.params
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.textInfo}>Общая информация</Text>
            <View style={styles.bottom}>
                <View style={styles.bottomPrice}>
                    <Text>Название</Text>
                    <Text>{spending.name}</Text>
                </View>
                <View style={styles.bottomSpending}>
                    <Text>Стоимость</Text>
                    <Text>{spending.price} руб.</Text>
                </View>
                <View style={styles.bottomSpending}>
                    <Text>Комметарий</Text>
                    <Text>{spending.description ? spending.description : '-'}</Text>
                </View>
                <View style={styles.bottomSpending}>
                    <Text>Дата создания</Text>
                    <Text>{moment(spending.createdAt).format('DD.MM.YYYY')}</Text>
                </View>
            </View>
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.button}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.buttonText}>Удалить расход</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fafafa',
        paddingHorizontal: 16,
        paddingVertical: 10,
        height: window.innerHeight - 60
    },
    textInfo: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 10
    },
    bottom: {
        backgroundColor: 'white',
        padding: 10,
        borderColor: 'rgb(216, 216, 216)',
        borderWidth: 1,
        boxShadow: 'rgb(216, 216, 216) 0px 0px 0px'
    },
    bottomLeave: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    bottomPrice: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    bottomSpending: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    button: {
        width: '100%',
        height: 42,
        alignItems: 'center',
        backgroundColor: '#4b76a8',
        borderRadius: 5,
        marginTop: 15,
        justifyContent: 'center'
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16
    }
})

export default Spending
