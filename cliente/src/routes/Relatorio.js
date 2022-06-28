import React, { useState, useEffect} from "react";
import Api from "../api";
import styled from "styled-components";

export default function Relatorio(){
    const [dados, setDados] = useState()
    const [exportacao, setExportacao] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        async function getApi (){
            await Api.get('relatorio/cliente')
            .then(res => setDados(res.data))
            .catch(erro => setError('Falha na conexão com o servidor'))
        }
        getApi()
    }, [])

    useEffect(() => {
        async function getEx (){
            await Api.get('relatorio/count')
            .then(res => setExportacao(res.data))
            .catch(erro => setError('Falha na conexão com o servidor'))
        }
        getEx()
    }, [])


    return(
        
        <Center>
            <Title>Relatório</Title>
            {error ? <Alert>{error}</Alert> : ''}
            <Table>
                <HeaderTable>
                    <FieldTable>Tipo</FieldTable>
                    <FieldTable>Clientes</FieldTable>
                </HeaderTable>
            {dados && dados.map((dado) => (
                <BodyTable>
                    <FieldTable>{dado.tipo}</FieldTable>
                    <BodyTable>
                        {dado.clientes.map( (cliente) => (
                            <FieldTable>{cliente.cliente}</FieldTable>
                        ))}
                    </BodyTable>
                </BodyTable>
            ))}
            </Table>
        
            <Column>
            {exportacao && exportacao.map( (count) => (
                <Linear>                    
                    <h5>{count.tipo }</h5>
                    <h5>|</h5>
                    <h5>{count.quantia}</h5>
                </Linear>
            ))}
            </Column>
        </Center>    
    )

}

const Linear = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    background-color: #04BF9D;
    padding: 5px 10px;
    
    color: white;
    height: 30px;
    gap: 10px;
`;

const Column = styled.div`
    margin-top: 35px; 
    display: flex;
    flex-direction: row;
    gap: 10px;
`;
const Link = styled.a`
    text-decoration: none;
    color: white;
`;

const Table = styled.table`
    margin-top: 10px;
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
    margin-top: 20px;
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