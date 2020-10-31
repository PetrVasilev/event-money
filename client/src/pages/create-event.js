import React, { useState } from 'react'
import {
    View,
    ScrollView,
    StyleSheet,
    Dimensions,
    Text,
    TextInput,
    Picker,
    TouchableOpacity
} from 'react-native'
import Ionicons from 'react-native-vector-icons/dist/Ionicons'
import IMask from 'imask'
import { useMutation } from '@apollo/client'
import moment from 'moment'

import LoadingView from '../components/loadingView'
import { CREATE_ONE_EVENT, FIND_MANY_EVENTS } from '../gqls/event'
import { } from '../utils'

const { width } = Dimensions.get('window')

const categories = [
    {
        value: 'WEDDING',
        lable: 'Свадьба'
    },
    {
        value: 'BIRTHDAY',
        lable: 'День рождения'
    },
    {
        value: 'MATINEE',
        lable: 'Утренник'
    },
    {
        value: 'STAG',
        lable: 'Мальчишник/Девишник'
    },
    {
        value: 'OTHER',
        lable: 'Другое'
    }
]

const dateMask = IMask.createMask({
    mask: 'DD.MM.YYYY',
    blocks: {
        DD: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 31
        },
        MM: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12
        },
        YYYY: {
            mask: IMask.MaskedRange,
            from: 2020,
            to: 2030
        }
    }
})

const CreateEvent = ({ navigation }) => {
    const [selectedCategory, setSelectedCategory] = useState(categories[0].value)
    const [name, setName] = useState('')
    const [date, setDate] = useState('')
    const [budget, setBudget] = useState('')

    const [createEvent, { loading }] = useMutation(CREATE_ONE_EVENT, {
        onCompleted: () => {
            navigation.goBack()
        },
        onError: (e) => {
            console.error(e)
        },
        update: async (client, { data }) => {
            let prev = await client.readQuery({ query: FIND_MANY_EVENTS })
            await client.writeQuery({
                query: FIND_MANY_EVENTS,
                where: {
                    id: localStorage.getItem("userId")
                },
                data: {
                    findManyEvent: [data.createOneEvent, ...prev.findManyEvent]
                }
            })
        }
    })

    const onSubmit = () => {
        const userId = localStorage.getItem('userId')
        if (!name) {
            alert('Введите название')
            return false
        }
        if (!date) {
            alert('Введите примерную дату')
            return false
        } else if (moment().isAfter(moment(date, 'DD.MM.YYYY'))) {
            alert('Введите корректную дату')
            return false
        }
        if (!selectedCategory) {
            alert('Выберите категорию')
            return false
        }
        createEvent({
            variables: {
                data: {
                    name,
                    date: moment(date, 'DD.MM.YYYY'),
                    amount: budget,
                    users: {
                        connect: [{ id: userId }]
                    },
                    type: selectedCategory
                }
            }
        })
    }

    return (
        <>
            <ScrollView
                style={styles.container}
                contentContainerStyle={{ alignItems: 'center', paddingBottom: 15 }}
            >
                <Text style={styles.label}>Название мероприятия</Text>
                <TextInput
                    value={name}
                    onChangeText={(text) => setName(text)}
                    style={styles.textInput}
                    placeholder="Название мероприятия"
                />
                <Text style={styles.label}>Дата проведения</Text>
                <TextInput
                    value={date}
                    onChangeText={(text) => setDate(dateMask.resolve(text))}
                    style={styles.textInput}
                    placeholder="ДД.ММ.ГГГГ"
                />
                <Text style={styles.label}>Бюджет мероприятия</Text>
                <TextInput
                    value={budget}
                    onChangeText={(text) => setBudget(text)}
                    style={styles.textInput}
                    placeholder="Бюджет мероприятия"
                />
                <Text style={styles.label}>Категория мероприятия</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        style={styles.picker}
                        placeholder="Выберите категорию"
                        value={selectedCategory}
                        onValueChange={(item) => {
                            setSelectedCategory(item)
                        }}
                    >
                        {categories.map((item, index) => (
                            <Picker.Item key={item.value} value={item.value} label={item.lable} />
                        ))}
                    </Picker>
                    <Ionicons
                        name="chevron-down"
                        style={{
                            position: 'absolute',
                            right: 12,
                            top: '50%',
                            transform: 'translateY(-50%)'
                        }}
                        color="silver"
                        size={20}
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={onSubmit}>
                    <Text style={styles.buttonText}>Создать</Text>
                </TouchableOpacity>
            </ScrollView>
            <LoadingView loading={loading} />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width,
        backgroundColor: '#fafafa',
        height: window.innerHeight - 60
    },
    textInput: {
        width: '90%',
        borderWidth: 0.5,
        paddingHorizontal: 12,
        height: 42,
        borderRadius: 5,
        borderColor: 'silver',
        color: '#000000',
        backgroundColor: '#ffffff',
        fontSize: 16
    },
    pickerContainer: {
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'center'
    },
    picker: {
        color: '#000000',
        paddingHorizontal: 12,
        height: 42,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: 'silver',
        backgroundColor: '#ffffff',
        width: '100%'
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
    },
    label: {
        marginTop: 15,
        marginBottom: 5,
        width: '90%',
        textAlign: 'left',
        paddingLeft: 5,
        color: 'grey'
    }
})

export default CreateEvent
