import Container from "@/components/container"
import { useEffect, useState } from "react"
import { getExercises, postDivision, postGroups } from "@/services/TrainingApi"
import { useRouter } from "next/router"
import styled from "styled-components"
import { handleJwtError } from "@/errors/handleJwtError"
import useToken from "@/hooks/useToken"
import { Loading } from "@/components/loading"

export default function newTraining() {

    const [token, setToken] = useState()
    const [exercises, setExercises] = useState()
    const [divisoes, setDivisoes] = useState()
    const [divisao, setDivisao] = useState()
    const [groups, setGroups] = useState()
    let training
    const router = useRouter()


    useEffect(() => {
        setToken(JSON.parse(window.localStorage.getItem("token")))
        getExercises(JSON.parse(window.localStorage.getItem("token")))
            .then((ans) => {
                setExercises(ans.exercises)
                setDivisoes(ans.divisao)
            })
            .catch((ans) => {
                alert(ans.response.data)
                router.push("/")
            })
    }, [])

    function createGroups(divName) {

        const groupsArr = []
        console.log(divisoes[groupsArr.length])
        while (groupsArr.length < divName.length) {
            (divisoes[groupsArr.length]?.name === divName) && setDivisao(divisoes[groupsArr.length])
            groupsArr.push(
                {
                    day: divName[groupsArr.length],
                    exercicio1: null,
                    exercicio2: null,
                    exercicio3: null,
                    exercicio4: null,
                    exercicio5: null,
                    exercicio6: null,
                    exercicio7: null,
                }
            )
        }
        setGroups(groupsArr)
    }

    async function postTraining(event) {
        event.preventDefault()
        console.log(divisao)
        try {
            await postGroups(token, divisao.id, groups)
            router.push("/home")

        } catch (error) {
            console.log(error)
        }
    }

    return (

        <Container>
            {!divisoes ? <Loading /> :
                <DivisionBox>
                    {divisoes &&
                        <div>
                            <div>
                                <span>Escolha a divisão do treino!</span>
                                <select onClick={(e) => { createGroups(e.target.value) }}>
                                    {divisoes.map((divs) => (
                                        <option key={divs.id} value={divs.name}>{divs.name}</option>
                                    ))}
                                </select>
                            </div>
                            <button type="submit" form="training">Cadastrar treino</button>
                        </div>
                    }
                </DivisionBox>}
            <GroupsBox>
                {divisao && <span>Escolha pelo menos 4 exercícios por grupo</span>}
                {groups &&
                    <div>
                        {groups.map((group) => (
                            <form onSubmit={event => postTraining(event)} id="training" key={group.id}>
                                <span>Treino {group.day}<br /></span>
                                <select required onClick={(e) => { group.exercicio1 = Number(e.target.value) }}>
                                    <option />
                                    {exercises.map((exercise) => (
                                        <option key={exercise.id} value={exercise.id}>{exercise.name}</option>
                                    ))}
                                </select>
                                <select required onClick={(e) => { group.exercicio2 = Number(e.target.value) }}>
                                    <option />
                                    {exercises.map((exercise) => (
                                        <option key={exercise.id} value={exercise.id}>{exercise.name}</option>
                                    ))}
                                </select>
                                <select required onClick={(e) => { group.exercicio3 = Number(e.target.value) }}>
                                    <option />
                                    {exercises.map((exercise) => (
                                        <option key={exercise.id} value={exercise.id}>{exercise.name}</option>
                                    ))}
                                </select>
                                <select required onClick={(e) => { group.exercicio4 = Number(e.target.value) }}>
                                    <option />
                                    {exercises.map((exercise) => (
                                        <option key={exercise.id} value={exercise.id}>{exercise.name}</option>
                                    ))}
                                </select>
                                <select onClick={(e) => { group.exercicio5 = Number(e.target.value) }}>
                                    <option />
                                    {exercises.map((exercise) => (
                                        <option key={exercise.id} value={exercise.id}>{exercise.name}</option>
                                    ))}
                                </select>
                                <select onClick={(e) => { group.exercicio6 = Number(e.target.value) }}>
                                    <option />
                                    {exercises.map((exercise) => (
                                        <option key={exercise.id} value={exercise.id}>{exercise.name}</option>
                                    ))}
                                </select>
                                <select onClick={(e) => { group.exercicio7 = Number(e.target.value) }}>
                                    <option />
                                    {exercises.map((exercise) => (
                                        <option key={exercise.id} value={exercise.id}>{exercise.name}</option>
                                    ))}
                                </select>
                            </form>
                        ))
                        }
                    </div>
                }
            </GroupsBox>
        </Container>

    )
}

export const DivisionBox = styled.div`
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: inherit;
    height: 70px;
    border-bottom: solid 2px darkgray;
    div{
        display: flex;
        padding-inline: 15px;
        justify-content: space-between;
        width:100%;
        div{
            width: 32%;
        }
    }
    select{
            margin: 3px;
            outline: none;
            border-radius: 3px;
    }
    button{
        border-radius: 5px;
        padding: 5px;
        border: none;
        opacity: 1;
        :hover{
            cursor: pointer;
            background-color: lightgray;
        }
    }
`

const GroupsBox = styled.div`
    padding-top: 20px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: solid lightgray 1px;
    opacity: inherit;
    border-radius: inherit;
    border: none;
    div{
        display: flex;
        flex-wrap: wrap;
    }
    select{
            margin: 3px;
            outline: none;
            border-radius: 3px;
    }
    form{
        
        margin: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: none;
    }
`