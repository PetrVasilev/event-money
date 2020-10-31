import React, {useRef, useState} from 'react'
import styled from 'styled-components'
import {Button, Form, Input, InputNumber, message, Popconfirm, Select} from "antd"
import {useApolloClient, useMutation, useQuery} from '@apollo/react-hooks'
import {FIND_MANY_SERVICE} from "../gqls/service/queries"
import {DELETE_ONE_TEMPLATE, UPDATE_ONE_TEMPLATE} from "../gqls/template/mutations"
import {FIND_MANY_TEMPLATE} from "../gqls/template/queries"

const Container = styled.div`
  display: flex;
  flex-direction: column;
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

const UpdateTemplate = ({data, oldDataSource, setDataSource}) => {
    const [serviceArray, setServiceArray] = useState([])
    const [types, setTypes] = useState(data.types)

    const delEl = useRef(null)

    const apollo = useApolloClient()

    const {loading: queryLoading} = useQuery(FIND_MANY_SERVICE, {
        errorPolicy: 'ignore',
        onCompleted: ({findManyService}) => {
            setServiceArray(findManyService)
        },
        variables: {
            where: {}
        }
    })

    const [update, {loading: updateLoading}] = useMutation(UPDATE_ONE_TEMPLATE, {
        onError: () => {
            message.error('Что то пошло не так!')
        },
        onCompleted: async ({updateOneTemplate}) => {
            message.success('Обновлено!')
            updateOneTemplate.key = updateOneTemplate.id
            const newDataSource = oldDataSource.map(
                (item) => {
                    if (item.id === updateOneTemplate.id)
                        return updateOneTemplate
                    return item
                }
            )
            await apollo.writeQuery({
                query: FIND_MANY_TEMPLATE,
                data: {
                    findManyService: newDataSource
                }
            })
            setDataSource(newDataSource)

        }
    })

    const [delItem, {loading: delLoading}] = useMutation(DELETE_ONE_TEMPLATE, {
        onCompleted: async ({deleteOneTemplate}) => {
            message.success('Удалено!')
            deleteOneTemplate.key = deleteOneTemplate.id
            const newDataSource = oldDataSource.filter(
                (item) => {
                    return (item.id !== deleteOneTemplate.id)
                }
            )
            await apollo.writeQuery({
                query: FIND_MANY_TEMPLATE,
                data: {
                    findManyTemplate: newDataSource
                }
            })
            setDataSource(newDataSource)
        },
        onError: () => {
            message.error('Что то пошло не так!')
        },
        variables: {
            where: {
                id: data.id
            }
        }
    })

    const submit = (args) => {
        const variables = {
            data: {
                amount: {set: args.amount.toString()},
                services: {
                    set: args.services.map(
                        (item) => {
                            return {
                                id: item
                            }
                        }
                    )
                },
                description: {set: args.description},
                name: {set: args.name},
                types: {set: args.types}
            },
            where: {
                id: data.id
            }
        }
        console.log(variables)
        update({
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
    console.log('servicesData', servicesData)

    return (
        <Container>
            <Form
                initialValues={{remember: true}}
                onFinish={submit}
                onFinishFailed={
                    () => {

                    }
                }
            >

                <Form.Item
                    label="Название"
                    name="name"
                    fieldContext={''}
                    initialValue={data.name}
                    rules={[{required: true, message: 'Введите имя!'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Стоимость"
                    name="amount"
                    fieldContext={''}
                    initialValue={data.amount}
                    rules={[{required: true, message: 'Введите стоимость!'}]}
                >
                    <InputNumber/>
                </Form.Item>
                <Form.Item
                    label="Описание"
                    name="description"
                    fieldContext={''}
                    initialValue={data.description}
                    rules={[{required: true, message: 'Введите описание!'}]}
                >
                    <Input.TextArea/>
                </Form.Item>
                <Form.Item
                    label="Тип мероприятия"
                    name="types"
                    fieldContext={''}
                    initialValue={data.types}
                    rules={[{required: true, message: 'Выберете мероприятие!'}]}
                >
                    <Select
                        value={types}
                        mode={'multiple'}
                        onChange={value => setTypes(value)}
                    >
                        {
                            typeEnum.map(
                                (item) => {
                                    return (
                                        <Select.Option value={item.id}>{item.name}</Select.Option>
                                    )
                                })
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Услуги"
                    name="services"
                    fieldContext={''}
                    initialValue={data.services.map(
                        (item) => {
                            return item.id
                        }
                    )}
                    rules={[{required: true, message: 'Выберете услугу!'}]}
                >
                    <Select
                        loading={queryLoading}
                        mode={'multiple'}
                    >
                        {
                            servicesData.map(
                                (item) => {
                                    return (
                                        <Select.Option value={item.id}>{item.name}</Select.Option>
                                    )
                                })
                        }
                    </Select>
                </Form.Item>
                <Form.Item fieldContext={''}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={updateLoading}
                    >
                        Обновить
                    </Button>
                </Form.Item>
                <Form.Item fieldContext={''}>
                    <Button
                        type="danger"
                        onClick={
                            () => {
                                delEl.current.onClick()
                            }
                        }
                        loading={delLoading}
                    >
                        Удалить
                    </Button>
                    <Popconfirm
                        ref={delEl}
                        onConfirm={delItem}
                        title="Вы уверены"
                        okText="Да"
                        cancelText="Нет"
                    >
                    </Popconfirm>
                </Form.Item>
            </Form>
        </Container>
    )
}

export default UpdateTemplate
