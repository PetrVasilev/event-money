import React, {useState} from 'react'
import styled from 'styled-components'
import {Button, Form, Input, message} from 'antd'
import {useHistory} from 'react-router-dom'
import {useApolloClient, useMutation} from '@apollo/react-hooks'
import {SIGN_IN_ADMIN} from '../gqls/auth/mutations'
import {ADMIN} from '../gqls/auth/queries'
import Footer from "../components/footer"

const Container = styled.div`
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    display: flex;
    margin: 0 40px;
    @media screen and (max-width: 800px) {
        margin: 0 15px;
    }
`
const Title = styled.div`
    font-weight: bold;
    font-size: 24px;
    justify-content: center;
    text-align: center;
    display: flex;
`

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 290px;
    align-items: center;
    justify-content: center;
    flex: 1;
`

const Login = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const apollo = useApolloClient()

    const history = useHistory()

    const [sign, {loading}] = useMutation(SIGN_IN_ADMIN, {
        onError: ({message: errorMessage}) => {
            console.log('errorMessage', errorMessage)
            if (errorMessage === 'errorMessage GraphQL error: not exist' || 'errorMessage GraphQL error: password incorrect') {
                message.error('Неверен пароль или логин')
                return null
            }
            message.error('что то пошло не так')
        },
        onCompleted: ({signInAdmin}) => {
            apollo.writeQuery({query: ADMIN, data: {admin: signInAdmin.admin}})
            localStorage.setItem('token', signInAdmin.token)
            history.replace('/authorized/addCategory')
        }
    })

    const onSign = ({login, password}) => {
        sign({
            variables: {
                data: {
                    login,
                    password
                }
            }
        })
    }

    return (
        <Container>
            <ContentContainer>
                <Title>Авторизуйтесь чтобы войти в систему</Title>
                <Form
                    layout={'vertical'}
                    initialValues={{remember: true}}
                    onFinish={onSign}
                    style={{marginTop: 16}}
                >
                    <Form.Item
                        label={'Логин'}
                        name={'login'}
                        rules={[{required: true, message: 'Введите логин'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label={'Пароль'}
                        name={'password'}
                        rules={[{required: true, message: 'Введите пароль'}]}
                    >
                        <Input.Password/>
                    </Form.Item>
                    <Button
                        type={'primary'}
                        loading={loading}
                        htmlType={'submit'}
                    >
                        Войти
                    </Button>
                </Form>

            </ContentContainer>
            <Footer/>
        </Container>
    )
}
export default Login
