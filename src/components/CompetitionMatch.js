import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

function CompetitionMatch (props) {
    const [com_Match, set_Com_Match] = useState([]); //리그 전체 최근 지난 경기 일정 저장 State
    const [futureMatch, setFutureMatch] = useState([]); //리그 전체 진행되지 않은 경기 일정 State
    const footballAPIKEY = props.APIKEY;

    const get_Competition_Match_API = async() => {
        try {
            const competition_Match = await axios ({
                method: 'get',
                headers: {
                  "Accept": "application/json",
                  "Content-Type": "application/json",
                  "X-Auth-Token": footballAPIKEY,
                  "X-Unfold-Goals" : true
                },
                url: `v4/competitions/${props.leaguename}/matches?season=${props.season}`,  //리그 전체 경기 일정 API
                
              })
              console.log(competition_Match.data.matches,"리그 전체 경기일정 정보");
              setFutureMatch(competition_Match.data.matches);//진행되지 않은 리그 경기 Set

              competition_Match.data.matches.sort(function(a,b) { //최근경기 가장 까가운 날짜로 보이게 내림차순 하기 위함.
                return parseFloat(Date.parse(b.utcDate)) - parseFloat(Date.parse(a.utcDate));
              });
              set_Com_Match(competition_Match.data.matches);
              
        }catch(e) {
          alert(e);
        }
    }
    useEffect(() => {
        get_Competition_Match_API();
    }, [props.leaguename, props.season])
    return(
        <ComMatch>
            {Object.keys(com_Match).length !== 0 && (
                <table class="tg" width="100%">
                    <caption className="cap">리그 경기 일정</caption>
                    <thead>
                    <tr>
                        <th class="tg-c3ow">Date</th>
                        <th class="tg-c3ow">Round</th>
                        <th class="tg-c3ow">League</th>
                        <th class="tg-c3ow">Home</th>
                        <th class="tg-c3ow">Score</th>
                        <th class="tg-c3ow">Away</th>
                    </tr>
                    </thead>
                    {com_Match.map((e) => (
                      e.score.winner !== null ? 
                    <tbody>
                    <tr class="tr-list">
                        { e.utcDate.substr(0,10)}
                        <td class="tg-0lax">{e.competition.name!=='UEFA Champions League' ? e.matchday : "UEFA"}</td>
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
                    </tbody>
                    : false
                    ))}
                </table>
            )}
        </ComMatch>
        
    );
}
export default CompetitionMatch;

const ComMatch = styled.div`
  grid-column-start: 1;
  grid-column-end: 4;
  
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
    text-align: center;
    vertical-align: top
  }

  .tg .tg-c3ow{
    border-color: inherit;
    text-align: center;
    vertical-align: top
  }
  .tg .tg-0lax{
    text-align: center;
    vertical-align: top
  }
`