import styled from "styled-components"
import { useRouter } from "next/router"

export default function TopBar () {
    
    const router = useRouter()

    function logout () {
        window.localStorage.removeItem("token")
        router.push("/")
    }

    return (
        <Bar>
            <div onClick={() => router.push("/home")}>Meus Treinos</div>
            <div onClick={() => router.push("/newTraining")}>Novo Treino</div>
            <div onClick={() => router.push("/exercises")}>Exercícios</div>
            <ion-icon name="log-out" onClick={()=>logout()}></ion-icon>
        </Bar>
    )
}

const Bar = styled.div`
    font-family: 'Righteous';
    display: flex;
    width: 100%;
    height: 50px;
    justify-content: space-evenly;
    align-items: center;
    border-radius: inherit;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom: solid lightblue;
    background: rgba(25, 23, 24, 0.7);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(50px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    ion-icon{
        height: 40px;
        width: 40px;
        color: white;
        :hover{
            cursor: pointer;
            color: white;
        }
        svg{
            color: white;
        }
    }
    div{
        height: 45px;
        width: 295px;
        background-color: lightgray;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: solid lightgray;
        :hover{
            cursor: pointer;
        }
        border-radius: inherit;
    }
`