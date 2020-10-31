import React, {useRef, useState} from 'react'
import styled from 'styled-components'
import {Button, Form, Input, InputNumber, message, Popconfirm, Select} from "antd"
import {useApolloClient, useMutation, useQuery} from '@apollo/react-hooks'
import {FIND_MANY_CATEGORY} from "../gqls/category/queries"
import {DELETE_ONE_SERVICE, UPDATE_ONE_SERVICE} from "../gqls/service/mutations"
import {FIND_MANY_SERVICE} from "../gqls/service/queries"
import {FIND_MANY_TEMPLATE} from "../gqls/template/queries"

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  flex-wrap: wrap;
`

const UpdateService = ({data, oldDataSource, setDataSource}) => {
    const [categories, setCategories] = useState([])
    const delEl = useRef(null)

    const apollo = useApolloClient()

    const {loading} = useQuery(FIND_MANY_CATEGORY, {
        errorPolicy: 'ignore',
        onCompleted: ({findManyCategory}) => {
            setCategories(findManyCategory)

        }
    })

    const [update, {loading: updateLoading}] = useMutation(UPDATE_ONE_SERVICE, {
        onError: () => {
            message.error('Что то пошло не так!')
        },
        onCompleted: async ({updateOneService}) => {
            message.success('Обновлено!')
            updateOneService.key = updateOneService.id
            const newDataSource = oldDataSource.map(
                (item) => {
                    if (item.id === updateOneService.id)
                        return updateOneService
                    return item
                }
            )
            await apollo.writeQuery({
                query: FIND_MANY_SERVICE,
                data: {
                    findManyService: newDataSource
                }
            })
            setDataSource(newDataSource)

        }
    })
    const [delItem, {loading: delLoading}] = useMutation(DELETE_ONE_SERVICE, {
        onCompleted: async ({deleteOneService}) => {
            message.success('Удалено!')
            deleteOneService.key = deleteOneService.id
            const newDataSource = oldDataSource.filter(
                (item) => {
                    return (item.id !== deleteOneService.id)
                }
            )
            await apollo.writeQuery({
                query: DELETE_ONE_SERVICE,
                data: {
                    findManyService: newDataSource
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
        update({
            variables: {
                data: {
                    amount: {set: args.amount.toString()},
                    category: {
                        connect: {
                            id: args.category
                        }
                    },
                    description: {set: args.description},
                    name: {set: args.name}
                },
                where: {
                    id: data.id
                }
            }
        })
    }

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
                    label="Категория"
                    name="category"
                    fieldContext={''}
                    initialValue={data.category.id}
                    rules={[{required: true, message: 'Выберете категорию!'}]}
                >
                    <Select
                        loading={loading}
                    >
                        {
                            categories.map(
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

export default UpdateService
