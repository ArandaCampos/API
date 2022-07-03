import React , { useState, useEffect }from "react";
import { useParams } from 'react-router-dom'
import Api from "../../api";
import styled from "styled-components";
import SelectDateTime from "../../components/SelectDateTime";
import SelectText from "../../components/SelectText";

export default function MovimentacaoId(){
    const { id } = useParams()
    const [dados, setDados] = useState()
    const [error, setError] = useState()
    const [sucess, setSucess] = useState()
    const tipos = ['', 'embarque', 'descarga', 'gate in', 'gate out', 'reposicionamento', 'pesagem', 'scanner']
    const setValuesBind = setValues.bind(this)

    useEffect(() => {
        async function getApi (){
            await Api.get(`movimentacao/${id}`)
            .then(res => setDados(res.data))
            .catch(erro => setError('Falha na conexão com o servidor'))
        }
        
        getApi()
    }, [ id ])
    
    async function removeForm(id){
        await Api.delete(`movimentacao/${id}`)
        .then(res => setDados(res.data))
        .catch(erro => setError('Falha na conexão com o servidor'))

    }

    function setValues(value, name){
        console.log(value + ' ' + name)
        const update = dados.map( (fields) => {
            if (name === 'tipo'){
                return {...fields, tipo: value}
            } else if (name === 'data_inicio'){
                return {...fields, data_inicio: value}
            } else if (name === 'data_fim'){
                return {...fields, data_fim: value}
            }
            return fields
        });
        setDados(update)
    }

    function sendForm(){
        setError()
        setSucess()
        var tipo = ''
        var data_inicio = ''
        var data_fim = ''
        dados.map( (dado) => {
            tipo = dado.tipo
            data_inicio = dado.data_inicio
            data_fim = dado.data_fim
            return 0;
        })
        console.log(tipo)
        if(!tipo || !data_inicio || !data_fim){
            setError('Todos os campos devem ser preenchidos')
            console.log(dados)
        } else {
            console.log(dados)
            Api.put(`movimentacao/${id}`, dados)
            .then(res => setSucess('Criado com sucesso'))
            .catch(erro => setError('Falha na conexão com o servidor!'))
        }
    }

    return(
        <Center>
            <Title>Editar Movimentacao</Title>
            {error ? <Alert>{error}</Alert> : ''}
            {sucess ? <Sucess>{error}</Sucess> : ''}
            {dados && dados.map((dado) => (

                <Center>
                    <SelectText fields={tipos} callback={setValuesBind} name="tipo" label="Tipo" select={dado.tipo} />
                    <SelectDateTime callback={setValuesBind} name="data_inicio" label="Data e Hora de início" value={dado.data_inicio}/>
                    <SelectDateTime callback={setValuesBind} name="data_fim" label="Data e Hora do final" value={dado.data_fim}/>
                    <Linear>
                        <ButtonRemove onClick={() => removeForm()} >Excluir</ButtonRemove>
                        <ButtonPut onClick={() => sendForm()}>Submeter</ButtonPut>
                    </Linear>
                </Center>
            ))}
        </Center>
    )

}

const Linear = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 5px 10px;
    
    color: white;
    height: 30px;
    gap: 15px;
`;

const ButtonPut = styled.button`
    width: 112px;
    height: 50px;
    margin-top: 20px;

    border: none;
    border-radius: 7px;
    background-color: #03A696;
    color: white;
    cursor: pointer;

    &:hover{
        border: 1px solid #03A696;
        background-color: white;
        color: #03A696;
    }
`;

const ButtonRemove = styled.button`
    width: 112px;
    height: 50px;
    margin-top: 20px;

    border: none;
    border-radius: 7px;
    background-color: #F27457;
    color: white;
    cursor: pointer;

    &:hover{
        border: 1px solid #F27457; 
        background-color: white;
        color: #F27457;
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
