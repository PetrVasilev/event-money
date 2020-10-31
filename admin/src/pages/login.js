import React, {useState} from 'react'
import styled from 'styled-components'
import {Button, Input, message} from "antd"
import {useHistory} from 'react-router-dom'
import {useApolloClient, useMutation} from '@apollo/react-hooks'
import {SIGN_IN_ADMIN} from "../gqls/auth/mutations"
import {ADMIN} from "../gqls/auth/queries"

const Container = styled.div`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: flex;
  margin: 20px 40px;
  @media screen and (max-width: 800px)
  {
      margin: 15px;
  }
`
const Title = styled.div`
  font-weight: bold;
  font-size: 24px;
  justify-content: center;
  text-align: center;
  display: flex;
`
const Label = styled.div`
  font-size: 16px;
`
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 290px;
  align-items: center;
`

const Login = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const apollo = useApolloClient()

    const history = useHistory()

    const [sign, {loading}] = useMutation(SIGN_IN_ADMIN, {
        onError: () => {
            message.error('что то пошло не так')
        },
        onCompleted: ({signInAdmin}) => {
            apollo.writeQuery({query: ADMIN, data: {admin: signInAdmin.admin}})
            localStorage.setItem('token', signInAdmin.token)
            history.replace('/authorized/addCategory')
        }
    })

    const onSign = () => {
        if (login === '') {
            message.error('Введите логин')
            return null
        }
        if (password === '') {
            message.error('Введите пароль')
            return null
        }
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
                <Label style={{marginTop: 16}}>Логин</Label>
                <Input
                    style={{marginTop: 8}}
                    onChange={
                        (e) => {
                            setLogin(e.target.value)
                        }
                    }
                    value={login}
                />
                <Label style={{marginTop: 16}}>Пароль</Label>
                <Input
                    style={{marginTop: 8}}
                    onChange={
                        (e) => {
                            setPassword(e.target.value)
                        }
                    }
                    value={password}
                    type={'password'}
                    onKeyDown={
                        (e) => {
                            if (e.key === 'Enter') {
                                onSign()
                            }
                        }
                    }

                />

                <Button
                    style={{marginTop: 16, maxWidth: 200, alignSelf: 'center'}}
                    type={'primary'}
                    onClick={onSign}
                    loading={loading}
                >
                    Войти
                </Button>
            </ContentContainer>
        </Container>
    )
}
export default Login
