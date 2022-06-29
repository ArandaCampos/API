import Api from "../api";
import React from "react";
import InputLabel from "../components/InputLabel";
import SelectText from "../components/SelectText";
import styled from "styled-components";

export default class PostContainer extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            cliente: '',
            numero: '',
            tipo: 40,
            status: 'cheio',
            categoria: 'importação',
            movimentacao: '1',
            error: '',
            movs: []
        }
        this.setValues = this.setValues.bind(this)
    }

    setValues(field){
        this.setState(field)
    }

    handleInput(e){
        this.setState({[e.target.name]: e.target.value})
    }

    sendForm(){
        const data = {
            cliente: this.state.cliente,
            numero: this.state.numero,
            tipo: this.state.tipo,
            status: this.state.status,
            categoria: this.state.categoria,
            movimentacao: this.state.movimentacao
        }
        if(!data['numero'].match("[A-Z]{4}[0-9]{7}")){
            this.setState({error: 'Número deve seguir o padrão: TEST1234567'})
        } else {
            console.log(data)
            Api.post('container/', data)
            .then(res => this.useState({'msg': 'Criado com sucesso'}))
            .catch(err => this.useState({'msg': err}))
        }
    }

    render(){
        return(
            <Center>
                <Title>Adicionar container</Title>
                {this.state.error ? <Alert>{this.state.error}</Alert> : ''}
                <InputLabel callback={this.setValues} name="cliente" label="Cliente" value='' />
                <InputLabel callback={this.setValues} name="numero" label="Numero" value='' />
                <SelectText fields={['40', '20']} callback={this.setValues} name="tipo" label="Tipo" value={this.state.tipo} />
                <SelectText fields={['cheio', 'vazio']} callback={this.setValues} name="status" label="Status" value={this.state.status} />
                <SelectText fields={['importação', 'exportação']} callback={this.setValues} name="categoria" label="Categoria" value={this.state.categoria} />
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
