import { useState, useEffect } from "react";
import styled from "styled-components";
import Pagination from "./Pagination";
import useAxios from "../Hooks/UseAxios";

function CompetitionMatch (props) {
    const [comMatch, setComMatch] = useState([]);    // 받아온 API 데이터(리그 전체 경기) 저장

    const [page, setPage] = useState(1);                 // 페이지네이션 default 페이지 = 1
    const [limit, setLimit] = useState(20);             // 페이지네이션 한 화면에 보여주는 팀개수 default = 20
    const offset = (page -1) * limit;

    const footballAPIKEY = props.APIKEY;

    let competitionList = [];                           //진행된 경기만 배열에 push하기 위해 배열 선언
    let sessionStorage = window.sessionStorage;         // 세션 스토리지 변수
    const [count, setCount] = useState(0);              //세션 스토리지에 저장할 이름 차별성 두기 위한 state 

    /* 리그 경기 전체 결과 API 커스텀 훅으로 받아옴 */
    const [axiosData] = useAxios(`/competitions/${props.leaguename}/matches?season=${props.season}`, props.leaguename, "LeagueMatch", count);

    useEffect(() => {
      setCount(count + 1);
      if(axiosData.length !== 0) {
         /* 최근경기 가장 까가운 날짜로 보이게 내림차순 하기 위함 */
         axiosData.data.matches.sort(function(a,b) { 
          return parseFloat(Date.parse(b.utcDate)) - parseFloat(Date.parse(a.utcDate));
        });
        /* 진행되지 않은 경기는 보이지 않게 하기 위해 winner가 null이 아닌 데이터만 저장 */
        axiosData.data.matches.map((e, i) => { 
          if(e.score.winner !== null) competitionList.push(axiosData.data.matches[i]);
        });
        setComMatch(competitionList);
      }
    }, [props.leaguename, props.season, axiosData])

    return(
        <ComMatch>
            {Object.keys(comMatch).length !== 0 && (
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
                    {comMatch.slice(offset, offset + limit).map((e) => (
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
                total={comMatch.length}
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