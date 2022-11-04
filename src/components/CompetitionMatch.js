import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Pagination from "./Pagination";

function CompetitionMatch (props) {
    const [com_Match, set_Com_Match] = useState([]); //리그 전체 최근 지난 경기 일정 저장 State
    const [futureMatch, setFutureMatch] = useState([]); //리그 전체 진행되지 않은 경기 일정 State

    const [page,setPage] = useState(1);
    const [limit, setLimit] = useState(20);
    const offset = (page -1) * limit;

    const footballAPIKEY = props.APIKEY;

    let competitionList = [];
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

              competition_Match.data.matches.map((e, i) => { //진행되지 않은 경기는 보이지 않게 하기 위함.
                if(e.score.winner !== null) competitionList.push(competition_Match.data.matches[i]);
              });

              console.log(competitionList,"배열에 잘 들어갔나 확인");
              set_Com_Match(competitionList); //최근 진행된 경기만 set해줌.
              
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
                    <caption className="cap">리그 전체 경기 일정</caption>
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
                    {com_Match.slice(offset, offset + limit).map((e) => (
                    <tbody>
                    <tr class="tr-list">
                        <td class="tg-0lax">{ e.utcDate.substr(0,10)}</td>
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
                    ))}
                </table>
            )}
            <footer>
              <Pagination
                total={com_Match.length}
                limit={limit}
                page={page}
                setPage={setPage}
                />
            </footer>
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
    vertical-align: top;
    border-bottom: 1px solid gray;
  }
`