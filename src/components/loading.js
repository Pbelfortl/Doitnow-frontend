import Image from "next/image";
import styled from "styled-components";
import LoadingImg from "../../public/Pulse.gif"


export function Loading () {


    return (
        <LoadingBox>
            <Image src={LoadingImg} alt="Loading"/>
        </LoadingBox>
    )
}

const LoadingBox = styled.div`
    height: 100%;
    width: auto;
    display: flex;
    align-items: center;
    justify-content: center;
`