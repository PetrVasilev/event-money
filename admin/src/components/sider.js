import React, {useRef} from 'react'
import {Menu, Popconfirm} from 'antd'
import {useApolloClient} from '@apollo/react-hooks'
import {CustomerServiceOutlined, ReadOutlined, SwitcherOutlined, UserDeleteOutlined} from '@ant-design/icons'
import {useHistory} from 'react-router-dom'
import styled from 'styled-components'
import {ADMIN} from '../gqls/auth/queries'

const Container = styled.div`
    display: flex;
    max-width: 300px;
    min-width: 300px;
`

const Sider = () => {
    const history = useHistory()
    const apollo = useApolloClient()
    const exitEl = useRef(null)

    const logOut = () => {
        localStorage.setItem('token', '')
        apollo.writeQuery({query: ADMIN, data: {admin: null}})
    }

    return (
        <Container>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={[history.location.pathname]}>
                <img alt={'banner'} src={'/images/banner.png'} style={{maxWidth:300,marginBottom:24}}/>
                <Menu.Item
                    onClick={() => {
                        history.push('/authorized/category')
                    }}
                    key="/authorized/category"
                    icon={<SwitcherOutlined/>}
                >
                    Категории
                </Menu.Item>
                <Menu.Item
                    key="/authorized/service"
                    onClick={() => {
                        history.push('/authorized/service')
                    }}
                    icon={<CustomerServiceOutlined/>}
                >
                    Услуги
                </Menu.Item>
                <Menu.Item
                    key="/authorized/template"
                    onClick={() => {
                        history.push('/authorized/template')
                    }}
                    icon={<ReadOutlined/>}
                >
                    Шаблоны
                </Menu.Item>
                <Menu.Item
                    key="exit"
                    onClick={() => {
                        exitEl.current.onClick()
                    }}
                    icon={<UserDeleteOutlined/>}
                >
                    <Popconfirm
                        ref={exitEl}
                        onConfirm={logOut}
                        title="Вы уверены"
                        okText="Да"
                        cancelText="Нет"
                    >
                        Выйти
                    </Popconfirm>
                </Menu.Item>
            </Menu>
        </Container>
    )
}

export default Sider
