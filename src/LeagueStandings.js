import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import axios from 'axios';

function LeagueStandings(leaguename) {
    const [leagueStandings, setLeagueStandings] = useState([]);

    const getLeagueStandingsAPI = async () => { // 팀 순위를 알 수 있는 API 가져옴
        try {
          const leagueStandings = await axios ({
            method: 'get',
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "X-Auth-Token": leaguename.APIKEY,
            },
            url: `/v4/competitions/${leaguename.leaguename}/standings`,
            
          })
          console.log(leagueStandings.data.standings[0].table);
          setLeagueStandings(leagueStandings.data.standings[0].table);
        }
        catch(err){
          alert(err);
        }
      };

      useEffect(() => {
        getLeagueStandingsAPI();
      }, [leaguename]);

      return (
        <LgStandings>
        {Object.keys(leagueStandings).length !== 0 && (
            <table class="tl">
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
                    <td class="tl-0lax">
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
        </LgStandings>
      );
}

LeagueStandings.propTypes = {
    leaguename: PropTypes.object.isRequired,
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