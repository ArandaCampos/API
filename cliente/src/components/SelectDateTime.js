import React , { useState } from 'react';
import styled , { keyframes } from 'styled-components';

export default function SelectDateTime({ label, name, callback }){
    const [click, setClick] = useState('')

    function handleState(event){
        const value = event.target.value
        callback(value, name)
    }

    return (
        <Div >
            <Label className={click} onClick={() => setClick('on')}>
                <p translate="no">{label}</p>
            </Label>
            <Input type="datetime-local" onChange={(event) => handleState(event)} onClick={() => setClick('on')} />
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
        left: -42px;
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
    left: -32px;
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
    height: 55px;
    width: 225px;
    
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
