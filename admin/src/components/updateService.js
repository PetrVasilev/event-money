import React, {useState} from 'react'
import styled from 'styled-components'
import {Button, Form, Input, InputNumber, message, Popconfirm, Select} from 'antd'
import {useMutation, useQuery} from '@apollo/react-hooks'

import {FIND_MANY_CATEGORY} from '../gqls/category/queries'
import {DELETE_ONE_SERVICE, UPDATE_ONE_SERVICE} from '../gqls/service/mutations'
import {FIND_MANY_SERVICE} from '../gqls/service/queries'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 500px;
`
const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

const UpdateService = ({data}) => {
    const [categories, setCategories] = useState([])

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
        onCompleted: () => {
            message.success('Обновлено!')
        }
    })

    const [delItem, {loading: delLoading}] = useMutation(DELETE_ONE_SERVICE, {
        onCompleted: async () => {
            message.success('Удалено!')
        },
        onError: () => {
            message.error('Что то пошло не так!')
        },
        update: (cache, {data: requestData}) => {
            if (cache && requestData.deleteOneService) {
                const {findManyService: oldServices} = cache.readQuery({
                    query: FIND_MANY_SERVICE
                })
                cache.writeQuery({
                    query: FIND_MANY_SERVICE,
                    data: {
                        findManyService: oldServices.filter(
                            (item) => item.id !== requestData.deleteOneService.id
                        )
                    }
                })
            }
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
            <Form initialValues={{remember: true}} onFinish={submit} layout={'vertical'}>
                <Form.Item
                    label="Название"
                    name="name"
                    initialValue={data.name}
                    rules={[{required: true, message: 'Введите имя!'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Стоимость"
                    name="amount"
                    initialValue={data.amount}
                    rules={[{required: true, message: 'Введите стоимость!'}]}
                >
                    <InputNumber/>
                </Form.Item>
                <Form.Item
                    label="Описание"
                    name="description"
                    initialValue={data.description}
                    rules={[{required: true, message: 'Введите описание!'}]}
                >
                    <Input.TextArea/>
                </Form.Item>
                <Form.Item
                    label="Категория"
                    name="category"
                    initialValue={data.category.id}
                    rules={[{required: true, message: 'Выберете категорию!'}]}
                >
                    <Select loading={loading}>
                        {categories.map((item) => {
                            return (
                                <Select.Option key={item.id} value={item.id}>
                                    {item.name}
                                </Select.Option>
                            )
                        })}
                    </Select>
                </Form.Item>
                <ButtonsContainer>
                    <Button type="primary" htmlType="submit" loading={updateLoading}>
                        Обновить
                    </Button>
                    <Popconfirm onConfirm={delItem} title="Вы уверены" okText="Да" cancelText="Нет">
                        <Button type="danger" loading={delLoading}>
                            Удалить
                        </Button>
                    </Popconfirm>
                </ButtonsContainer>
            </Form>
        </Container>
    )
}

export default UpdateService
