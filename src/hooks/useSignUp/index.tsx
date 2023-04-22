import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { api, getCep } from '../../services/axios';

export interface SignUpState {
  firstName: string;
  lastName: string;
  cpf: string;
  email: string;
  password: string;
  selectedDate: MaterialUiPickersDate | null;
  gender: string;
  cep: string;
  city: string;
  state: string;
  street: string;
  neighborhood: string;
  complement: string;
}

interface UseSignUpState {
  signUpState: SignUpState;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateChange: (date: MaterialUiPickersDate) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleCepChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function useSignUpState(): UseSignUpState {
  const [signUpState, setSignUpState] = useState<SignUpState>({
    firstName: '',
    lastName: '',
    cpf: '',
    email: '',
    password: '',
    selectedDate: null,
    gender: '',
    cep: '',
    city: '',
    state: '',
    street: '',
    neighborhood: '',
    complement: '',
  });
  const navigate = useNavigate();

  const handleCepChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;

    const cep = value.replace(/\D/g, '');

    try {
      const response = await getCep.get(`${cep}/json`);
      const { localidade, uf, logradouro, bairro, complemento } = response.data;

      setSignUpState((prevState) => ({
        ...prevState,
        city: localidade,
        state: uf,
        street: logradouro,
        neighborhood: bairro,
        complement: complemento,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const formattedCep = value.replace(/\D/g, '');

    switch (name) {
      case 'cep': {
        if (formattedCep.length === 8) {
          handleCepChange(event);
        }

        setSignUpState({ ...signUpState, [name]: formattedCep });
        break;
      }
      case 'cpf': {
        const formattedCpf = value.replace(/\D/g, '');

        setSignUpState({ ...signUpState, [name]: formattedCpf });
        break;
      }
      default: {
        setSignUpState({ ...signUpState, [name]: value });
      }
    }
  };

  const handleDateChange = (date: MaterialUiPickersDate) => {
    setSignUpState({ ...signUpState, selectedDate: date });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      nome: signUpState.firstName,
      sobrenome: signUpState.lastName,
      cpf: signUpState.cpf,
      sexo: signUpState.gender,
      dt_nascimento: signUpState.selectedDate,
      cep: signUpState.cep,
      cidade: signUpState.city,
      estado: signUpState.state,
      logradouro: signUpState.street,
      bairro: signUpState.neighborhood,
      complemento: signUpState.complement,
      email: signUpState.email,
      senha: signUpState.password,
    };

    if (data.cpf.length === 11) {
      api.post('user', data);
      navigate('/');
    }
  };

  return {
    signUpState,
    handleInputChange,
    handleDateChange,
    handleSubmit,
    handleCepChange,
  };
}
