import Api from "../../api";
import React , { useState } from "react";
import SelectText from "../../components/SelectText";
import SelectDateTime from '../../components/SelectDateTime'
import styled from "styled-components";

export default function PostMovimentacao(){
    const tipos = ['', 'embarque', 'descarga', 'gate in', 'gate out', 'reposicionamento', 'pesagem', 'scanner']

    const [dados, setDados] = useState([
        { name: 'tipo', value: ''},
        { name: 'data_inicio', value: ''},
        { name: 'data_fim', value: ''},
    ])

    const [error, setError] = useState()
    const [sucess, setSucess] = useState()
    const setValuesBind = setValues.bind()

    function setValues(value, name){
        console.log(value + ' ' + name)
        const update = dados.map( (fields) => {
            return fields.name === name ? {...fields, value: value} : fields
        });
        setDados(update)
    }

    function sendForm(){
        setError()
        setSucess()
        const data = {}
        dados.map((field) => {     
            return data[field.name] = field.value
        })
        console.log(data)
        if(!data['tipo'] || !data['data_inicio'] || !data['data_fim']){
            setError('Todos os campos devem ser preenchidos')
            console.log(data)
        } else {
            console.log(data)
            Api.post('movimentacao/', data)
            .then(res => setSucess('Criado com sucesso'))
            .catch(erro => setError('Falha na conexão com o servidor!'))
        }
    }

    return(
        <Center>
            <Title>Adicionar container</Title>
            {error ? <Alert>{error}</Alert> : ''}
            {sucess ? <Sucess>{error}</Sucess> : ''}
            <SelectText fields={tipos} callback={setValuesBind} name="tipo" label="Tipo" />
            <SelectDateTime callback={setValuesBind} name="data_inicio" label="Data e Hora de início" />
            <SelectDateTime callback={setValuesBind} name="data_fim" label="Data e Hora do final" />
            <Button onClick={() => sendForm()}>Submeter</Button>
        </Center>
    )
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

const Sucess = styled.p`
    color: green;
    font-size: 15px;
`;

const Center = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
