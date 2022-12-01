import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Match from "./Match"
import useAxios from "../Hooks/UseAxios";

function Modal (props) {
    const [showModal, setShowModal] = useState(false);      // 모달창 노출 여부
    const [teamModal, setTeamModal] = useState([]);         //모달에 들어갈 정보 API 저장
    //const [loading, setLoading] = useState(false);          //다른 팀을 눌렀을때 이전에 보였던 모달안의 팀이 보이지 않게 하기 위한 state

    const outLineRef = useRef(null); //DOM을 사용하기 위해 ref객체 생성
    
    const [count, setCount] = useState(0); // 세션 스토리지에 key를 다르게 저장하기 위해 만든 state

    const [axiosData, isloading] = useAxios(`/teams/${props.id}`, props.id, "Squad", count);
    
    /* X버튼 또는 Close버튼 클릭시 모달창 닫아줌과 동시에 로딩 false set */
    const closeModal = () => {
        setShowModal(false);
        //setLoading(false);
    };
    
    useEffect(() => {
        /* 렌더링됨과 동시에 state에 props로 받아온 show(true) set */
        setShowModal(props.show); // 모달컴포넌트 렌더링됨과 동시에 모달 노출여부 true set
        
        /* 재렌더링시 count 값 1 증가 */
        setCount(count + 1); 
        
        if(axiosData.length !== 0) setTeamModal(axiosData.data);
        // if(isloading == true) setLoading(true);
        
        const clickOutSide = (event) => {
            // 현재 document에서 mousedown 이벤트가 동작하면 호출되는 함수.
            if(outLineRef.current && !outLineRef.current.contains(event.target)){
                console.log("모달 외부 클릭 감지");
                closeModal();
            }
        }
        // 클릭이벤트가 동작하면, clickOutSide 함수가 실행되도록 리스너 추가
        document.addEventListener("click", clickOutSide);
        
        return () => {
            document.removeEventListener("click", clickOutSide);
        }
    },[props.id, outLineRef, axiosData]);

    return (
            <>
                {showModal ? // showModal이 true이면 모달을 보여주고 false일땐 모달을 노출시키지 않음.
                    isloading ? // loading이 ture이면 모달을 내 API정보들을 보여주고, false일땐 API를 가져와 true가 될 때까지 loading 텍스트를 보여줌
                    <TeamModal ref={outLineRef}>
                        <ModalHeader>
                            <img src={teamModal.crest} width="40px"/>
                            &nbsp;{teamModal.name}
                            <HeaderButton onClick={() => closeModal()} >
                                x
                            </HeaderButton>
                        </ModalHeader>
                        <ModalBody>
                            <SquadTable>
                            {Object.keys(teamModal).length !== 0 && (
                                <table class="tg">
                                    <caption className="cap">스쿼드</caption>
                                    <thead>
                                    <tr>
                                        <th class="tg-c3ow">List</th>
                                        <th class="tg-c3ow">Name</th>
                                        <th class="tg-c3ow">Position</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {teamModal.squad.map((e) => (
                                        <tr class="tr-list">
                                            <td class="tg-0lax">{teamModal.squad.indexOf(e)+1}</td>
                                            <td class="tg-0lax">{e.name}</td>
                                            <td class="tg-0lax">{e.position}</td>
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                            </SquadTable>
                            <Match
                                id={props.id}
                                count={count}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <FooterButton onClick={() => closeModal()}>
                                Close
                            </FooterButton>
                        </ModalFooter>
                    </TeamModal>
                    : 
                    <TeamModal ref={outLineRef}>
                    <ModalHeader>
                        Loading...
                        <HeaderButton onClick={() => closeModal()} >
                            x
                        </HeaderButton>
                    </ModalHeader>
                </TeamModal>
                    : false
                }
            </>
    );
}
export default Modal;

const TeamModal = styled.div`
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-gap: 10px;
    width: 75%;
    height: 75%;
    position: absolute;
    top: 50%;
    left: 50%;
    background-color: white;
    border: 2px solid gray;
    border-radius: 7px;
    transform: translate(-50%, -50%);
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`
const ModalHeader = styled.div`
    grid-column-start: 1;
    grid-column-end: 4;
    width: 100%;
    height: 70px;
    border-bottom: solid 1px gray;
    text-align: left;
    padding-left: 30px;
    font-size: 25px;
    position: sticky;
    top: 0px;
    background-color: white;
    padding-top: 15px;
`
const HeaderButton = styled.button`
    width: 30px;
    height: 40px;
    border-radius: 10px;
    border: white;
    font-size: 30px;
    background-color: white;
    margin-right: 4px;
    color: gray;
    float: right;
    margin-top: -5px;
`
const ModalBody = styled.div`
    grid-column-start: 1;
    grid-column-end: 4;
    display: flex;
    overflow: auto;
`
const SquadTable = styled.div`
    width: 25%;
    
    .cap {
        caption-side: top;
        text-align: center;
    }
    .tg {  
        margin-left: 10px;
        border-collapse: collapse;
        border-color: #ccc;
        border-spacing: 0;
        width: 100%;
    }
        
    .tg td {
        background-color: #fff;
        border-color: #ccc;
        border-style: solid;
        border-width: 0px;
        color: #333;
        font-family: Arial, sans-serif;
        font-size: 14px;
        overflow: hidden;
        padding: 10px 5px;
        word-break: normal;
    }

    .tg th {
        background-color: #f0f0f0;
        border-color: #ccc;
        border-style: solid;
        border-width: 0px;
        color: #333;
        font-family: Arial, sans-serif;
        font-size: 14px;
        font-weight: normal;
        overflow: hidden;
        padding: 10px 5px;
        word-break: normal;
    }

    .tg .tr-list {
        text-align: center;
        vertical-align: top
    }

    .tg .tg-c3ow {
        border-color: inherit;
        text-align: center;
        vertical-align: top
    }
    .tg .tg-0lax {
        text-align: center;
        vertical-align: top;
        border-bottom: 1px solid gray;
    }
`
const ModalFooter = styled.div`
    grid-column-start: 1;
    grid-column-end: 4;
    height: 60px;
    border-top: 1px solid gray;
    position: sticky;
    
    background-color: white;
`
const FooterButton = styled.button`
    width: 60px;
    height: 40px;
    border-radius: 10px;
    border: white;
    font-size: 15px;
    margin-top: 10px;
    background-color: #2E64FE;
    margin-right: 4px;
    color: white;
    float: right;
`


