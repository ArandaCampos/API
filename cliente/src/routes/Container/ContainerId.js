import React , { useState, useEffect }from "react";
import { useParams } from 'react-router-dom'
import Api from "../../api";
import styled from "styled-components";

export default function ContainerId(){
    const { id } = useParams()
    const [dados, setDados] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        async function getApi (){
            await Api.get(`container/${id}`)
            .then(res => setDados(res.data))
            .catch(erro => setError('Falha na conexão com o servidor'))
        }
        getApi()
    }, [])

    return(
        <Center>
            <Title>Container</Title>
            {error ? <Alert>{error}</Alert> : ''}
            <Table>
                <HeaderTable>
                    <FieldTable>Id</FieldTable>
                    <FieldTable>Cliente</FieldTable>
                    <FieldTable>Número</FieldTable>
                    <FieldTable>Tipo</FieldTable>
                    <FieldTable>Status</FieldTable>
                    <FieldTable>Categoria</FieldTable>
                </HeaderTable>
            {dados && dados.map((dado) => (
                <BodyTable>
                    <FieldTable><Input type="text" placeholder={dado.id}/></FieldTable>
                    <FieldTable><Input type="text" placeholder={dado.cliente} /></FieldTable>
                    <FieldTable><Input type="text" placeholder={dado.numero} /></FieldTable>
                    <FieldTable><Input type="text" placeholder={dado.tipo} /></FieldTable>
                    <FieldTable><Input type="text" placeholder={dado.status} /></FieldTable>
                    <FieldTable><Input type="text" placeholder={dado.categoria} /></FieldTable>
                </BodyTable>
            ))}
                <tr>
                    <FieldTable></FieldTable>
                    <FieldTable></FieldTable>
                    <FieldTable></FieldTable>
                    <FieldTable></FieldTable>
                    <FieldTable></FieldTable>
                    <FieldTable><Button>Atualizar</Button></FieldTable>
                </tr>
            </Table>
        </Center>
    )

}

const Input = styled.input`
    background-color: transparent;
    border:none;
    width: 90px;

    &:focus{
        border: none;
    }
`;

const Button = styled.button`
    width: 10opx;
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
