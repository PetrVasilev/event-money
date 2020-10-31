import React, {useState} from 'react'
import styled from 'styled-components'
import {Title} from "../components/defaultTexts"
import AddField from "../components/addField"
import {useMutation, useQuery} from "@apollo/react-hooks"
import {Button, message, Switch} from "antd"
import AddFieldSelect from "../components/addFieldSelect"
import {CREATE_ONE_TEMPLATE} from "../gqls/template/mutations"
import {FIND_MANY_SERVICE} from "../gqls/service/queries"
import AddFieldNumber from "../components/addFieldNumber"
import {useHistory} from "react-router-dom"

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`
const Fields = styled.div`
  margin-top: 24px;
  display: flex;

  .gap {
    margin-right: 24px;
    margin-bottom: 24px;
    @media screen and (max-width: 800px) {
      margin-right: 0;
    }
  }
  .input{
    min-width: 290px;
  }

  @media screen and (max-width: 800px) {
    flex-direction: column;
  }

`

const typeEnum = [
    {
        id: 'OTHER',
        name: 'Другие'
    },
    {
        id: 'WEDDING',
        name: 'Свадьба'
    },
    {
        id: 'BIRTHDAY',
        name: 'День рождения'
    },
    {
        id: 'STAG',
        name: 'Девичник/Мальчишник'
    },
    {
        id: 'MATINEE',
        name: 'Утренник'
    },
]

const AddTemplate = () => {
    const [name, setName] = useState('')
    const [service, setService] = useState()
    const [serviceArray, setServiceArray] = useState([])
    const [types, setTypes] = useState([])
    const [amount, setAmount] = useState(0)
    const [autoCalc, setAutoCalc] = useState(true)

    const history = useHistory()

    const {loading: queryLoading} = useQuery(FIND_MANY_SERVICE, {
        errorPolicy: 'ignore',
        onCompleted: ({findManyService}) => {
            console.log('before', findManyService)

            setServiceArray(findManyService)
        },
        variables: {
            where: {}
        }
    })

    const [save, {loading}] = useMutation(CREATE_ONE_TEMPLATE, {
        onCompleted: () => {
            message.success('Добавлено')
        },
        onError: (error) => {
            message.error('Что то пошло не так')
        }
    })

    const onSave = () => {
        if (name === '') {
            message.error('Введите имя')
            return null
        }
        if (!service) {
            message.error('Выберите услугу')
            return null
        }
        const variables = {
            data: {
                name,
                services: {
                    connect: service.map(
                        (item) => {
                            return {id: item}
                        }
                    )
                },
                amount: amount.toString(),
                types: {
                    set: types
                }
            }
        }
        save({
            variables
        })

    }

    const servicesData = serviceArray.filter(
        (item) => {
            for (let i = 0; i < types.length; i++) {
                if (item.category.types.includes(types[i]))
                    return true

            }
            return false
        }
    )

    return (
        <Container>
            <Title>Добавление шаблона</Title>
            <Switch
                style={{maxWidth: 100,marginTop:16}}
                checkedChildren={'Авторасчет'}
                unCheckedChildren={'Авторасчет'}
                value={autoCalc}
                onChange={
                    (value) => {
                        setAutoCalc(value)
                    }
                }
                defaultChecked
            />
            <Fields>
                <AddField
                    text={'Название'}
                    className={'gap'}
                    placeholder={'Введите название'}
                    value={name}
                    onChange={
                        (e) => {
                            setName(e.target.value)
                        }
                    }
                />
                <AddFieldSelect
                    text={'Тип шаблона'}
                    className={'gap input'}
                    placeholder={'Выберите тип шаблона'}
                    mode={'multiple'}
                    value={types}
                    onChange={
                        (value) => {
                            setTypes(value)
                        }
                    }
                    data={typeEnum}
                />
                <AddFieldSelect
                    text={'Услуга'}
                    className={'gap input'}
                    placeholder={'Выберите услугу'}
                    mode={'multiple'}
                    value={service}
                    onChange={
                        (value) => {
                            setService(value)
                            if (autoCalc) {
                                const array = serviceArray.filter(
                                    (item) => {
                                        return value.includes(item.id)
                                    }
                                )
                                const sum = array.reduce((acum, item) => {
                                    return acum + parseInt(item.amount)
                                }, 0)
                                setAmount(sum)
                            }
                        }
                    }
                    data={servicesData}
                    loading={queryLoading}
                />
                <AddFieldNumber
                    text={'Стоимость'}
                    className={'gap'}
                    placeholder={'Введите стоимость'}
                    value={amount}
                    onChange={
                        (value) => {
                            setAmount(value)
                        }
                    }
                />
            </Fields>

            <Button
                style={{marginTop: 16, maxWidth: 200}}
                type={'primary'}
                onClick={onSave}
                loading={loading}
            >
                Добавить
            </Button>
            <Button
                style={{marginTop: 16, maxWidth: 200}}
                onClick={
                    () => {
                        history.goBack()
                    }
                }
            >
                Назад
            </Button>

        </Container>
    )
}

export default AddTemplate
