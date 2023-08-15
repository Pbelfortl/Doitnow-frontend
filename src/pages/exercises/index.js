import Container from "@/components/container";
import { getExercises } from "@/services/TrainingApi";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { DivisionBox } from "../newTraining";
import { Loading } from "@/components/loading";


export default function exercises() {

    const [token, setToken] = useState()
    const [muscles, setMuscles] = useState([])
    const [exercises, setExecises] = useState([])
    const [filter, setFilter] = useState()
    const router = useRouter()

    useEffect(() => {
        setToken(JSON.parse(window.localStorage.getItem("token")))
        getExercises(JSON.parse(window.localStorage.getItem("token")))
            .then(ans => {
                setMuscles(ans.musculatura)
                setExecises(ans.exercises)
                console.log(ans)
            })
            .catch(ans => {
                alert(ans.response.data)
                router.push("/")
            })
    }, [])

    return (
        <Container>

            {muscles.length <= 1 ? <Loading/> :
            <>
            <DivisionBox>
                <div>
                  <select onClick={(e) => setFilter(e.target.value)}>
                    <option />
                    {muscles && muscles.map((muscle) => (
                        <option key={muscle.id} value={muscle.id}>{muscle.name}</option>
                    ))}
                </select>  
                </div>
            </DivisionBox>
            <ExercisesBox>
                {
                    filter ?
                        exercises.map((exercise) => (
                            exercise.musculaturaId == filter &&
                            <div key={exercise.id}>
                                <p>{exercise.name}</p>
                                <img src={exercise.musculatura.image} />
                                <iframe width="300" height="180" src={exercise.video} />
                            </div>
                        ))
                        :
                        exercises && exercises.map((exercise) => (
                            <div key={exercise.id}>
                                <p>{exercise.name}</p>
                                <img src={exercise.musculatura.image} />
                                <iframe width="300" height="180" src={exercise.video} />
                            </div>
                        ))
                }
            </ExercisesBox>
            </>}
            
        </Container>
    )
}

const ExercisesBox = styled.div`
    width: 100%;
    height: 850px;
    overflow-y: scroll;
    display: flex;
    align-items: center;
    flex-direction: column;
    border-radius: 10px;
    div{
        display: flex;
        width:  850px;
        margin-top: 15px;
        max-height: 250px;
        align-items: center;
        justify-content: space-around;
        border: solid lightgray 1px;
        box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
        background-color: lightgray;
        border-radius: inherit;
        img{
            height: 180px;
            width: 250px;
            border-radius: 5px;
        }
        inframe{
            border-radius: 10px;
        }
    }
    p{
        width: 150px;
    }
`