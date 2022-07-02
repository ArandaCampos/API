import React , { useState, useEffect }from "react";
import Api from "../../api";
import styled from "styled-components";

export default function Movimentacao(){
    const [dados, setDados] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        async function getApi (){
            await Api.get('movimentacao/')
            .then(res => setDados(res.data))
            .catch(erro => setError('Falha na conexão com o servidor'))
        }
        getApi()
    }, [])

    async function excluir(id){
        await Api.delete(`movimentacao/${id}`)
        .then(res => setDados(res.data))
        .catch(erro => setError('Falha na conexão com o servidor'))

    }

    return(
        <Center>
            <Title>Movimentações</Title>
            {error ? <Alert>{error}</Alert> : ''}
            <Table>
                <HeaderTable>
                    <FieldTable>Tipo</FieldTable>
                    <FieldTable>Data e Hora de Início</FieldTable>
                    <FieldTable>Data e Hora de Fim</FieldTable>
                    <FieldTable>Editar</FieldTable>
                    <FieldTable>Exluir</FieldTable>
                </HeaderTable>
            {dados && dados.map((dado) => (
                <BodyTable>
                    <FieldTable>{dado.tipo}</FieldTable>
                    <FieldTable>{dado.data_inicio}</FieldTable>
                    <FieldTable>{dado.data_fim}</FieldTable>
                    <FieldTable><Button><Link href={'movimentacao/'+dado.id}>Editar</Link></Button></FieldTable>
                    <FieldTable><Button onClick={() => excluir(dado.id)}>Excluir</Button></FieldTable> 
                </BodyTable>
            ))}
                <FooterTable>
                    <FieldTable></FieldTable>
                    <td></td>
                    <td></td>
                    <td></td>
                    <FieldTable><Button><Link href='/movimentacao/post/'>Adicionar</Link></Button></FieldTable>
                </FooterTable>
            </Table>
        </Center>
    )

}

const Button = styled.button`
    width: 100%;
    height: 30px;

    border: none;
    background-color: #03A696;
    color:white;
    cursor: pointer;
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
