import { useState } from "react";
import { postSignIn } from "../../services/api.services";
import { Conteiner, SignInTitle, Input, Button, SignUpText } from "../../styles/SignInAndSignUpStyles";

export default function SignInPage () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  function doSignIn(e) {
    e.preventDefault();
    const body = { email, password};
    
    postSignIn(body)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }

  return (
    <Conteiner>
      <SignInTitle>MyWallet</SignInTitle>
      <form onSubmit={doSignIn}>
        <Input placeholder="E-mail" type="email" value={email} onChange={e => setEmail(e.target.value)}></Input>
        <Input placeholder="Senha" type="password"value={password} onChange={e => setPassword(e.target.value)}></Input>
        <Button type="submit">Entrar</Button>
      </form>
      <SignUpText>Primeira vez? Cadastre-se!</SignUpText>
    </Conteiner>
  );
}
