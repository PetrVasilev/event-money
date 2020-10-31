import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, Form, Input, InputNumber, message, Select } from 'antd'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { FIND_MANY_CATEGORY } from '../gqls/category/queries'
import { UPDATE_ONE_SERVICE } from '../gqls/service/mutations'
import { FIND_MANY_SERVICE } from '../gqls/service/queries'

const Container = styled.div`
    display: flex;
    flex-direction: column;
`

const UpdateService = ({ data }) => {
    const [categories, setCategories] = useState([])

    const { loading } = useQuery(FIND_MANY_CATEGORY, {
        errorPolicy: 'ignore',
        onCompleted: ({ findManyCategory }) => {
            setCategories(findManyCategory)
        }
    })

    const [update, { loading: updateLoading }] = useMutation(UPDATE_ONE_SERVICE, {
        onError: () => {
            message.error('Что то пошло не так!')
        },
        onCompleted: () => {
            message.success('Обновлено!')
        }
    })

    const submit = (args) => {
        update({
            variables: {
                data: {
                    amount: { set: args.amount.toString() },
                    category: {
                        connect: {
                            id: args.category
                        }
                    },
                    description: { set: args.description },
                    name: { set: args.name }
                },
                where: {
                    id: data.id
                }
            }
        })
    }

    return (
        <Container>
            <Form initialValues={{ remember: true }} onFinish={submit} onFinishFailed={() => {}}>
                <Form.Item
                    label="Название"
                    name="name"
                    initialValue={data.name}
                    rules={[{ required: true, message: 'Введите имя!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Стоимость"
                    name="amount"
                    initialValue={data.amount}
                    rules={[{ required: true, message: 'Введите стоимость!' }]}
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    label="Описание"
                    name="description"
                    initialValue={data.description}
                    rules={[{ required: true, message: 'Введите описание!' }]}
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item
                    label="Категория"
                    name="category"
                    initialValue={data.category.id}
                    rules={[{ required: true, message: 'Выберете категорию!' }]}
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
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={updateLoading}>
                        Обновить
                    </Button>
                </Form.Item>
            </Form>
        </Container>
    )
}

export default UpdateService
