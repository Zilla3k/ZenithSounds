import { SyntheticEvent, useContext, useState } from "react";

// Icons
import {FaEyeSlash, FaEye} from 'react-icons/fa'
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const {login, logged} = useContext(AuthContext);

  const handleSubmit = async (e:SyntheticEvent) => {
    e.preventDefault();
    if (email.trim() === '' || password.trim() === '') {
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }
    await login(email, password)
  };

  if(logged){
    return <Navigate to="/home"/>
  } else {
    return(
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-c_yellow50 p-10 rounded-md max-w-sm w-full">
          <div className="text-3xl font-extrabold text-start text-c_blue300">
            Login
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-c_blue300"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent mt-1 p-2 w-full border border-c_blue300 rounded-md focus:outline-none focus:ring-2 focus:ring-c_blue700/20"
              />
            </div>
            <div className="relative">
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-c_blue300"
              >
                Senha
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent mt-1 p-2 w-full border border-c_blue300 rounded-md focus:outline-none focus:ring-2 focus:ring-c_blue700/20"
              />
              <div 
              className="absolute inset-y-8 right-8 p-1">
                <span 
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer absolute  rigth--10"
                >
                  {showPassword ? <FaEye size='20' /> : <FaEyeSlash size='20'/>}
                </span>
              </div>
            </div>
            <p className="text-sm text-c_red700/80">{errorMessage}</p>
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md text-c_yellow50 bg-c_red700 hover:bg-c_redHover700 focus:outline-none"
              >
                Entrar
              </button>
              <p className="text-sm mt-2 text-center text-c_blue300">Ainda não possui cadastro? Cadastre-se <span className="text-c_red700">
                <Link
                  to="/signup">
                  agora 
                </Link>
              </span></p>
            </div>
          </form>
        </div>
      </div>
    )
  }
}