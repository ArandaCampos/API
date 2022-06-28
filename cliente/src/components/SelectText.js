import React from 'react';
import styled , { keyframes } from 'styled-components';

export default class SelectText extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            click: '',
            label: props.label,
            value: props.value,
            fields: props.fields,
            name: props.name,
        }
    }

    async handleState(event){
        await this.setState({ value: event.target.value })
        this.props.callback({[this.state.name]: this.state.value})
    }

    render(){
        return (
            <Div >
                <Label className={this.state.click} onClick={() => this.setState({click: 'on'})}>
                    <p translate="no">{this.state.label}</p>
                </Label>
                <Select value={this.state.value} onChange={(event) => {this.handleState(event)}} onClick={() => this.setState({click: 'on'})}>
                {this.state.fields && this.state.fields.map((value) => (
                    <Field key={value} onChange={(event) => {this.handleState(event)}} onClick={() => this.setState({click: 'on'})}>{value}</Field>    
                ))}
                </Select>
            </ Div>
        )
    }
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
    background-color: white;
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
    background-color: white;
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