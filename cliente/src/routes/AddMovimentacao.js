import Api from "../api";
import React from "react";
import SelectText from "../components/SelectText";
import SelectDateTime from '../components/SelectDateTime'
import styled from "styled-components";

export default class PostMovimentacao extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            tipo: '',
            data_inicio: '',
            data_fim: '',
            error: ''
        }
        this.setValues = this.setValues.bind(this)
        this.tipos = ['embarque', 'descarga', 'gate in', 'gate out', 'reposicionamento', 'pesagem', 'scanner']
    }

    setValues(field){
        this.setState(field)
    }

    handleInput(e){
        this.setState({[e.target.name]: e.target.value})
    }

    sendForm(){
        const data = {
            tipo: this.state.tipo,
            data_inicio: this.state.data_inicio,
            data_fim: this.state.data_fim,
        }
        if(!data['tipo'] || !data['data_inicio'] || !data['data_fim']){
            this.setState({'error' : 'Todos os campos devem ser preenchidos'})
            console.log(data)
        } else {
            console.log(data)
            Api.post('movimentacao/', data)
            .then(res => this.useState({'error': 'Criado com sucesso'}))
            .catch(this.useState({'error' : 'Falha na conexão com o servidor!'}))
        }
    }

    render(){
        return(
            <Center>
                <Title>Adicionar container</Title>
                {this.state.error ? <Alert>{this.state.error}</Alert> : ''}
                <SelectText fields={this.tipos} callback={this.setValues} name="tipo" label="Tipo" value={this.state.tipo} />
                <SelectDateTime callback={this.setValues} name="data_inicio" label="Data e Hora de início" value={this.state.data_inicio} />
                <SelectDateTime callback={this.setValues} name="data_fim" label="Data e Hora do final" value={this.state.data_fim} />
                <Button onClick={() => this.sendForm()}>Submeter</Button>
            </Center>
        )
    }
}

const Button = styled.button`
    width: 250px;
    height: 50px;
    margin-top: 20px;

    border: none;
    background-color: #03A696;
    color: white;
    cursor: pointer;

    &:hover{
        background-color: #F27457;
    }
`;

const Title = styled.h1`
    color: black;
    font-size: 25px;
`;

const Alert = styled.p`
    color: red;
    font-size: 15px;
`;

const Center = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
