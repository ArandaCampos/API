import React , { useState, useEffect }from "react";
import Api from "../../api";
import styled from "styled-components";

export default function Cont(){
    const [dados, setDados] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        async function getApi (){
            await Api.get('container/')
            .then(res => setDados(res.data))
            .catch(erro => setError('Falha na conexão com o servidor'))
        }
        getApi()
    }, [])

    async function excluir(id){
        await Api.delete(`container/${id}`)
        .then(res => setDados(res.data))
        .catch(erro => setError('Falha na conexão com o servidor'))
    }

    return(
        <>
            <Title>Container</Title>
            {error ? <Alert>{error}</Alert> : ''}
            <Center >
                <Table>
                    <HeaderTable>
                        <FieldTable>Id</FieldTable>
                        <FieldTable>Cliente</FieldTable>
                        <FieldTable>Número</FieldTable>
                        <FieldTable>Tipo</FieldTable>
                        <FieldTable>Status</FieldTable>
                        <FieldTable>Categoria</FieldTable>
                        <FieldTable>Editar</FieldTable>
                        <FieldTable>Excluir</FieldTable>
                    </HeaderTable>
                {dados && dados.map((dado) => (
                    <BodyTable>
                        <FieldTable>{dado.id}</FieldTable>
                        <FieldTable>{dado.cliente}</FieldTable>
                        <FieldTable>{dado.numero}</FieldTable>
                        <FieldTable>{dado.tipo}</FieldTable>
                        <FieldTable>{dado.status}</FieldTable>
                        <FieldTable>{dado.categoria}</FieldTable>
                        <FieldTable><Button><Link href={'container/'+dado.id}>Editar</Link></Button></FieldTable>
                        <FieldTable><Button onClick={() => excluir(dado.id)}>Excluir</Button></FieldTable>
                    </BodyTable>
                ))}
                    <FooterTable>
                        <FieldTable></FieldTable>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <FieldTable><Button><Link href='/container/post/'>Adicionar</Link></Button></FieldTable>
                    </FooterTable>
                </Table>
            </Center>
        </>
    )
}

const Button = styled.button`
    width: 100%;
    height: 30px;

    border: none;
    background-color: #03A696;
    color: white;
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
