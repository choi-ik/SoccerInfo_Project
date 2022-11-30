import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Modal from './components/Modal';
import useAxios from "./Hooks/UseAxios";

function LeagueStandings(leaguename) {
    const [leagueStandings, setLeagueStandings] = useState([]); // Props로 받아온 leaguename(리그 코드), season(시즌)을 url에 넣어 받아온 API 데이터(팀 순위)를 저장
    const [teamId, setTeamId] = useState(0);                    // 모달에게 Props로 넘겨주기 위한 팀 id
    const [modalOpen, setModalOpen] = useState(false);          // 모달 노출 여부
    
    const [count, setCount] = useState(0); // 세션 스토리지에 key를 다르게 저장하기 위해 만든 state

    /* useAxios 커스텀 훅에 인자를 보내 API 데이터 받아오기 위한 변수 axiosData */
    const [axiosData] = useAxios(`/competitions/${leaguename.leaguename}/standings?season=${leaguename.season}`, leaguename.leaguename, "LeagueRanking", count);
      
    /* leangname, season이 바뀔때마다 api새로 받아와서 렌더링 */
    useEffect(() => {
      setCount(count + 1); //렌더링이 새롭게 될 떄마다 count 1씩 증가
      if(axiosData.length !== 0) setLeagueStandings(axiosData.data.standings[0].table);
      
    }, [leaguename.leaguename, leaguename.season, axiosData]);

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