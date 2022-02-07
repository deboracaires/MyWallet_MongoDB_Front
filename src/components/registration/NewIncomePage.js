import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import UserContext from "../../contexts/UserContext.js";
import { postTransaction } from "../../services/api.services.js";
import { ContainerRegister, HeaderRegister, Input, Button } from '../../styles/registersStyles.js';
import { validateUser } from "../../validations/nameAndTokenValidation.js";

export default function NewIncomePage(){
    
    const [value, setValue] = useState("");
    const [description, setDescription] = useState("");

    const { user } = useContext(UserContext);

    const navigate = useNavigate();

    const { token } = validateUser(user);
    

    if(token === null && user === undefined) {
        Swal.fire({
            html: `<h1 style = 'color: #fff'>Sessão expirada! Faça login novamente!</h1>`,
            width: '95%',
            background: '#8C11BE',
            confirmButtonColor: '#A328D6',
        });
        navigate('/');
    }

    

    function saveTransaction(e){
        e.preventDefault();
        
        const type = 'INCOME';

        
        const config = { headers: { "Authorization": `Bearer ${user?user.token:token}` } }

        const body = { 
            value: Number(value),
            description,
            type
        };
        console.log(body)

        postTransaction(body, config)
            .then(() => {
                navigate('/principal')
            })
            .catch((err) => {
                if (err.response.status === 401){ 
                    Swal.fire({
                      html: `<h1 style = 'color: #fff'>Sessão expirada! Faça o login novamente!</h1>`,
                      width: '95%',
                      background: '#8C11BE',
                      confirmButtonColor: '#A328D6',
                    });
                    navigate('/')
                  } else if (err.response.status === 422){ 
                    Swal.fire({
                      html: `<h1 style = 'color: #fff'>A descrição deve conter no mínimo 6 caracteres!</h1>`,
                      width: '95%',
                      background: '#8C11BE',
                      confirmButtonColor: '#A328D6',
                    });
                 } else if (err.response.status === 500){ 
                    Swal.fire({
                      html: `<h1 style = 'color: #fff'>Alguma erro não identificado ocorreu! Aguarde uns instantes e faça o login novamente!</h1>`,
                      width: '95%',
                      background: '#8C11BE',
                      confirmButtonColor: '#A328D6',
                    });
                 }
            });
    }
    
    return(
        <ContainerRegister>
            <HeaderRegister> 
                <h1>Nova entrada</h1>
            </HeaderRegister>
            <form onSubmit={saveTransaction}>
                <Input placeholder="Valor" type="number" min={0.00} step = {0.01}value={value} onChange={e => setValue(e.target.value)} ></Input>
                <Input placeholder="Descrição" value={description} onChange={e => setDescription(e.target.value)}></Input>
                <Button type="submit"> Salvar entrada</Button>
            </form>
        </ContainerRegister>
    );
}