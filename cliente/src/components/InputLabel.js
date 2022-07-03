import React, { useState } from 'react';
import styled , { keyframes } from 'styled-components';

export default function InputLabel({ name, label, callback, field }){

    const [click, setClick] = useState('')

    function handleState(event){
        const value = event.target.value
        const name = event.target.name
        callback(value, name)
    }

    return (
        <Div >
            <Label className={field ? 'on' : click} onClick={() => setClick('on')}>
                <p translate="no">{label}</p>
            </Label>
            <Input name={name} onChange={(event) => handleState(event)} onFocus={() => setClick('on')} defaultValue={field}></Input>
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
    padding-left: 20px;
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

const Input = styled.input`
    height: 50px;
    width: 230px;
    padding-left: 15px;
    border: 2px solid #03A696;
    border-radius: 5px;
    background-color: whitesmoke;
    &:hover{
        border-color: #F27457;
    }
    &:focus, select:focus {
        outline: 0;
    }
`;