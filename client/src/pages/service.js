import React from 'react'
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { isIphoneX } from '../utils'

const Service = ({ navigation, route }) => {
    const { service, selected, setService } = route.params

    const onSubmit = () => {
        if (selected) {
            setService(null)
        } else {
            setService(service.id)
        }
        navigation.goBack()
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center' }}>
            <Text style={styles.textInfo}>Общая информация</Text>
            <View style={styles.bottom}>
                <View style={styles.bottomSpending}>
                    <Text style={{ color: 'gray' }}>Название</Text>
                    <Text style={{ textAlign: 'right' }}>{service.category.name}</Text>
                </View>
                <View style={styles.bottomSpending}>
                    <Text style={{ color: 'gray' }}>Стоимость</Text>
                    <Text style={{ textAlign: 'right' }}>{service.amount} руб.</Text>
                </View>
                <View>
                    <Text style={{ color: 'gray' }}>Описание</Text>
                    <Text style={{ marginTop: 10 }}>
                        {service.description ? service.description : '-'}
                    </Text>
                </View>
            </View>
            <TouchableOpacity
                activeOpacity={0.8}
                style={[
                    styles.button,
                    selected
                        ? { backgroundColor: 'transparent', borderColor: '#4b76a8', borderWidth: 1 }
                        : null
                ]}
                onPress={onSubmit}
            >
                <Text style={[styles.buttonText, selected ? { color: '#4b76a8' } : null]}>
                    {selected ? 'Отказаться от услуги' : 'Выбрать услугу'}
                </Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: window.innerHeight - (isIphoneX() ? 100 : 60),
        backgroundColor: '#fafafa'
    },
    textInfo: {
        fontSize: 14,
        color: 'gray',
        marginVertical: 10,
        width: '90%'
    },
    bottom: {
        width: '90%',
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
    bottomSpending: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 13
    },
    button: {
        width: '90%',
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

export default Service
