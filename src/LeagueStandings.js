import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import axios from 'axios';
import {Link} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import TeamModal from './components/TeamModal';

function LeagueStandings(leaguename) {
    const [leagueStandings, setLeagueStandings] = useState([]); //변경된 leaguename에 맞게 각 리그 순위 저장
    const [teamId, setTeamId] = useState(0);
    const [modalShow, setModalShow] = useState(false); //팀정보를 모달에 보여주기 위한 state

    const getLeagueStandingsAPI = async () => { // 팀 순위를 알 수 있는 API 가져옴
        try {
          const leagueStandings = await axios ({
            method: 'get',
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "X-Auth-Token": leaguename.APIKEY,
            },
            url: `/v4/competitions/${leaguename.leaguename}/standings`, //각 리그에 포함된 팀들 순위를 알 수 있는 API 주소
            
          })
          console.log(leagueStandings.data);
          setLeagueStandings(leagueStandings.data.standings[0].table);
        }
        catch(err){
          alert(err);
        }
      };

    useEffect(() => {
      getLeagueStandingsAPI();
    }, [leaguename.leaguename]);

      return (
        <LgStandings>
        {Object.keys(leagueStandings).length !== 0 && (
            <table class="tl" width="100%">
                <caption>팀 순위</caption>
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
                    {e.position}
                    <td class="tl-0lax"
                        variant="primary"
                        onClick={() => {
                          setTeamId(e.team.id);
                          setModalShow(true);
                        }}
                        
                        // onClick={() => setModalShow(true)}
                        >
                    <img src={e.team.crest} width="25px"></img>
                    &nbsp;{e.team.name}
                      {/* <Link to={`/${e.team.id}`}>&nbsp;{e.team.name}</Link> */}
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
    vertical-align: top
  }

  .tl .tl-c3ow{
    border-color: inherit;
    text-align: left;
    vertical-align: top
  }
  .tl .tl-0lax{
    text-align: left;
    vertical-align: top
  }
`