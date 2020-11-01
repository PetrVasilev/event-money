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
import { useQuery, useMutation, useLazyQuery } from '@apollo/client'

import LoadingView from '../components/loadingView'
import { FIND_MANY_CATEGORY } from '../gqls/category'
import { FIND_MANY_SERVICE } from '../gqls/service'
import { CREATE_ONE_SPENDING, FIND_MANY_SPENDING } from '../gqls/spending'

const { width } = Dimensions.get('window')

const CreateSpending = ({ navigation, route }) => {
    const { event } = route.params
    const [selectedCategory, setSelectedCategory] = useState()
    const [budget, setBudget] = useState('')
    const [description, setDescription] = useState('')
    const [service, setService] = useState(null)

    const [findServices, { data: servicesData }] = useLazyQuery(FIND_MANY_SERVICE, {
        fetchPolicy: 'network-only'
    })

    const { data } = useQuery(FIND_MANY_CATEGORY, {
        fetchPolicy: 'network-only'
    })

    const [createSpending, { loading }] = useMutation(CREATE_ONE_SPENDING, {
        onCompleted: () => {
            navigation.goBack()
        },
        onError: (e) => {
            console.error(e)
        },
        update: async (client, { data }) => {
            let prev = await client.readQuery({
                query: FIND_MANY_SPENDING,
                variables: {
                    where: { event: { id: { equals: event.id } } },
                    orderBy: { createdAt: 'desc' }
                }
            })
            await client.writeQuery({
                query: FIND_MANY_SPENDING,
                variables: {
                    where: { event: { id: { equals: event.id } } },
                    orderBy: { createdAt: 'desc' }
                },
                data: {
                    findManySpending: [data.createOneSpending, ...prev.findManySpending]
                }
            })
        }
    })

    const services =
        servicesData && servicesData.findManyService ? servicesData.findManyService : []

    useEffect(() => {
        if (service) {
            const selectedService = services.find((item) => item.id === service)
            setBudget(selectedService.amount)
            setDescription(selectedService.description)
        } else {
            setBudget('')
            setDescription('')
        }
        // eslint-disable-next-line
    }, [service])

    useEffect(() => {
        if (selectedCategory && selectedCategory !== 'empty') {
            findServices({
                variables: {
                    where: {
                        category: { id: { equals: selectedCategory } }
                    }
                }
            })
            setService(null)
        }
        // eslint-disable-next-line
    }, [selectedCategory])

    const categoriesArray =
        data && data.findManyCategory
            ? event.type !== 'OTHER'
                ? data.findManyCategory.filter((item) => item.types.indexOf(event.type) !== -1)
                : data.findManyCategory
            : []

    const onSubmit = () => {
        if (!budget) {
            alert('Введите стоимость расхода')
            return false
        }
        if (!selectedCategory) {
            alert('Выберите категорию')
            return false
        }
        createSpending({
            variables: {
                data: {
                    description,
                    amount: budget,
                    category: {
                        connect: { id: selectedCategory }
                    },
                    event: {
                        connect: { id: event.id }
                    },
                    service: service ? { connect: { id: service } } : undefined
                }
            }
        })
    }

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ alignItems: 'center', paddingBottom: 15 }}
        >
            <Text style={styles.label}>Категория расхода</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    style={styles.picker}
                    placeholder="Выберите категорию"
                    value={selectedCategory}
                    onValueChange={(item) => {
                        setSelectedCategory(item)
                    }}
                >
                    {[{ id: 'empty', name: 'Выберите категорию' }, ...categoriesArray].map(
                        (item, index) => (
                            <Picker.Item key={item.id} value={item.id} label={item.name} />
                        )
                    )}
                </Picker>
                <Ionicons
                    name="chevron-down"
                    style={{ position: 'absolute', right: 5, top: 10, alignSelf: 'flex-end' }}
                    color="#000000"
                    size={22}
                />
            </View>
            <Text style={styles.label}>Стоимость расхода</Text>
            <TextInput
                value={budget}
                onChangeText={(text) => setBudget(text.replace(/\D/gm, ''))}
                style={styles.textInput}
                placeholder="Стоимость расхода"
                keyboardType="numeric"
            />
            <Text style={styles.label}>Комментарий к расходу</Text>
            <TextInput
                value={description}
                onChangeText={(text) => setDescription(text)}
                style={styles.textInput}
                placeholder="Комментарий к расходу"
            />
            {selectedCategory !== 'empty' && services.length > 0 ? (
                <>
                    <Text style={[styles.label, { marginBottom: 0 }]}>Доступные услуги</Text>
                    <ScrollView
                        scrollEventThrottle={200}
                        pagingEnabled
                        contentContainerStyle={{ paddingBottom: 10 }}
                        horizontal={true}
                        style={styles.templates}
                    >
                        {services.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                activeOpacity={0.8}
                                style={[styles.template, {}]}
                                onPress={() =>
                                    navigation.navigate('Service', {
                                        service: item,
                                        setService: setService,
                                        selected: service === item.id
                                    })
                                }
                            >
                                <Text style={styles.templateTitle}>{item.name}</Text>
                                <Text style={styles.amountText}>{item.amount} руб</Text>
                                {item.id === service ? (
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
                <Text style={styles.buttonText}>Добавить</Text>
            </TouchableOpacity>
            <LoadingView loading={loading} />
        </ScrollView>
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

export default CreateSpending
