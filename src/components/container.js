import styled from "styled-components"
import TopBar from "./topBar"
import Background from "../../public/background.jpg"


export default function Container ({children}) {


    return (
        <ConntainerBox>
            <TopBar/>
            {children}
        </ConntainerBox>
    )
}

const ConntainerBox = styled.div`
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    width: 1024px;
    height: 95vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    border: solid lightgray 1px;
    border-radius: 10px;
    background-color: white;
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(50px);
    -webkit-backdrop-filter: blur(50px);
    border: 1px solid rgba(255, 255, 255, 0.3)
`