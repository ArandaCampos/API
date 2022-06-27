import React , { useState, useEffect }from "react";
import { useParams } from 'react-router-dom'
import Api from "../api";

export default function Cont(){
    const [dados, setDados] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        async function getApi (){
            await Api.get('container')
            .then(res => setDados(res.data))
            .catch(erro => setError('Falha na conexão com o servidor'))
        }
        getApi()
    }, [])

    return(
        <>
            <h1>Container</h1>
            <table>
                <tr>
                    <th>Id</th>
                    <th>Cliente</th>
                    <th>Número</th>
                    <th>Tipo</th>
                    <th>Status</th>
                    <th>Categoria</th>
                </tr>
            {dados && dados.map((dado) => (
                <tr>
                    <td>{dado.id}</td>
                    <td>{dado.cliente}</td>
                    <td>{dado.numero}</td>
                    <td>{dado.tipo}</td>
                    <td>{dado.status}</td>
                    <td>{dado.categoria}</td>
                </tr>
            ))}
            </table>
        </>
    )

}