import React, { useEffect, useState } from 'react'
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
import { useMutation, useLazyQuery } from '@apollo/client'
import moment from 'moment'

import LoadingView from '../components/loadingView'
import { CREATE_ONE_EVENT, FIND_MANY_EVENTS } from '../gqls/event'
import { FIND_MENY_TEMPLATE } from '../gqls/template'
import { categories, isIphoneX } from '../utils'

const { width } = Dimensions.get('window')

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
    const [template, setTemplate] = useState(null)

    const [findTemplates, { data }] = useLazyQuery(FIND_MENY_TEMPLATE)

    useEffect(() => {
        if (selectedCategory !== 'empty') {
            findTemplates({
                variables: {
                    where: {
                        types: { equals: [selectedCategory] }
                    }
                }
            })
            setTemplate(null)
        }
        // eslint-disable-next-line
    }, [selectedCategory])

    // console.log(data)

    const templates = data && data.findManyTemplate ? data.findManyTemplate : []

    useEffect(() => {
        if (template) {
            setBudget(templates.find((item) => item.id === template).amount)
        } else {
            setBudget('')
        }
        // eslint-disable-next-line
    }, [template])

    const [createEvent, { loading }] = useMutation(CREATE_ONE_EVENT, {
        onCompleted: () => {
            navigation.goBack()
        },
        onError: (e) => {
            console.error(e)
        },
        update: async (client, { data }) => {
            let prev = await client.readQuery({
                query: FIND_MANY_EVENTS,
                variables: {
                    where: {
                        users: { some: { id: { contains: localStorage.getItem('userId') } } }
                    },
                    orderBy: { createdAt: 'desc' }
                }
            })
            await client.writeQuery({
                query: FIND_MANY_EVENTS,
                variables: {
                    where: {
                        users: { some: { id: { contains: localStorage.getItem('userId') } } }
                    },
                    orderBy: { createdAt: 'desc' }
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
        if (selectedCategory === 'empty') {
            alert('Выберите категорию')
            return false
        }
        let spendings = undefined
        if (template) {
            const selectedTempate = templates.find((item) => item.id === template)
            if (
                selectedTempate &&
                selectedTempate.services &&
                selectedTempate.services.length > 0
            ) {
                let create = selectedTempate.services.map((item) => {
                    return {
                        description: item.description,
                        amount: item.amount,
                        category: {
                            connect: { id: item.category.id }
                        },
                        service: {
                            connect: { id: item.id }
                        }
                    }
                })
                spendings = { create }
            }
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
                    type: selectedCategory,
                    spendings: template ? spendings : undefined
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
                <Text style={styles.label}>Город</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        style={styles.picker}
                        placeholder="Выберите город"
                    // value={selectedCategory}
                    // onValueChange={(item) => {
                    //     setSelectedCategory(item)
                    // }}
                    >
                        <Picker.Item key={1} value={1} label={"Якутск"} />
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
                        {categories.map((item) => (
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
                    onChangeText={(text) => setBudget(text.replace(/\D/gm, ""))}
                    style={styles.textInput}
                    placeholder="Бюджет мероприятия"
                    keyboardType="numeric"
                    type="number"
                />
                {selectedCategory !== 'empty' && templates.length > 0 ? (
                    <>
                        <Text style={[styles.label, { marginBottom: 0 }]}>
                            Мероприятие под ключ
                        </Text>
                        <ScrollView
                            scrollEventThrottle={200}
                            pagingEnabled
                            contentContainerStyle={{ paddingBottom: 10 }}
                            horizontal={true}
                            style={styles.templates}
                        >
                            {templates.map((item) => (
                                <TouchableOpacity
                                    key={item.id}
                                    activeOpacity={0.8}
                                    style={[styles.template, {}]}
                                    onPress={() =>
                                        navigation.navigate('Template', {
                                            template: item,
                                            setTemplate: setTemplate,
                                            selected: template === item.id
                                        })
                                    }
                                >
                                    <Text style={styles.templateTitle}>{item.name}</Text>
                                    <Text style={styles.amountText}>{item.amount} руб</Text>
                                    {item.id === template ? (
                                        <Ionicons
                                            name="checkmark-circle-outline"
                                            style={{
                                                position: 'absolute',
                                                right: 5,
                                                top: 5
                                            }}
                                            color="green"
                                            size={20}
                                        />
                                    ) : null}
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </>
                ) : null}
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
        width,
        backgroundColor: '#fafafa',
        height: window.innerHeight - (isIphoneX() ? 100 : 60)
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
        marginTop: 20,
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
    },
    templates: {
        width: '90%',
        marginTop: 8
    },
    template: {
        width: 200,
        marginRight: 10,
        backgroundColor: 'white',
        borderColor: 'rgb(216, 216, 216)',
        borderWidth: 1,
        boxShadow: 'rgb(216, 216, 216) 0px 0px 0px',
        borderRadius: 5,
        padding: 10
    },
    templateTitle: {
        fontWeight: '500'
    },
    amountText: {
        fontSize: 17,
        fontWeight: '500',
        marginTop: 5
    }
})

export default CreateEvent
