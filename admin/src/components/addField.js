import React from 'react'
import styled from 'styled-components'
import {Input} from "antd"

const Container = styled.div`
  display: flex;
  max-width: 400px;
  flex-direction: column;
`
const Label = styled.div`
  font-size: 16px;
  font-weight: bold;
`

const AddField = ({text, style, type, placeholder, className}) => {
    return (
        <Container style={style} className={className}>
            <Label>{text}</Label>
            <Input style={{marginTop: 8}} type={type} placeholder={placeholder}/>
        </Container>
    )
}
export default AddField
