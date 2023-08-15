import Container from "@/components/container"
import { useEffect, useState } from "react"
import { getTraining } from "@/services/TrainingApi"
import styled from "styled-components"
import { useRouter } from "next/router"
import { Loading } from "@/components/loading"

export default function Home() {

    const [token, setToken] = useState()
    const [trainings, setTrainings] = useState()
    const [groups, setGroups] = useState()
    const router = useRouter()

    useEffect(() => {
        setToken(JSON.parse(window.localStorage.getItem("token")))
        getTraining(JSON.parse(window.localStorage.getItem("token")))
            .then((ans) => {
                setTrainings(ans.training)
                setGroups(ans.groups)
            })
            .catch(ans => {
                (ans.response.data === "jwt expired") && router.push("/")
                console.log(ans)
            })
    }, [])

    return (
        <Container>

            {trainings ?
                trainings.map(trn => (
                    <TrainingBox>
                        <span>Divisão: {trn.divisao.name}</span>
                        {groups.map((grp) => (
                            (grp.treinoId === trn.id) &&
                            <div>
                                <h3>Teino {grp.day}</h3>
                                <span>{grp.exercicio_grupo_exercicio1Toexercicio.name}</span>
                                <span>{grp.exercicio_grupo_exercicio2Toexercicio.name}</span>
                                <span>{grp.exercicio_grupo_exercicio3Toexercicio.name}</span>
                                <span>{grp.exercicio_grupo_exercicio4Toexercicio.name}</span>
                                <span>{grp.exercicio_grupo_exercicio5Toexercicio?.name}</span>
                                <span>{grp.exercicio_grupo_exercicio6Toexercicio?.name}</span>
                                <span>{grp.exercicio_grupo_exercicio7Toexercicio?.name}</span>
                            </div>
                        ))}
                    </TrainingBox>
                ))
                : <Loading />
            }

        </Container>
    )
}

const TrainingBox = styled.div`
    font-family: 'Righteous', serif;
    display: flex;
    justify-content:space-around;
    align-items: center;
    margin-top: 10px;
    width: 97%;
    min-height: 200px;
    max-height: 300px;
    background-color: lightgray;
    fill-opacity: initial;
    border-radius: 10px;
    z-index: 2;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
    div{
        height: 90%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        span{
            display: flex;
            font-size: 12px;
        }
        h3{
            display: flex;
            align-items: flex-start;
            text-align: left;
        }
    }
`