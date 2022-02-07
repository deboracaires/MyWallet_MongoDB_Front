import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import UserContext from '../../contexts/UserContext.js';
import { postSignIn } from '../../services/api.services.js';
import { Conteiner, SignInTitle, Input, Button, SignUpText } from '../../styles/SignInAndSignUpStyles.js';
import { signInValidate } from '../../validations/signInValidation.js';

export default function SignInPage () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();

  const { setUser } = useContext(UserContext);

  function doSignIn(e) {
    e.preventDefault();
    const body = { email, password};
    if (signInValidate(email, password)) {
      postSignIn(body)
      .then((res) => {
        setUser(res.data);
        const token = JSON.stringify(res.data.token);
        sessionStorage.setItem("token", token);
        const name = JSON.stringify(res.data.name);
        sessionStorage.setItem("name", name);
        navigate('/principal');
      })
      .catch((err) => {
        if (err.response.status === 401){ 
          Swal.fire({
            html: `<h1 style = 'color: #fff'>E-mail e/ou senha incorretos!</h1>`,
            width: '95%',
            background: '#8C11BE',
            confirmButtonColor: '#A328D6',
          });
        } else if (err.response.status === 422){ 
          Swal.fire({
            html: `<h1 style = 'color: #fff'>Algum dado está inválido, tente novamente!</h1>`,
            width: '95%',
            background: '#8C11BE',
            confirmButtonColor: '#A328D6',
          });
       }
      });
    }
  }

  return (
    <Conteiner>
      <SignInTitle>MyWallet</SignInTitle>
      <form onSubmit={doSignIn}>
        <Input placeholder="E-mail" type="email" value={email} onChange={e => setEmail(e.target.value)}></Input>
        <Input placeholder="Senha" type="password"value={password} onChange={e => setPassword(e.target.value)}></Input>
        <Button type="submit">Entrar</Button>
      </form>
      <SignUpText onClick = {() => navigate('/sign-up')}>Primeira vez? Cadastre-se!</SignUpText>
    </Conteiner>
  );
}
