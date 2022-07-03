import React, { useState } from 'react';
import styled , { keyframes } from 'styled-components';

export default function SelectText({label, fields, name, callback, select}){
    
    const [click, setClick] = useState('')

    function handleState(event){
        const value = event.target.value
        callback(value, name)
    }
    
    return (
        <Div >
            <Label className={select ? 'on' : click} onClick={() => setClick('on')}>
                <p translate="no">{label}</p>
            </Label>
            <Select onChange={(event) => handleState(event)} onClick={() => setClick('on')} defaultChecked={select}>
            {fields && fields.map((value) => (
                <Field value={value} key={value} onChange={(event) => handleState(event)} onClick={() => setClick('on')} >{value}</Field>    
            ))}
            </Select>
        </ Div>
    )
}

const Up = keyframes`
    0%{
        padding-left: 10px;
        padding-right: 10px;
    }
    100%{
        padding-left: 10px;
        padding-right: 10px;
        left: -77px;
        top: 15px;
    }
`;

const Div = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top:-10px;
`; 

const Label = styled.span`
    height: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-left: 15px;
    padding-right: 20px;
    position: relative;
    top: 42px;
    left: -72px;
    background-color: whitesmoke;
    transition: 2s;
    & > p{
        font-size: 15px;
        color: grey;
    }
    &.on{
        animation: ${Up} 0.2s ease-in-out forwards;
    }
    &.on > p{
        font-size: 13px;
        color: #0695D4;
    }
`;

const Select = styled.select`
    height: 55px;
    width: 250px;
    
    padding-left: 15px;
    border: 2px solid #03A696;
    border-radius: 5px;
    display: none;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    background-color: whitesmoke;
    &:hover{
        border-color: #F27457;
    }
    &:focus, select:focus {
        outline: 0;
    }
`;

const Field = styled.option`
    height: 100%;
    width: 100%;
    
    &:focus, select:focus {
        outline: 0;
        background-color: red;
    }
`;