import styles from '@/styles/Home.module.css'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { signIn } from '@/services/authApi'
import { useRouter } from 'next/router'

export default function Home() {

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const router = useRouter()
  
  async function handleForm (event) {
    event.preventDefault()
    const body = {
      email:email,
      password:password
    }

    try{
      const response = await signIn(body)
      localStorage.setItem("token",JSON.stringify(response.token))
      router.push("/home")
    } catch (error) {
      alert(error?.response?.data)
    }
    
  }


  return (
    <>
      <LoginBox>
        <h1>DoItNow</h1>
        <Form onSubmit={handleForm}>
          <div>
            <input placeholder='Email'onChange={e => setEmail(e.target.value)}/>
            <input type='password' placeholder='Password'onChange={e => setPassword(e.target.value)}/>
          </div>
          <div>
            <button type='submit'>Entrar</button>
          </div>
        </Form>
        <button onClick={()=>(router.push("signup"))}>Cadastre-se</button>
      </LoginBox>
    </>
  )
}

export const LoginBox = styled.div`
  font-size: 28px;
  height: 500px;
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: solid lightgray 1px;
  background-color: grey;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  h1{
    font-family: 'Righteous', cursive;
  }
  button{
      font-size: 16px;
      width: 250px;
      height: 30px;
      border-radius: 5px;
      outline: none;
      border: none;
      margin-bottom: 10px;
      :hover{
        cursor: pointer;
        box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
      }
      :active{
        background-color: lightgray;
        box-shadow: none;
      }
    }
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  input{
    box-sizing: border-box;
    font-size: 16px;
    height: 30px;
    width: 250px;
    border-radius: 5px;
    outline: none;
    margin-bottom: 10px;
    padding-inline: 10px;
  }
  div{
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 20px;
    width: 100%;

  }
`