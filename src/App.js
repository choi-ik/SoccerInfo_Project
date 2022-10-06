import { useEffect, useState} from "react";
import styled from "styled-components";
import axios from 'axios';
import ScorerList from "./ScorerList";
import LeagueStandings from "./LeagueStandings";

function App() {
  const [leagueimg, setLeagueimg] = useState([]); //leagueListURL 에서 리그가 포함된 나라 이미지 저장
  const [leaguename, setLeagueName] = useState("PL"); //리그이름 또는 나라 이미지를 클릭했을때 leaguename 값 변경
  //const [scorer, setScorer] = useState([]); //변경된 leaguename에맞게 득점순위 저장
  //const [leagueStandings, setLeagueStandings] = useState([]); //변경된 leaguename에 맞게 각 리그 순위 저장

  const footballAPIKEY = "ce521915bf894d9c9877901ca93d0d47"; 

  const leagueListURL = "/v4/areas"; //리그를 가지고있는 나라들 API
  //const scorerURL = `/v4/competitions/${leaguename}/scorers`; //득점순위를 알 수 있는 API
  //const leagueStandingsURL = `/v4/competitions/${leaguename}/standings`; //각 리그에 포함된 팀들 순위를 알 수 있는 API

  const getCountryApi = async () => { //리그를 포함하는 나라 API 가져옴
        try {

          const country = await axios ({
            method: 'get',
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "X-Auth-Token": footballAPIKEY,
            },
            url: leagueListURL,
            
          })

          console.log(country.data.areas);
          setLeagueimg(country.data.areas);
          
        }
        catch (err){
          alert(err);
        }
    };

    // const getScorerAPI = async() => { // 득점순위 알 수 있는 API 가져옴
    //   try {
    //     const scorerName = await axios ({
    //       method: 'get',
    //       headers: {
    //         "Accept": "application/json",
    //         "Content-Type": "application/json",
    //         "X-Auth-Token": footballAPIKEY,
    //       },
    //       url: scorerURL,
          
    //     })
    //     console.log(scorerName.data.scorers);
    //     setScorer(scorerName.data.scorers);
    //   }
    //   catch(err){
    //     alert(err);
    //   }
    // };

    // const getLeagueStandingsAPI = async () => { // 팀 순위를 알 수 있는 API 가져옴
    //   try {
    //     const leagueStandings = await axios ({
    //       method: 'get',
    //       headers: {
    //         "Accept": "application/json",
    //         "Content-Type": "application/json",
    //         "X-Auth-Token": footballAPIKEY,
    //       },
    //       url: leagueStandingsURL,
          
    //     })
    //     console.log(leagueStandings.data.standings[0].table);
    //     setLeagueStandings(leagueStandings.data.standings[0].table);
    //   }
    //   catch(err){
    //     alert(err);
    //   }
    // };
  
    useEffect(() => { //처음 렌더링되면 API함수 3개 실행
      getCountryApi();
      //getScorerAPI();
      //getLeagueStandingsAPI();
    }, []);

    const scorerClick_PL = () => { //영국 프리미어리그를 클릭하면 PL로 setLeagueName에 값을 넣어주고 그거에 맞는 API 3가지 가져옴
          setLeagueName("PL");
          //getScorerAPI();
          //getLeagueStandingsAPI();
      };

    const scorerClick_PD = () => {
          setLeagueName("PD");
          //getScorerAPI();
          //getLeagueStandingsAPI();
      };

  return (
    <CountryImage>
      {Object.keys(leagueimg).length !== 0 && (
          <div className="box1">
            <div onClick={scorerClick_PL}>
              <img  src={leagueimg[71].flag} width="40px" />
              &nbsp;프리미어리그
            </div>
            <div onClick={scorerClick_PD}>
              <img  src={leagueimg[223].flag} width="40px" />
              &nbsp;라 리가
            </div>
            <div>
              <img  src={leagueimg[113].flag} width="40px" />
              &nbsp;세리에 A
            </div>
            <div>
              <img  src={leagueimg[87].flag} width="40px" />
              &nbsp;분데스리가
            </div>
            <div>
              <img  src={leagueimg[80].flag} width="40px" />
              &nbsp;리그 1
            </div>
        </div>
      )}

      <LeagueStandings className="box2"
        leaguename={leaguename}
        APIKEY={footballAPIKEY}>
      </LeagueStandings>
      
      <ScorerList className="box3"
        leaguename={leaguename}
        APIKEY={footballAPIKEY}>
      </ScorerList>

      {/* {Object.keys(leagueStandings).length !== 0 && (
        <div className="box2">
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
      </div>
      )} */}

      
      
      {/* {Object.keys(scorer).length !== 0 && (
        <div className="box3">
        <table class="tg">
        <caption>득점 순위</caption>
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
        {scorer.map((e) => (
          <tr class="tr-list">
            {scorer.indexOf(e)+1}
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
      </div>
      )} */}
    </CountryImage>
  );
}

export default App;


const CountryImage = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr 1fr;
  grid-template-rows: 250px 1fr 1fr;
  grid-gap: 10px;

  .box1{
    grid-columns: 1/4;
    grid-row:1;
  }
  
  .box2{
    grid-columns: 1/4;
    grid-row: 1/3;
  }

  .box3{
    grid-columns: 1/4;
    grid-row: 1/3;
  }

  
`
