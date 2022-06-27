import React, { useState, useEffect} from "react";
import Api from "../api";

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
        <>
            <h1>Relatorio</h1>
            <table>
                <tr>
                    <th>Tipo</th>
                    <th>Clientes</th>
                </tr>
            {dados && dados.map((dado) => (
                <tr>
                    <td>{dado.tipo}</td>
                    <tr>
                        {dado.clientes.map( (cliente) => (
                        <td>{cliente.cliente}</td>
                        ))}
                    </tr>
                </tr>
            ))}
            </table>
            {exportacao && exportacao.map( (count) => (
                <>
                    <p>{count.tipo}</p>
                    <p>{count.quantia}</p>
                </>
            ))}
        </>
    )

}