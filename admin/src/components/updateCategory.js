import React, {useState} from 'react'
import styled from 'styled-components'
import {Button, Form, Input, InputNumber, message, Popconfirm, Select} from "antd"
import {useApolloClient, useMutation} from '@apollo/react-hooks'
import {DELETE_ONE_CATEGORY, UPDATE_ONE_CATEGORY} from "../gqls/category/mutations"
import {FIND_MANY_CATEGORY} from "../gqls/category/queries"

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

const UpdateCategory = ({data}) => {
    const [types, setTypes] = useState(data.types)

    const [update, {loading: updateLoading}] = useMutation(UPDATE_ONE_CATEGORY, {
        onError: () => {
            message.error('Что то пошло не так!')
        },
        onCompleted: async ({updateOneCategory}) => {
            message.success('Обновлено!')
        }
    })

    const [delItem, {loading: delLoading}] = useMutation(DELETE_ONE_CATEGORY, {
        onCompleted: async ({deleteOneCategory}) => {
            message.success('Удалено!')
            const newDataSource = oldDataSource.filter(
                (item) => {
                    return (item.id !== deleteOneCategory.id)
                }
            )
            await apollo.writeQuery({
                query: FIND_MANY_CATEGORY,
                data: {
                    findManyCategory: newDataSource
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
                name: {set: args.name},
                types: {set: args.types}
            },
            where: {
                id: data.id
            }
        }
        update({
            variables
        })
    }
    const servicesData = serviceArray.filter(
        (current) => {
            return types.some(item => current.category.types.includes(item))
        }
    )
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
                    <Popconfirm
                        onConfirm={delItem}
                        title="Вы уверены"
                        okText="Да"
                        cancelText="Нет"
                    >
                        <Button
                            type="danger"
                            loading={delLoading}
                        >
                            Удалить
                        </Button>
                    </Popconfirm>
                </Form.Item>
            </Form>
        </Container>
    )
}

export default UpdateCategory
