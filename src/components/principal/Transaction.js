import { ContainerTransaction } from '../../styles/transactionsStyles.js';
import { AiOutlineClose } from 'react-icons/ai';
import UserContext from '../../contexts/UserContext.js';
import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { validateUser } from '../../validations/nameAndTokenValidation.js';
import Swal from 'sweetalert2';
import { deleteTransaction } from '../../services/api.services.js';
import EditTransactionContext from '../../contexts/EditTransactionContext.js';

export default function Transaction({transaction}){ 
  
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const { token } = validateUser(user);

  const { setTransaction } = useContext(EditTransactionContext);
    

  if(token === null && user === undefined) {
    Swal.fire({
        html: `<h1 style = 'color: #fff'>Sessão expirada! Faça login novamente!</h1>`,
        width: '95%',
        background: '#8C11BE',
        confirmButtonColor: '#A328D6',
    });
    navigate('/');
  }
  
  const strDate = transaction.date.slice(0, -14);
  const date = strDate.split('-');

  const value = Number(transaction.value);

  let color = {};

  if(transaction.type === 'OUTCOME'){
    color = {color: '#C70000'};
  }else{
    color = {color: '#03AC00'};
  }
  
  function removeTransaction () {
    Swal.fire({
        html: `<h1 style = 'color: #fff'>Tem certeza de que deseja excluir esta transação?</h1>`,
        showDenyButton: true,
        width: '95%',
        background: '#8C11BE',
        confirmButtonColor: '#A328D6',
        confirmButtonText: 'Excluir',
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          const config = { headers: { "Authorization": `Bearer ${user?user.token:token}` } }
          deleteTransaction(transaction._id, config)
            .then(() => window.location.reload())
            .catch((err) => {
                if (err.response.status === 401) {
                    Swal.fire({
                    html: `<h1 style = 'color: #fff'>Sessão expirada! Faça login novamente!</h1>`,
                    width: '95%',
                    background: '#8C11BE',
                    confirmButtonColor: '#A328D6',
                });
                navigate('/');
               } else if (err.response.status === 500){ 
                Swal.fire({
                  html: `<h1 style = 'color: #fff'>Alguma erro não identificado ocorreu! Aguarde uns instantes e faça o login novamente!</h1>`,
                  width: '95%',
                  background: '#8C11BE',
                  confirmButtonColor: '#A328D6',
                });
              }})
            }
    })
  }

  function updateTransaction () {
    setTransaction(transaction);
    if (transaction.type === 'INCOME') {
      navigate('/edit-income');
    } else if (transaction.type === 'OUTCOME') {
      navigate('/edit-outcome');
    }
  }
  return(
    <ContainerTransaction>
      <h3>{`${date[2]}/${date[1]}`}</h3>
      <h4 onClick={updateTransaction}>{transaction.description}</h4>
      <h5 style={color}>{value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h5>
      <div>
        <AiOutlineClose color='#C6C6C6' onClick = {removeTransaction}></AiOutlineClose>
      </div>
    </ContainerTransaction>
  );
}