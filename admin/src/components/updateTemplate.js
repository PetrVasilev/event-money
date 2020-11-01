import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, Form, Input, InputNumber, message, Popconfirm, Select } from 'antd'
import { useMutation, useQuery } from '@apollo/react-hooks'

import { FIND_MANY_SERVICE } from '../gqls/service/queries'
import { DELETE_ONE_TEMPLATE, UPDATE_ONE_TEMPLATE } from '../gqls/template/mutations'
import { FIND_MANY_TEMPLATE } from '../gqls/template/queries'
import {TYPES_ENUMS} from "../utils/enums"

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

const typeEnum = TYPES_ENUMS

const UpdateTemplate = ({ data }) => {
    const [serviceArray, setServiceArray] = useState([])
    const [types, setTypes] = useState(data.types)

    const { loading: queryLoading } = useQuery(FIND_MANY_SERVICE, {
        errorPolicy: 'ignore',
        onCompleted: ({ findManyService }) => {
            setServiceArray(findManyService)
        },
        variables: {
            where: {}
        }
    })

    const [update, { loading: updateLoading }] = useMutation(UPDATE_ONE_TEMPLATE, {
        onError: () => {
            message.error('Что то пошло не так!')
        },
        onCompleted: () => {
            message.success('Обновлено!')
        }
    })

    const [delItem, { loading: delLoading }] = useMutation(DELETE_ONE_TEMPLATE, {
        onCompleted: () => {
            message.success('Удалено!')
        },
        onError: (err) => {
            message.error(err)
        },
        update: (cache, { data: _data }) => {
            if (cache && _data.deleteOneTemplate) {
                const { findManyTemplate: oldTemplates } = cache.readQuery({
                    query: FIND_MANY_TEMPLATE
                })
                cache.writeQuery({
                    query: FIND_MANY_TEMPLATE,
                    data: {
                        findManyTemplate: oldTemplates.filter(
                            (item) => item.id !== _data.deleteOneTemplate.id
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
        const variables = {
            data: {
                amount: { set: args.amount.toString() },
                services: {
                    set: args.services.map((item) => ({
                        id: item
                    }))
                },
                description: { set: args.description },
                name: { set: args.name },
                types: { set: args.types }
            },
            where: {
                id: data.id
            }
        }
        update({
            variables
        })
    }

    const servicesData = serviceArray.filter((current) =>
        types.some((item) => (current.category ? current.category.types.includes(item) : false))
    )

    return (
        <Container>
            <Form initialValues={{ remember: true }} onFinish={submit} layout={'vertical'}>
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
                <Form.Item label="Описание" name="description" initialValue={data.description}>
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    label="Тип мероприятия"
                    name="types"
                    initialValue={data.types}
                    rules={[{ required: true, message: 'Выберете мероприятие!' }]}
                >
                    <Select value={types} mode={'multiple'} onChange={(value) => setTypes(value)}>
                        {typeEnum.map((item) => {
                            return (
                                <Select.Option key={item.id} value={item.id}>
                                    {item.name}
                                </Select.Option>
                            )
                        })}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Услуги"
                    name="services"
                    initialValue={data.services.map((item) => {
                        return item.id
                    })}
                    rules={[{ required: true, message: 'Выберете услугу!' }]}
                >
                    <Select loading={queryLoading} mode={'multiple'}>
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

export default UpdateTemplate
