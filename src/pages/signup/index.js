import styles from '@/styles/Home.module.css'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { signUp } from '@/services/authApi'
import { useRouter } from 'next/router'
import { LoginBox, Form } from '..'

export default function Signup() {

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [name, setName] = useState()
  const [altura, setAltura] = useState()
  const [idade, setIdade] = useState()
  const [peso, setPeso] = useState()
  const router = useRouter()
  
  async function handleForm (event) {
    event.preventDefault()
    const body = {
      name:name,
      email:email,
      password:password,
      altura:Number(altura),
      peso:Number(peso),
      idade:Number(idade)
    }

    try{
      const response = await signUp(body)
      localStorage.setItem("token",JSON.stringify(response.token))
      router.push("/")
    } catch (error) {
      alert(error?.response?.data)
    }
    
  }


  return (
    <>
      <LoginBox>
        <Form onSubmit={handleForm}>
          <input placeholder='Nome' onChange={e => setName(e.target.value)}/>
          <input placeholder='Idade' onChange={e => setIdade(e.target.value)}/>
          <input placeholder='Altura (cm)' onChange={e => setAltura(e.target.value)}/>
          <input placeholder='Peso (Kg)' onChange={e => setPeso(e.target.value)}/>
          <input placeholder='Email'onChange={e => setEmail(e.target.value)}/>
          <input type='password' placeholder='Password'onChange={e => setPassword(e.target.value)}/>
          <button type='submit'>Cadastrar</button>
        </Form>
        <button onClick={() => router.push("/")}>Voltar</button>
      </LoginBox>
    </>
  )
}

