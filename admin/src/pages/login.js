import React, {useState} from 'react'
import styled from 'styled-components'
import {Button, Input} from "antd"

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
  min-width: 320px;
  @media screen and (max-width: 800px)
  {
    align-items: center;
    min-width: 290px;
  }
`

const Login = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

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
                />
                <Label style={{marginTop: 16}}>Пароль</Label>
                <Input
                    style={{marginTop: 8}}
                    onChange={
                        (e) => {
                            setPassword(e.target.value)
                        }
                    }

                />
                <Button
                    style={{marginTop: 16,maxWidth:200,alignSelf:'center'}}
                    type={'primary'}
                >
                    Войти
                </Button>
            </ContentContainer>
        </Container>
    )
}
export default Login
