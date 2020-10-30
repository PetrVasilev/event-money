import React, { useRef } from 'react'
import { Layout, Menu, Popconfirm } from 'antd'
import { useApolloClient } from '@apollo/react-hooks'
import {
    UploadOutlined,
    UserOutlined,
    ShopOutlined,
    UserDeleteOutlined,
    CreditCardOutlined,
    BankOutlined,
    HomeOutlined
} from '@ant-design/icons'
import { useHistory } from 'react-router-dom'

const { Sider: AntSider } = Layout
const Sider = () => {
    const history = useHistory()
    const apollo = useApolloClient()
    const exitEl = useRef(null)
    const logOut = () => {
        localStorage.setItem('token', '')
        history.replace('/')
    }
    return (
        <AntSider>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={[history.location.pathname]}>
                <Menu.Item
                    onClick={() => {
                        history.push('/authorized/category')
                    }}
                    key="/authorized/category"
                    icon={<HomeOutlined />}
                >
                    Главная
                </Menu.Item>
                <Menu.Item
                    key="/authorized/products"
                    onClick={() => {
                        history.push('/authorized/products')
                    }}
                    icon={<ShopOutlined />}
                >
                    Мои товары
                </Menu.Item>
                <Menu.Item
                    key="/authorized/addProducts"
                    icon={<BankOutlined />}
                    onClick={() => {
                        history.push('/authorized/addProducts')
                    }}
                >
                    Добавить товары
                </Menu.Item>
                <Menu.Item
                    key="/authorized/orders"
                    icon={<CreditCardOutlined />}
                    onClick={() => {
                        history.push('/authorized/orders')
                    }}
                >
                    Заказы
                </Menu.Item>

                <Menu.Item
                    key="exit"
                    onClick={() => {
                        exitEl.current.onClick()
                    }}
                    icon={<UserDeleteOutlined />}
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
        </AntSider>
    )
}

export default Sider
