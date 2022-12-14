import { useEffect, useState } from "react";
import styled from "styled-components";
import useAxios from "../Hooks/UseAxios";

function Match (props) {
    const [matches, setMatches] = useState([]);

    /* props.count-1 -> Modal 컴포넌트에서 count가 1증가된 상태로 넘어오기 때문
       팀이름 클릭시 Modal컴포넌트에서 props로 받아온 id값을 포함해 커스텀훅으로 경기 일정 데이터 받아옴 */
    const [axiosData] = useAxios(`/teams/${props.id}/matches`, props.id, "TeamMatch", props.count-1);

    useEffect(() => {
      if(axiosData.length !== 0) setMatches(axiosData.data.matches);
      }, [axiosData]);

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