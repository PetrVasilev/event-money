import React from 'react'
import styled from 'styled-components'
import {Title} from "../components/defaultTexts"
import {Table} from "antd"

const Container = styled.div`
  display: flex;
  flex: 1;
`

const Category = ()=>{
    return (
        <Container>
            <Title>Список категории</Title>
            <Table

            />
        </Container>
    )
}

export default Category
