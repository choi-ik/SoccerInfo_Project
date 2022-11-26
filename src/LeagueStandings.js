import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import axios from 'axios';
import {Link} from "react-router-dom";
import TeamModal from './components/TeamModal';
import Modal from './components/Modal';
import Match from'./components/Match';


function LeagueStandings(leaguename) {
    const [leagueStandings, setLeagueStandings] = useState([]); // Props로 받아온 leaguename(리그 코드), season(시즌)을 url에 넣어 받아온 API 데이터(팀 순위)를 저장
    const [teamId, setTeamId] = useState(0);                    // 모달에게 Props로 넘겨주기 위한 팀 id
    const [modalOpen, setModalOpen] = useState(false);          // 모달 노출 여부
    
    let sessionStorage = window.sessionStorage; // 세션 스토리지 변수
    const [count, setCount] = useState(0); // 세션 스토리지에 key를 다르게 저장하기 위해 만든 state

    /* 팀 순위를 알 수 있는 API 가져옴 */
    const getLeagueStandingsAPI = async () => {
        try {
          const leagueStanding = await axios ({
            method: 'get',
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "X-Auth-Token": leaguename.APIKEY,
            },
            /* leaguename, season을 props로 받아와 get요청 */
            url: `https://soccerinfo-project-test.herokuapp.com/https://api.football-data.org/v4/competitions/${leaguename.leaguename}/standings?season=${leaguename.season}`
          })

          /*  props로 받아온 leaguename을 leaguename에, 받아온 API 데이터를 leagueRanking에 JSON으로 저장 */
          let sessionData = {
            data : { leagueCode: leaguename.leaguename, leagueRanking: leagueStanding.data.standings[0].table }
          };

          console.log(leagueStanding.data,"리그 내 팀 순위 API");
          setLeagueStandings(leagueStanding.data.standings[0].table);
    
          /* JSON 객체에 저장한 데이터 세션스토리지에 set 해주기 */
          sessionStorage.setItem(`Ranking${count}`, JSON.stringify(sessionData));
        }
        catch(err){
          alert(err+"\n"+"1분 뒤 다시 시도해 주십시오."); 
        }
      };
      
    /* leangname, season이 바뀔때마다 api새로 받아와서 렌더링 */
    useEffect(() => {
      let i = 0;
      
      /* 처음에 렌더링 하면 세션스토리지가 비어있기 때문에 세션스토리지의 길이가 0이상일때 if문 실행 */
      if(sessionStorage.length > 0){
        for(i; i<count; i++){
          /* 세션스토리지에서 key에 맞는 item이 있는지 확인  */
          if(JSON.parse(sessionStorage.getItem(`Ranking${i}`)) !== null){
            /* 위 조건이 만족하면 세션스토리지에 저장된 leagueCode 가 props로 받아온 leagueCode와 맞는지 조건 확인 */
            if(JSON.parse(sessionStorage.getItem(`Ranking${i}`)).data.leagueCode === leaguename.leaguename){
              /* 조건이 모두 맞다면 세션스토리지에 들어있는 leagueRanking을 state에 파싱해서 저장 */
              setLeagueStandings(JSON.parse(sessionStorage.getItem(`Ranking${i}`)).data.leagueRanking);
              break;
            }
        }
      }
      /* i가 count가 될때까지 세션스토리지에서 key를 못찾으면 API요청 함수 실행 */
      if(i === count) getLeagueStandingsAPI();
    }else{
      /* 첫 렌더링시 세션스토리지가 비어있으니 세션스토리지의 길이가 0 이하면 API 요청 함수 실행 */
      getLeagueStandingsAPI();
    }
      setCount(count + 1); //렌더링이 새롭게 될 떄마다 count 1씩 증가
    }, [leaguename.leaguename, leaguename.season]);

      return (
        <LgStandings>
        {Object.keys(leagueStandings).length !== 0 && (
            <table class="tl" width="100%">
                <caption className="cap">팀 순위</caption>
                <thead>
                <tr>
                    <th class="tl-c3ow">Rank</th>
                    <th class="tl-c3ow">Name</th>
                    <th class="tl-c3ow">Played</th>
                    <th class="tl-c3ow">Won</th>
                    <th class="tl-c3ow">Draw</th>
                    <th class="tl-c3ow">Lost</th>
                    <th class="tl-c3ow">Points</th>
                </tr>
                </thead>
                <tbody>
                {leagueStandings.map((e) => (
                <tr class="tl-list">
                    <td class="tl-0lax">{e.position}</td>
                    <td class="tl-0laz"
                        variant="primary"
                        onClick={() => {
                          setTeamId(e.team.id);
                          /* 팀순위에 있는 팀 이름 클릭시 modal 노출여부를 true로 set */
                          setModalOpen(true);
                        }}
                    >
                    <img src={e.team.crest} width="25px"></img>
                    &nbsp;{e.team.name}
                    </td>
                    <td class="tl-0lax">{e.playedGames}</td>
                    <td class="tl-0lax">{e.won}</td>
                    <td class="tl-0lax">{e.draw}</td>
                    <td class="tl-0lax">{e.lost}</td>
                    <td class="tl-0lax">{e.points}</td>
                </tr>
                ))}
                </tbody>
            </table>
        )}
        {/* Modal 컴포넌트로 대체
         <TeamModal
          id={teamId}
          show={modalShow}
          onHide={() => setModalShow(false)}
        /> */}
        { modalOpen ? 
        <Modal
          id={teamId}
          show={modalOpen}
          apiKey={leaguename.APIKEY} /> 
          : false }

        </LgStandings>
      );
}

LeagueStandings.propTypes = {
    leaguename: PropTypes.string.isRequired,
};

export default LeagueStandings;

const LgStandings = styled.div`
padding: 3%;
.cap{
  caption-side: top;
  text-align: center;
}

.tl{  
    border-collapse: collapse;
    border-color: #ccc;
    border-spacing: 0;
  }
  
  .tl td{
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

  .tl th{
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

  .tl .tl-list{
    text-align: left;
    vertical-align: top;
  }

  .tl .tl-c3ow{
    border-color: inherit;
    text-align: left;
    vertical-align: top
  }
  .tl .tl-0lax{
    text-align: left;
    vertical-align: top;
    border-bottom: 1px solid gray;
  }

  .tl .tl-0laz{
    text-align: left;
    vertical-align: top;
    cursor : pointer;
    border-bottom: 1px solid gray;
  }
`