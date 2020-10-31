import React from 'react'
import styled from 'styled-components'
import { Select } from 'antd'

const { Option } = Select

const Container = styled.div`
    display: flex;
    max-width: 400px;
    flex-direction: column;
`
const Label = styled.div`
    font-size: 16px;
    font-weight: bold;
`

const AddFieldSelect = ({
    text,
    style,
    type,
    placeholder,
    className,
    value,
    onChange,
    data,
    loading,
    mode
}) => {
    return (
        <Container style={style} className={className}>
            <Label>{text}</Label>
            <Select
                style={{ marginTop: 8 }}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                loading={loading}
                mode={mode}
            >
                {data
                    ? data.map((item) => {
                          return <Option value={item.id}>{item.name}</Option>
                      })
                    : null}
            </Select>
        </Container>
    )
}
export default AddFieldSelect
