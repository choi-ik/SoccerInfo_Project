import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import axios from 'axios';

function ScorerList(leaguename) {
    const [scorer, setScorer] = useState([]); // 받아온 API 데이터(득점 순위) 저장
    
    /* 득점순위 알 수 있는 api 받아옴 */
    const getScorerAPI = async() => { 
        try {
          const scorerName = await axios ({
            method: 'get',
            headers: {
              

              "Accept": "application/json",
              "Content-Type": "application/json",
              "X-Auth-Token": leaguename.APIKEY,
            },
            /* leaguename, season props로 받아와서 get 요청 */
            url: `https://soccerinfo-project-test.herokuapp.com/https://api.football-data.org/v4/competitions/${leaguename.leaguename}/scorers?season=${leaguename.season}`, //득점순위를 알 수 있는 API 주소
            
          })
          console.log(scorerName.data.scorers,"리그 내 득점 순위 API");
          setScorer(scorerName.data);
        }
        catch(err){
          alert(err+"\n"+"1분 뒤 다시 시도해 주십시오.");
        }
      };

      /* leaguename, season 바뀔때마다 새로 api요청 후 렌더링 */
      useEffect(() => {
        getScorerAPI();
      },[leaguename.leaguename, leaguename.season])

    return (
        <ScList>
        {Object.keys(scorer).length !== 0 && (
          <div>
            <table class="tg" width="100%">
                <caption className="cap">득점 순위</caption>
                <thead>
                <tr>
                    <th class="tg-c3ow">Rank</th>
                    <th class="tg-c3ow">Name</th>
                    <th class="tg-c3ow">Team</th>
                    <th class="tg-c3ow">Goals</th>
                    <th class="tg-c3ow">Assist</th>
                    <th class="tg-c3ow">Penalties</th>
                </tr>
                </thead>
                <tbody>
                {scorer.scorers.map((e) => (
                <tr class="tr-list">
                    <td class="tg-0lax">{scorer.scorers.indexOf(e)+1}</td>
                    <td class="tg-0lax">{e.player.name}</td>
                    <td class="tg-0lax">
                    <img src={e.team.crest} width="25px"></img>
                    &nbsp;{e.team.name}
                    </td>
                    <td class="tg-0lax">{e.goals}</td>
                    <td class="tg-0lax">{e.assists === null ? 0 : e.assists}</td>
                    <td class="tg-0lax">{e.penalties === null ? 0 : e.penalties}</td>
                </tr>
                ))}
                </tbody>
            </table>
            <img className="leagueImg" src={process.env.PUBLIC_URL + '/img/soccerball.png'}/>
          </div>
        )}
      </ScList>
    );
}

ScorerList.propTypes = {
    leaguename: PropTypes.string.isRequired,
}

export default ScorerList;

const ScList = styled.div`
padding: 3%;

.leagueImg{
    width: 90%;
    margin: auto;
    display: block;
    margin-top: 10%;
}

.cap{
  caption-side: top;
  text-align: center;
}

.tg{  
    border-collapse: collapse;
    border-color: #ccc;
    border-spacing: 0;
  }
  
  .tg td{
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

  .tg th{
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

  .tg .tr-list{
    text-align: left;
    vertical-align: top
  }

  .tg .tg-c3ow{
    border-color: inherit;
    text-align: left;
    vertical-align: top
  }
  .tg .tg-0lax{
    text-align: left;
    vertical-align: top;
    border-bottom: 1px solid gray;
  }
`