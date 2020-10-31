import React from 'react'
import styled from 'styled-components'
import {InputNumber} from "antd"

const Container = styled.div`
  display: flex;
  max-width: 400px;
  flex-direction: column;
`
const Label = styled.div`
  font-size: 16px;
  font-weight: bold;
`

const AddFieldNumber = ({text, style, placeholder, className, value, onChange,defaultValue}) => {
    return (
        <Container style={style} className={className}>
            <Label>{text}</Label>
            <InputNumber
                style={{marginTop: 8}}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                defaultValue={defaultValue}
            />
        </Container>
    )
}
export default AddFieldNumber
