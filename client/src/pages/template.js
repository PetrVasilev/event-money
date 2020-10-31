import React from 'react'
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native'

const Template = ({ navigation, route }) => {
    const { template, selected, setTemplate } = route.params

    const onSubmit = () => {
        if (selected) {
            setTemplate(null)
        } else {
            setTemplate(template.id)
        }
        navigation.goBack()
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center' }}>
            <Text style={styles.textInfo}>Общая информация</Text>
            <View style={styles.bottom}>
                <View style={styles.bottomSpending}>
                    <Text style={{ color: 'gray' }}>Название</Text>
                    <Text style={{ textAlign: 'right' }}>{template.name}</Text>
                </View>
                <View style={styles.bottomSpending}>
                    <Text style={{ color: 'gray' }}>Стоимость</Text>
                    <Text style={{ textAlign: 'right' }}>{template.amount} руб.</Text>
                </View>
                <View>
                    <Text style={{ color: 'gray' }}>Описание</Text>
                    <Text style={{ marginTop: 10 }}>
                        {template.description ? template.description : '-'}
                    </Text>
                </View>
            </View>
            {template.services.length > 0 ? (
                <>
                    <Text style={styles.textInfo}>Услуги</Text>
                    {template.services.map((item, index) => (
                        <View
                            style={[
                                styles.bottom,
                                { marginBottom: template.services.length - 1 === index ? 0 : 10 }
                            ]}
                            key={item}
                        >
                            <View style={styles.bottomSpending}>
                                <Text style={{ color: 'gray' }}>Название услуги</Text>
                                <Text style={{ textAlign: 'right' }}>{item.category.name}</Text>
                            </View>
                            <View style={[styles.bottomSpending, { marginBottom: 0 }]}>
                                <Text style={{ color: 'gray' }}>Цена</Text>
                                <Text style={{ textAlign: 'right' }}>{item.amount}</Text>
                            </View>
                        </View>
                    ))}
                </>
            ) : null}
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
                    {selected ? 'Отказаться от шаблона' : 'Выбрать шаблон'}
                </Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: window.innerHeight - 60,
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

export default Template
