import React , { useState, useEffect }from "react";
import { useParams } from 'react-router-dom'
import Api from "../api";

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
        <>
            <h1>Movimentacao</h1>
            <table>
                <tr>
                    <th>Id</th>
                    <th>Tipo</th>
                    <th>Data e Hora de Início</th>
                    <th>Data e Hora de Fim</th>
                </tr>
            {dados && dados.map((dado) => (
                <tr>
                    <td>{dado.id}</td>
                    <td>{dado.tipo}</td>
                    <td>{dado.data_inicio}</td>
                    <td>{dado.data_fim}</td>
                    
                </tr>
            ))}
            </table>
        </>
    )

}