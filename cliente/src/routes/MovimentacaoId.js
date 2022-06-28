import React , { useState, useEffect }from "react";
import { useParams } from 'react-router-dom'
import Api from "../api";
import styled from "styled-components";

export default function MovimentacaoId(){
    const { id } = useParams()
    const [dados, setDados] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        async function getApi (){
            await Api.get(`movimentacao/${id}`)
            .then(res => setDados(res.data))
            .catch(erro => setError('Falha na conexão com o servidor'))
        }
        getApi()
    }, [])

    return(
        <Center>
            <Title>Movimentacao</Title>
            {error ? <Alert>{error}</Alert> : ""}
            <Table>
                <HeaderTable>
                    <FieldTable>Id</FieldTable>
                    <FieldTable>Tipo</FieldTable>
                    <FieldTable>Data e Hora de Início</FieldTable>
                    <FieldTable>Data e Hora de Fim</FieldTable>
                </HeaderTable>
            {dados && dados.map((dado) => (
                <BodyTable>
                    <FieldTable>{dado.id}</FieldTable>
                    <FieldTable>{dado.tipo}</FieldTable>
                    <FieldTable>{dado.data_inicio}</FieldTable>
                    <FieldTable>{dado.data_fim}</FieldTable>  
                </BodyTable>
            ))}
            </Table>
        </Center>
    )

}


const Button = styled.button`
    width: 100%;
    height: 30px;

    border: none;
    background-color: #03A696;
`;

const Link = styled.a`
    text-decoration: none;
    color: white;
`;

const Table = styled.table`
    margin-top: 30px;
    border-collapse: separate;
    border-spacing: 0px;
`;
const HeaderTable = styled.tr`
    background-color: #04BF9D;
    color: black;
`;

const BodyTable = styled.tr`
    background-color: #DEEFE7;
    color:black;
`;

const FooterTable = styled.tr`
    background-color: #DEEFE7;
    color:black;
`;


const FieldTable = styled.th`
    padding: 10px 20px;
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
