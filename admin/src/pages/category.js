import React from 'react'
import styled from 'styled-components'
import {Title} from "../components/defaultTexts"
const Container = styled.div`
  display: flex;
  flex: 1;
`

const Category = ()=>{
    return (
        <Container>
            <Title>Список категории</Title>
        </Container>
    )
}

export default Category
