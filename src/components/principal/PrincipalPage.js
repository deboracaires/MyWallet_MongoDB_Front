import {IoExitOutline} from 'react-icons/io5';
import { FiMinusCircle, FiPlusCircle } from 'react-icons/fi';

import { ContainerPrincipalPage, Content, HeaderPrincipalPage, BottomPrincipalPage, NewRegister, Balance } from '../../styles/principalPageStyles.js';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../../contexts/UserContext.js';
import { getFinancialEvents } from '../../services/api.services';
import { useNavigate } from 'react-router';
import Transaction from './Transaction.js';
import Swal from 'sweetalert2';
import { validateUser } from '../../validations/nameAndTokenValidation.js';

export default function PrincipalPage() {
    
    const [transactions, setTransactions] = useState([]);
    const [total, setTotal] = useState(0);
    const [text, setText] = useState('Carregando...');

    const { user, setUser } = useContext(UserContext);

    const navigate = useNavigate();

    const { token, name} = validateUser(user);

    if(token === null && user === undefined) {
        Swal.fire({
            html: `<h1 style = 'color: #fff'>Sessão expirada! Faça login novamente!</h1>`,
            width: '95%',
            background: '#8C11BE',
            confirmButtonColor: '#A328D6',
        });
        navigate('/');
    }

    function cleanLocal(){
        sessionStorage.clear();
        setUser('');
        navigate('/');
    }
    useEffect(() => {
        const config = {
            headers: {
                'Authorization': `Bearer ${user?user.token:token}`
            }
        }
        getFinancialEvents(config)
            .then((res) => {
                setTransactions(res.data.transactions);
                setTotal(res.data.total);
                setText("Não há registros de entrada ou saída")
            })
            .catch(() => {
                Swal.fire({
                    html: `<h1 style = 'color: #fff'>Sessão expirada! Faça login novamente!</h1>`,
                    width: '95%',
                    background: '#8C11BE',
                    confirmButtonColor: '#A328D6',
                });
                navigate('/');
            });
    }, [user, token, navigate]);

    let color = {};

    if(total < 0){
        color = {color: '#C70000'};
    }else{
        color = {color: '#03AC00'};
    } 

    return (
        <ContainerPrincipalPage>
            <HeaderPrincipalPage>
                <h1>Olá, {name}</h1>
                <div>
                    <IoExitOutline color="#fff" size="35px" onClick={() => cleanLocal()}></IoExitOutline>
                </div>
            </HeaderPrincipalPage>
            <Content>
                {
                    transactions.length === 0 ?
                    (
                        <h1>{text}</h1>
                    )
                    :
                    (
                        transactions.map((transaction, index) => <Transaction key={index} transaction={transaction}/>)
                    )
                }
            </Content>
            <Balance>
                    <p>SALDO</p>
                    <h2 style={color}>{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h2>
                </Balance>
            <BottomPrincipalPage>
                <NewRegister onClick = {() => navigate('/new-income')}>
                    <FiPlusCircle color="#fff" size="22px" ></FiPlusCircle>
                    <p>Nova entrada</p>
                </NewRegister>
                <NewRegister  onClick = {() => navigate('/new-outcome')}>
                    <FiMinusCircle color="#fff" size="22px" ></FiMinusCircle>
                    <p>Nova saída</p>
                </NewRegister>
            </BottomPrincipalPage>
        </ContainerPrincipalPage>
    );
}