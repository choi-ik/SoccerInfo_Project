// import { useEffect, useState } from "react";
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import axios from "axios";
// import styled from "styled-components";
// import Match from "./Match"

// function TeamModal (props) {
//     const [teamInfo, setTeamInfo] = useState([]); // LeagueStandings.js 에서 Props로 받아온 데이터를 Url에 넣고 받아온 팀 선수구성 API 데이터 저장
//     const [teamName, setTeamName] = useState(""); // 모달 상단에 팀이름 state
//     const [teamImg, setTeamImg] = useState("");   // 모달 상단에 팀 엠블럼 state
//     const footballAPIKEY = "ce521915bf894d9c9877901ca93d0d47";

//         const getTeaminfoAPI = async() => {
//             try {
//                 const Teaminfo = await axios ({
//                     method: 'get',
//                     headers: {
                      

//                       "Accept": "application/json",
//                       "Content-Type": "application/json",
//                       "X-Auth-Token": footballAPIKEY,
//                     },
//                     url: `https://soccerinfo-project-test.herokuapp.com/https://api.football-data.org/v4/teams/${props.id}`, //팀 선수 구성 API
                    
//                   })
    
//                   console.log(Teaminfo.data.squad,"모달 팀 구성정보 API");
//                   setTeamInfo(Teaminfo.data.squad); //팀 선수구성
//                   setTeamName(Teaminfo.data.name);  //모달 상단 팀이름
//                   setTeamImg(Teaminfo.data.crest);  //모달 상단 팀 엠블럼
//             }catch(e) {
//                 alert(e+"\n"+"1분 뒤 다시 시도해 주십시오.");
//             }
//         }

//     useEffect(() => {
//         if(props.id !== 0) getTeaminfoAPI(); //Default로 LeagueStandings.js 에서 팀 id를 0 으로 보내주는데 0이 아닐때 API가져와서 보여줌
//     }, [props.id])

//     return (
//         <Modal
//           {...props}
//           size="xl"
//           aria-labelledby="contained-modal-title-vcenter"
//           centered
//           fullscreen ="lg-down"
//           scrollable="true"
//         >
//           <Modal.Header closeButton>
//             <Modal.Title id="contained-modal-title-vcenter">
//             <img src={teamImg} width="40"></img>
//               &nbsp;{teamName}
//             </Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
            
//             <TmModal>
//                 <TeamList className="box1">
//                     {Object.keys(teamInfo).length !== 0 && (
//                         <table class="tg">
//                             <caption className="cap">스쿼드</caption>
//                             <thead>
//                             <tr>
//                                 <th class="tg-c3ow">List</th>
//                                 <th class="tg-c3ow">Name</th>
//                                 <th class="tg-c3ow">Position</th>
//                             </tr>
//                             </thead>
//                             <tbody>
//                             {teamInfo.map((e) => (
//                             <tr class="tr-list">
//                                 <td class="tg-0lax">{teamInfo.indexOf(e)+1}</td>
//                                 <td class="tg-0lax">{e.name}</td>
//                                 <td class="tg-0lax">{e.position}</td>
//                             </tr>
//                             ))}
//                             </tbody>
//                         </table>
//                     )}
//                 </TeamList>
//                 <Match 
//                     className="box2"
//                     id={props.id}
//                 >
//                 </Match>
//             </TmModal>
       
//           </Modal.Body>
//           <Modal.Footer>
//             <Button onClick={props.onHide}>Close</Button>
//           </Modal.Footer>
//         </Modal>
//       );
// }

// export default TeamModal;

// const TmModal = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 3fr;
//   grid-gap: 40px;

//   .box1{
//     grid-columns: 1/3;
//     grid-row: 1;
//   }
  
//   .box2{
//     grid-columns: 2/3;
//     grid-row: 1;
//   }

// `

// const TeamList = styled.div`
// .cap{
//   caption-side: top;
//   text-align: center;
// }
// .tg{  
//     border-collapse: collapse;
//     border-color: #ccc;
//     border-spacing: 0;
//   }
  
//   .tg td{
//     background-color: #fff;
//     border-color: #ccc;
//     border-style: solid;
//     border-width: 0px;
//     color: #333;
//     font-family: Arial, sans-serif;
//     font-size: 14px;
//     overflow: hidden;
//     padding: 10px 5px;
//     word-break: normal;
//   }

//   .tg th{
//     background-color: #f0f0f0;
//     border-color: #ccc;
//     border-style: solid;
//     border-width: 0px;
//     color: #333;
//     font-family: Arial, sans-serif;
//     font-size: 14px;
//     font-weight: normal;
//     overflow: hidden;
//     padding: 10px 5px;
//     word-break: normal;
//   }

//   .tg .tr-list{
//     text-align: center;
//     vertical-align: top
//   }

//   .tg .tg-c3ow{
//     border-color: inherit;
//     text-align: center;
//     vertical-align: top
//   }
//   .tg .tg-0lax{
//     text-align: center;
//     vertical-align: top;
//     border-bottom: 1px solid gray;
//   }
// `