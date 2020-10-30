import React from 'react'
import styled from 'styled-components'

const List = styled.div``

const Event = styled.div``

const events = [
    {
        id: 1,
        name: 'Свадьба Васильевых',
        category: 'Свадьба',
        date: new Date(),
        created: new Date()
    }
]

const Events = () => {
    return (
        <List>
            {events.map((item) => (
                <Event key={item.id}>
                    <div className="name">{item.name}</div>
                    <div className="category">{item.category}</div>
                </Event>
            ))}
        </List>
    )
}

export default Events
