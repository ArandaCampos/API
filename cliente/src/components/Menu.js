import React from "react";
import styled from "styled-components";

export default class Menu extends React.Component{

    render(){
        return(
            <Div>
                <LogoDiv>
                    <Text>Containeres</Text>
                </LogoDiv>
                <MenuDiv>
                    <Link href="/"><h5>Relatório</h5></Link>
                    <Link href="/container"><h5>Container</h5></Link>
                    <Link href="/movimentacao"><h5>Movimentacao</h5></Link>
                </MenuDiv>
            </Div>

        )
    }
}
const Div = styled.div`
    width: 100%;
    height: 70px;
    background-color: #F27457;
    
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
`;

const Link = styled.a`
    text-decoration: none;
    color: white;
`;

const Text = styled.h3`
    text-decoration: none;
    color: white;
`;

const LogoDiv = styled.div`
`;

const MenuDiv = styled.div`

    display: flex;
    flex-direction: row;
    gap: 50px;
`;