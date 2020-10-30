import React from 'react'
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

const { width, height } = Dimensions.get("window")

const categories = [
    {
        value: "1",
        lable: "Фотограф"
    },
    {
        value: "2",
        lable: "Ведущий"
    },
    {
        value: "3",
        lable: "Банкетный зал"
    },
    {
        value: "4",
        lable: "Арнеда авто"
    }
]

const CreateEvent = ({ navigation }) => {

    const onSubmit = () => {
        navigation.goBack()
    }

    return (
        <View style={{ flex: 1, backgroundColor: "red" }}>
            <ScrollView style={styles.container} contentContainerStyle={{ alignItems: "center", paddingBottom: 15 }}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Назване меропрятия"
                />
                <View style={styles.pickerContainer}>
                    <Picker
                        style={styles.picker}
                        placeholder="Выберете категорию"
                    >
                        {
                            categories.map(item => (
                                <Picker.Item
                                    value={item.value}
                                    label={item.lable}
                                />
                            ))
                        }
                    </Picker>
                    <Ionicons name='chevron-down' style={{ position: 'absolute', right: 25, top: 27 }} color='#000000' size={22} />
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={onSubmit}
                >
                    <Text style={styles.buttonText}>Создать</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width,
        backgroundColor: '#edeef0',
        height: window.innerHeight - 60
    },
    textInput: {
        width: "90%",
        borderWidth: 0.5,
        borderColor: "grey",
        paddingHorizontal: 5,
        // paddingVertical: 7,
        height: 44,
        marginTop: 15,
        borderRadius: 5,
        borderColor: "silver",
        color: "#000000",
        backgroundColor: "transparent",
        fontSize: 16
    },
    pickerContainer: {
        flexDirection: 'row',
        width: "100%",
        justifyContent: "center"
    },
    picker: {
        color: "#000000",
        paddingHorizontal: 5,
        height: 44,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: "silver",
        backgroundColor: "transparent",
        width: "90%",
        marginTop: 15,
    },
    button: {
        width: "90%",
        height: 44,
        alignItems: "center",
        backgroundColor: "#9F8FFF",
        borderRadius: 5,
        marginTop: 15,
        justifyContent: "center"
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 16
    }
})

export default CreateEvent
