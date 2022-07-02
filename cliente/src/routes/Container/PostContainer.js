import Api from "../../api";
import React, { useState, useEffect } from "react";
import InputLabel from '../../components/InputLabel'
import SelectText from "../../components/SelectText";
import styled from "styled-components";

export default function PostContainer(){
    const [dados, setDados] = useState([
        { name: 'cliente', value: ''},
        { name: 'numero', value: ''},
        { name: 'tipo', value: ''},
        { name: 'status', value: ''},
        { name: 'categoria', value: ''},
        { name: 'movimentacao', value: '2' }
    ])
    // const [ids, setIds] = useState()

    useEffect(() => {
        const response = Api.get('movimentacao/')
        console.log(response)
    }, [])

    const [error, setError] = useState()
    const [sucess, setSucess] = useState()
    const setValuesBind = setValues.bind(this)

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

        if(!data['numero'].match("[A-Z]{4}[0-9]{7}")){
            setError('Número deve seguir o padrão: TEST1234567')
        }else if (data['tipo'] === '' || data['status'] === '' || data['categoria'] === ''){
            setError('Todos os campos devem ser preenchidos!')
        } else {
            console.log(data)
            Api.post('container/', data)
            .then((res) => setSucess('Criado com sucesso'))
            .catch((err) => setError('Falha de conexão com o servidor!'))
        }
    }

    return(
        <Center>
            <Title>Adicionar container</Title>
            {error ? <Alert>{error}</Alert> : ''}
            {sucess ? <Sucess>{sucess}</Sucess> : ''}
            <InputLabel callback={setValuesBind} name="cliente" label="Cliente" />
            <InputLabel callback={setValuesBind} name="numero" label="Numero" />
            <SelectText fields={['','40', '20']} callback={setValuesBind} name="tipo" label="Tipo" />
            <SelectText fields={['','cheio', 'vazio']} callback={setValuesBind} name="status" label="Status" />
            <SelectText fields={['','importação', 'exportação']} callback={setValuesBind} name="categoria" label="Categoria" />
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
