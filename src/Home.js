import { useEffect, useState} from "react";
import styled from "styled-components";
import axios from 'axios';
import ScorerList from "./ScorerList";
import LeagueStandings from "./LeagueStandings";
import CompetitionMatch from "./components/CompetitionMatch";

function Home() {
  const [leagueimg, setLeagueimg] = useState([]); //leagueListURL 에서 리그가 포함된 나라 이미지 저장
  const [leaguename, setLeagueName] = useState("PL"); //리그이름 또는 나라 이미지를 클릭했을때 leaguename 값 변경

  const footballAPIKEY = "ce521915bf894d9c9877901ca93d0d47"; 

  const leagueListURL = "/v4/areas"; //리그를 가지고있는 나라들 API

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
  
    useEffect(() => { 
      getCountryApi();
    }, []);

    const scorerClick_PL = () => { //영국 프리미어리그를 클릭하면 PL로 setLeagueName에 값을 넣어줌
        setLeagueName("PL");
    };

    const scorerClick_PD = () => {
        setLeagueName("PD"); // 스페인 라 리가를 클릭하면 PD로 set해줌
    };

    const scorerClick_SA = () => {
        setLeagueName("SA");
    };

    const scorerClick_BL = () => {
        setLeagueName("BL1");
    };

    const scorerClick_LEAGUE = () => {
      setLeagueName("LEAGUE");
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
            <div onClick={scorerClick_SA}>
              <img  src={leagueimg[113].flag} width="40px" />
              &nbsp;세리에 A
            </div>
            <div onClick={scorerClick_BL}>
              <img  src={leagueimg[87].flag} width="40px" />
              &nbsp;분데스리가
            </div>
            <div onClick={scorerClick_LEAGUE}>
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

      <CompetitionMatch
        leaguename={leaguename}
        APIKEY={footballAPIKEY}>
          

      </CompetitionMatch>
    
    </CountryImage>
  );
}

export default Home;


const CountryImage = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr 1fr;
  grid-template-rows: 250px 1fr 1fr;
  grid-gap: 10px;

  .box1{
    grid-columns: 1/3;
    grid-row:1;
  }
  
  .box2{
    grid-columns: 1/3;
    grid-row: 1/3;
  }

  .box3{
    grid-columns: 1/3;
    grid-row: 1/3;
  }
`
