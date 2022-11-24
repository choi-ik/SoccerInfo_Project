import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

function Match (props) {
    const [matches, setMatches] = useState([]); // LeagueStandings.js 에서 Props로 받아온 데이터를 Url에 넣고 받아온 팀의 경기일정 API 저장 State

    const footballAPIKEY = "ce521915bf894d9c9877901ca93d0d47";

    let sessionStorage = window.sessionStorage;

    /* 팀이름 클릭시 팀 id를 가져와 팀의 경기 일정 및 정보 api 요청 */
    const getMatchesAPI = async() => {
        try {
            const matchInfo = await axios ({
                method: 'get',
                headers: {
                  

                  "Accept": "application/json",
                  "Content-Type": "application/json",
                  "X-Auth-Token": footballAPIKEY,
                },
                url: `https://soccerinfo-project-test.herokuapp.com/https://api.football-data.org/v4/teams/${props.id}/matches`,
                
              })

              let sessionData = {
                data : { leagueId: props.id, teamMatch: matchInfo.data.matches }
              };

              console.log(matchInfo.data.matches,"모달 경기일정 정보");
              setMatches(matchInfo.data.matches);

              sessionStorage.setItem(`ModalMatch${props.count-1}`, JSON.stringify(sessionData));
        }catch(e) {
            alert(e+"\n"+"1분 뒤 다시 시도해 주십시오.");
        }
    }

    useEffect(() => {
      let i = 0;
        if(sessionStorage.length > 0){
            for(i; i<props.count-1; i++){
              if(JSON.parse(sessionStorage.getItem(`ModalMatch${i}`)) !== null){
                if(JSON.parse(sessionStorage.getItem(`ModalMatch${i}`)).data.leagueId === props.id){
                  setMatches(JSON.parse(sessionStorage.getItem(`ModalMatch${i}`)).data.teamMatch);
                  break;
                }
            }
          }
          if(i === props.count-1) getMatchesAPI(); 
        } else {
            getMatchesAPI(); // props로 넘어오는 id의 default값이 0임. id가 0인 팀은 내가 클릭한 팀이 아니기 때문에 조건문을 달아주었음.
        }
      }, []);

    return(
        <MatchList>
            {Object.keys(matches).length !== 0 && (
                <table class="tg" witdh="100%">
                    <caption className="cap">팀 일정</caption>
                    <thead>
                    <tr>
                        <th class="tg-c3ow" width="100px">Date</th>
                        <th class="tg-c3ow">Round</th>
                        <th class="tg-c3ow">League</th>
                        <th class="tg-c3ow">Home</th>
                        <th class="tg-c3ow">Score</th>
                        <th class="tg-c3ow">Away</th>
                    </tr>
                    </thead>
                    <tbody>
                    {matches.map((e) => (
                    <tr class="tr-list">
                        <td class="tg-0lax">{e.utcDate.substr(0,10)}</td>
                        <td class="tg-0lax">{e.competition.name !=='UEFA Champions League' ? e.matchday : "UEFA"}</td>
                        <td class="tg-0lax">
                          <img src={e.competition.emblem} width="40"></img>&nbsp;{e.competition.name}</td>
                        <td class="tg-0lax">
                          <img src={e.homeTeam.crest} width="25"></img>&nbsp;{e.homeTeam.name}</td>
                        <td class="tg-0lax">{e.score.fullTime.home !== null ? e.score.fullTime.home : "-"}
                                            {" : "}
                                            {e.score.fullTime.away !== null ? e.score.fullTime.away : "-"}
                        </td>
                        <td class="tg-0lax">
                        <img src={e.awayTeam.crest} width="25"></img>&nbsp;{e.awayTeam.name}</td>
                    </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </MatchList>
    );
}

export default Match;

const MatchList = styled.div`
width: 75%;
margin-right: 10px;
.cap{
  caption-side: top;
  text-align: center;
}

.tg{  
    border-collapse: collapse;
    border-color: #ccc;
    border-spacing: 0;
    width: 98%;
    margin-left: 20px;
    
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
    text-align: center;
    vertical-align: top;
  }

  .tg .tg-c3ow{
    border-color: inherit;
    text-align: center;
    vertical-align: top
  }
  .tg .tg-0lax{
    text-align: center;
    vertical-align: top;
    border-bottom: 1px solid gray;
  }
`