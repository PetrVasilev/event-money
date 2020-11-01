import React, {useState} from 'react'
import styled from 'styled-components'
import {Title} from '../components/defaultTexts'
import {useApolloClient, useMutation, useQuery} from '@apollo/react-hooks'
import {Button, Form, Input, InputNumber, message, Select, Switch} from 'antd'
import {CREATE_ONE_TEMPLATE} from '../gqls/template/mutations'
import {FIND_MANY_SERVICE} from '../gqls/service/queries'
import {useHistory} from 'react-router-dom'
import {FIND_MANY_TEMPLATE} from '../gqls/template/queries'
import {TYPES_ENUMS} from "../utils/enums"

const Container = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    max-width: 500px;
`
const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
`

const typeEnum = TYPES_ENUMS

const AddTemplate = () => {
    const [serviceArray, setServiceArray] = useState([])
    const [types, setTypes] = useState([])
    const [autoCalc, setAutoCalc] = useState(true)

    const apollo = useApolloClient()

    const history = useHistory()

    const {loading: queryLoading} = useQuery(FIND_MANY_SERVICE, {
        errorPolicy: 'ignore',
        onCompleted: ({findManyService}) => {
            setServiceArray(findManyService)
        },
        variables: {
            where: {}
        }
    })

    const [save, {loading}] = useMutation(CREATE_ONE_TEMPLATE, {
        onCompleted: async ({createOneTemplate}) => {
            try {
                const {data} = await apollo.readQuery({query: FIND_MANY_TEMPLATE})
                await apollo.writeQuery({
                    query: FIND_MANY_TEMPLATE,
                    data: [...data, createOneTemplate]
                })
            } catch (e) {
            }
            message.success('Добавлено')
            history.goBack()
        },
        onError: (error) => {
            message.error('Что то пошло не так')
        }
    })

    const onSave = ({services, name, amount, description}) => {
        const variables = {
            data: {
                name,
                services: {
                    connect: services.map((item) => {
                        return {id: item}
                    })
                },
                amount: amount.toString(),
                types: {
                    set: types
                },
                description
            }
        }
        save({
            variables
        })
    }

    const servicesData = serviceArray.filter((current) =>
        types.some((item) => current.category.types.includes(item))
    )

    const [form] = Form.useForm();

    return (
        <Container>
            <Title>Добавление шаблона</Title>
            <Form
                layout={'vertical'}
                onFinish={onSave}
                form={form}
            >
                <Form.Item
                    label="Название"
                    name="name"
                    rules={[{required: true, message: 'Введите имя!'}]}
                >
                    <Input placeholder={'Введите название'}/>
                </Form.Item>
                <Form.Item
                    label="Стоимость"
                    name="amount"
                    rules={[{required: true, message: 'Введите стоимость!'}]}
                >
                    <InputNumber placeholder={'Введите стоимость'}/>
                </Form.Item>
                <Form.Item
                    label="Описание"
                    name="description"
                    rules={[{required: true, message: 'Введите описание!'}]}
                >
                    <Input.TextArea placeholder={'Введите описание'}/>
                </Form.Item>
                <Form.Item
                    label="Тип мероприятия"
                    name="types"
                    rules={[{required: true, message: 'Выберете мероприятие!'}]}
                >
                    <Select
                        placeholder={'Выберите тип шаблона'}
                        value={types}
                        mode={'multiple'}
                        onChange={(value) => setTypes(value)}>
                        {
                            typeEnum.map((item) => {
                                return (
                                    <Select.Option key={item.id} value={item.id}>
                                        {item.name}
                                    </Select.Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Услуги"
                    name="services"
                    rules={[{required: true, message: 'Выберете услугу!'}]}
                >
                    <Select
                        onChange={
                            (value) => {
                                //авторасчет
                                if (autoCalc) {
                                    const array = serviceArray.filter((item) => {
                                        return value.includes(item.id)
                                    })

                                    const sum = array.reduce((acum, item) => {
                                        return acum + parseInt(item.amount)
                                    }, 0)
                                    form.setFieldsValue(
                                        {
                                            amount: sum
                                        }
                                    )
                                }
                            }
                        }
                        loading={queryLoading}
                        mode={'multiple'}
                    >
                        {servicesData.map((item) => {
                            return (
                                <Select.Option key={item.id} value={item.id}>
                                    {item.name}
                                </Select.Option>
                            )
                        })}
                    </Select>
                </Form.Item>
                <ButtonsContainer>
                    <Button
                        htmlType={'submit'}
                        loading={loading}
                        type={'primary'}
                    >
                        Добавить
                    </Button>
                    <Switch
                        checkedChildren={'Авторасчет'}
                        unCheckedChildren={'Авторасчет'}
                        onChange={(value) => {
                            setAutoCalc(value)
                        }}
                        defaultChecked
                    />
                    <Button
                        onClick={history.goBack}
                    >
                        Назад
                    </Button>
                </ButtonsContainer>
            </Form>

        </Container>
    )
}

export default AddTemplate
