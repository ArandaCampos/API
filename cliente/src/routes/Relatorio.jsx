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
                    <tr>
                        <FieldTable>Tipo</FieldTable>
                        <FieldTable>Clientes</FieldTable>
                    </tr>
                </HeaderTable>
                <BodyTable>
                
                {dados && dados.map((dado) => (
                    <tr key={dado.id}>
                        <FieldTable>{dado.tipo}</FieldTable>
                        <FieldTable>
                            <Row>
                            {dado.clientes.map( (cliente) => (
                                <div key={cliente.id}>{cliente.cliente}</div>
                            ))}
                            </Row>
                        </FieldTable>
                    </tr>
                ))}
                </BodyTable>
            </Table>
        
            <Column>
            {exportacao && exportacao.map( (count) => (
                <Linear key={count.id}>                    
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

const Row = styled.span`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 30px;
`;

const Column = styled.div`
    margin-top: 35px; 
    display: flex;
    flex-direction: row;
    gap: 10px;
`;

const Table = styled.table`
    margin-top: 10px;
    border-collapse: separate;
    border-spacing: 0px;
`;
const HeaderTable = styled.thead`
    background-color: #04BF9D;
    color: black;
`;

const BodyTable = styled.tbody`
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