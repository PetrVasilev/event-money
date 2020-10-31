import React from 'react'
import styled from 'styled-components'
import {useMutation} from '@apollo/react-hooks'
import {useHistory} from 'react-router-dom'
import {Button, Form, Input, message, Select} from 'antd'
import {Title} from '../components/defaultTexts'
import {CREATE_ONE_CATEGORY} from '../gqls/category/mutations'

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
    }
]

const AddCategory = () => {

    const history = useHistory()

    const [save, {loading}] = useMutation(CREATE_ONE_CATEGORY, {
        onCompleted: () => {
            message.success('Добавлено')
            history.goBack()
        },
        onError: (error) => {
            if (error.message === 'GraphQL error: exist') {
                message.error('Категория уже существует')
                return null
            }
            message.error('Что то пошло не так')
        }
    })

    const onSave = ({name, types}) => {
        const variables = {
            data: {
                name,
                types: {
                    set: types
                }
            }
        }
        save({
            variables
        })
    }

    return (
        <Container>
            <Title>Добавление категории</Title>
            <Form
                onFinish={onSave}
                initialValues={{remember: true}}
                layout={'vertical'}
                style={{marginTop: 16}}
            >
                <Form.Item
                    name={'name'}
                    label={'Название'}
                    rules={[{required: true, message: 'Введите имя'}]}
                    initialValue={''}
                >
                    <Input
                        placeholder={'Введите название'}
                    />
                </Form.Item>
                <Form.Item
                    name={'types'}
                    label={'Тип мероприятия'}
                    rules={[{required: true, message: 'Введите имя'}]}
                >
                    <Select mode={'multiple'}>
                        {typeEnum.map((item) => {
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
                    <Button
                        onClick={
                            () => {
                                history.goBack()
                            }
                        }
                    >
                        Назад
                    </Button>

                </ButtonsContainer>
            </Form>
        </Container>
    )
}

export default AddCategory
