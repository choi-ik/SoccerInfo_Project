import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import axios from 'axios';
import {Link} from "react-router-dom";
import TeamModal from './components/TeamModal';


function LeagueStandings(leaguename) {
    const [leagueStandings, setLeagueStandings] = useState([]); //변경된 leaguename에 맞게 각 리그 순위 저장
    const [teamId, setTeamId] = useState(0);                    //모달에게 넘겨주기 위한 팀 id
    const [modalShow, setModalShow] = useState(false);          //팀정보를 모달에 보여주기 위한 state

    /* 팀 순위를 알 수 있는 API 가져옴 */
    const getLeagueStandingsAPI = async () => {
        try {
          const leagueStandings = await axios ({
            method: 'get',
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET",
              'Access-Control-Allow-Headers': '*',
              "Access-Control-Allow-Credentials":  "true",
              "Access-Control-Expose-Headers": "*",

              "Accept": "application/json",
              "Content-Type": "application/json",
              "X-Auth-Token": leaguename.APIKEY,
            },
            /* leaguename, season을 props로 받아와 get요청 */
            url: `/v4/competitions/${leaguename.leaguename}/standings?season=${leaguename.season}`, 
            
          })
          console.log(leagueStandings.data,"리그 내 팀 순위 API");
          setLeagueStandings(leagueStandings.data.standings[0].table);
        }
        catch(err){
          alert(err+"\n"+"1분 뒤 다시 시도해 주십시오.");
        }
      };
      
    /* leangname, season이 바뀔때마다 api새로 받아와서 렌더링 */
    useEffect(() => {
      getLeagueStandingsAPI();
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
                          setModalShow(true);
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
        <TeamModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          id={teamId}
        />
        
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