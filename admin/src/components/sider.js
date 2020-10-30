import React, {useRef} from 'react'
import {Menu, Popconfirm} from 'antd'
import {useApolloClient} from '@apollo/react-hooks'
import {HomeOutlined, ShopOutlined, UserDeleteOutlined} from '@ant-design/icons'
import {useHistory} from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex: 1;
  max-width: 300px;
`

const Sider = () => {
    const history = useHistory()
    const apollo = useApolloClient()
    const exitEl = useRef(null)
    const logOut = () => {
        localStorage.setItem('token', '')
        history.replace('/')
    }
    return (
        <Container>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={[history.location.pathname]}>
                <Menu.Item
                    onClick={
                        () => {
                            history.push('/authorized/category')
                        }
                    }
                    key="/authorized/category"
                    icon={<HomeOutlined/>}
                >
                    Категория
                </Menu.Item>
                <Menu.Item
                    key="/authorized/addCategory"
                    onClick={
                        () => {
                            history.push('/authorized/addCategory')
                        }
                    }
                    icon={<ShopOutlined/>}
                >
                    Добавить категорию
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
