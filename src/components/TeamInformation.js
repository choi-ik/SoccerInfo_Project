// import { useEffect, useState } from "react";
// import axios from "axios";
// import styled from "styled-components";
// import { useParams } from "react-router-dom";

// function TeamInformation() {
//     const {id} = useParams();
//     const [teaminfo, setTeamInfo] = useState([]);
//     console.log("팀정보",id);
    
//     const footballAPIKEY = "ce521915bf894d9c9877901ca93d0d47";

//     const getTeaminfoAPI = async() => {
//         try {
//             const Teaminfo = await axios ({
//                 method: 'get',
//                 headers: {
//                   "Accept": "application/json",
//                   "Content-Type": "application/json",
//                   "X-Auth-Token": footballAPIKEY,
//                 },
//                 url: `v4/teams/${id}`, //득점순위를 알 수 있는 API 주소
                
//               })

//               console.log(Teaminfo.data.squad,"없앤다");
//               setTeamInfo(Teaminfo.data.squad);
//         }catch(e) {
//             alert(e);
//         }
//     }
//     useEffect(() => {
//         getTeaminfoAPI();
//     }, []);
            
//     return (
//         <TeamList>
//         {Object.keys(teaminfo).length !== 0 && (
//             <table class="tg">
//                 <caption>팀 정보</caption>
//                 <thead>
//                 <tr>
//                     <th class="tg-c3ow">List</th>
//                     <th class="tg-c3ow">Name</th>
//                     <th class="tg-c3ow">Position</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 {teaminfo.map((e) => (
//                 <tr class="tr-list">
//                     {teaminfo.indexOf(e)+1}
//                     <td class="tg-0lax">{e.name}</td>
//                     <td class="tg-0lax">{e.position}</td>
//                 </tr>
//                 ))}
//                 </tbody>
//             </table>
//         )}
//         </TeamList>
//     );
// }

// export default TeamInformation;

// const TeamList = styled.div`
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
//     text-align: left;
//     vertical-align: top
//   }

//   .tg .tg-c3ow{
//     border-color: inherit;
//     text-align: left;
//     vertical-align: top
//   }
//   .tg .tg-0lax{
//     text-align: left;
//     vertical-align: top
//   }
// `
