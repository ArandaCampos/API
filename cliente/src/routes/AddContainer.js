import Api from "../api";
import React from "react";
import InputLabel from "../components/InputLabel";
import SelectText from "../components/SelectText";

export default class PostContainer extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            cliente: '',
            numero: '',
            tipo: 40,
            status: 'cheio',
            categoria: 'importação',
            movimentacao: '1',
            msg: ''
        }
        this.setValues = this.setValues.bind(this)
    }

    setValues(field){
        this.setState(field)
    }

    handleInput(e){
        this.setState({[e.target.name]: e.target.value})
    }

    sendForm(){
        const data = {
            cliente: this.state.cliente,
            numero: this.state.numero,
            tipo: this.state.tipo,
            status: this.state.status,
            categoria: this.state.categoria,
            movimentacao: this.state.movimentacao
        }
        if(!data['numero'].match("[A-Z]{4}[0-9]{7}")){
            this.setState({error: 'Número deve seguir o padrão: TEST1234567'})
        } else {
            Api.post('container', data)
            .then(res => this.useState({'msg': 'Criado com sucesso'}))
            .catch(err => this.useState({'msg': err}))
        }
    }

    render(){
        return(
            <>
                <InputLabel callback={this.setValues} name="cliente" label="Cliente" value='' />
                <InputLabel callback={this.setValues} name="numero" label="Numero" value='' />
                <SelectText fields={['40', '20']} callback={this.setValues} name="tipo" label="Tipo" value={this.state.tipo} />
                <SelectText fields={['cheio', 'vazio']} callback={this.setValues} name="status" label="Status" value={this.state.status} />
                <SelectText fields={['importação', 'exportação']} callback={this.setValues} name="categoria" label="Categoria" value={this.state.categoria} />
                <button onClick={() => this.sendForm()}/>
            </>
        )
    }
}