import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

function Match (props) {
    const [matches, setMatches] = useState([]);

    const footballAPIKEY = "ce521915bf894d9c9877901ca93d0d47";

    const getMatchesAPI = async() => {
        try {
            const matchInfo = await axios ({
                method: 'get',
                headers: {
                  "Accept": "application/json",
                  "Content-Type": "application/json",
                  "X-Auth-Token": footballAPIKEY,
                },
                url: `v4/teams/${props.id}/matches`, //득점순위를 알 수 있는 API 주소
                
              })
              console.log(matchInfo.data.matches,"경기일정 정보");
              setMatches(matchInfo.data.matches);
        }catch(e) {
            alert(e);
        }
    }

    useEffect(() => {
        getMatchesAPI();
      }, [props.id]);

    return(
        <MatchList>
            {Object.keys(matches).length !== 0 && (
                <table class="tg">
                    <caption>팀 정보</caption>
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
                    <tbody>
                    {/* {matches.map((e) => (
                    <tr class="tr-list">
                        {matches.indexOf(e)+1}
                        <td class="tg-0lax">{e.name}</td>
                        <td class="tg-0lax">{e.position}</td>
                    </tr>
                    ))} */}
                    </tbody>
                </table>
            )}
        </MatchList>
    );
}

export default Match;

const MatchList = styled.div`
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
    vertical-align: top
  }
`