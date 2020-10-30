import React from 'react'
import styled from 'styled-components'
import {Title} from "../components/defaultTexts"
const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`

const AddCategory = ()=>{
    return (
        <Container>
            <Title>Добавление категории</Title>

        </Container>
    )
}

export default AddCategory
