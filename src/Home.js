import { useEffect, useState} from "react";
import styled from "styled-components";
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import ScorerList from "./ScorerList";
import LeagueStandings from "./LeagueStandings";
import CompetitionMatch from "./components/CompetitionMatch";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function Home() {
  const [leagueimg, setLeagueimg] = useState([]); //leagueListURL 에서 리그가 포함된 나라 이미지 저장
  const [leaguename, setLeagueName] = useState("PL"); //리그이름 또는 나라 이미지를 클릭했을때 leaguename 값 변경
  const [season, setSeason] = useState(2022);

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

          console.log(country.data.areas,"나라 정보 API");
          setLeagueimg(country.data.areas);
          
        }
        catch (err){
          alert(err);
        }
    };
  
    useEffect(() => { 
      getCountryApi();
    }, [leaguename]);

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
      setLeagueName("FL1");
  };

  
  const seasonBtn = () => {  //드롭다운 함수
    let seasonList = [];
    for(let i=2022; i>=2020; i--){
      seasonList.push(<Dropdown.Item onClick={() => setSeason(i)}>{i}</Dropdown.Item>);
    }
    return seasonList;
  }

  return (
    <CountryImage>
      <Navbar className="Navbar" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand><img src={process.env.PUBLIC_URL + '/img/soccerball.png'} width="60px"/>SoccerInfo</Navbar.Brand>
          <DropdownButton className="Dropdown" id="dropdown-basic-button" title={season}>
            {seasonBtn()}
          </DropdownButton>
        </Container>
      </Navbar>
      {Object.keys(leagueimg).length !== 0 && (
        <div className="sidebar">
          <div className="sidebarWrapper">
            <div className="sidebarMenu">
              <ul className="sidebarList">
                <li className="sidebarListItem"><div className="bt1" variant="outline-dark" onMouseOver={(e) => e.target.style.background = "#C0C0C0"} onMouseLeave={(e) => e.target.style.background = "#F5F5F5"} onClick={scorerClick_PL}><img src={leagueimg[71].flag} width="40px" />
                &nbsp;프리미어리그</div></li>
                <li className="sidebarListItem"><div className="bt1" variant="outline-dark" onMouseOver={(e) => e.target.style.background = "#C0C0C0"} onMouseLeave={(e) => e.target.style.background = "#F5F5F5"} onClick={scorerClick_PD}><img  src={leagueimg[223].flag} width="40px" />
                &nbsp;라 리가</div></li>
                <li className="sidebarListItem"><div className="bt1" variant="outline-dark" onMouseOver={(e) => e.target.style.background = "#C0C0C0"} onMouseLeave={(e) => e.target.style.background = "#F5F5F5"} onClick={scorerClick_SA}><img  src={leagueimg[113].flag} width="40px" />
                &nbsp;세리에 A</div></li>
                <li className="sidebarListItem"><div className="bt1" variant="outline-dark" onMouseOver={(e) => e.target.style.background = "#C0C0C0"} onMouseLeave={(e) => e.target.style.background = "#F5F5F5"} onClick={scorerClick_BL}><img  src={leagueimg[87].flag} width="40px" />
                &nbsp;분데스리가</div></li>
                <li className="sidebarListItem"><div className="bt1" variant="outline-dark" onMouseOver={(e) => e.target.style.background = "#C0C0C0"} onMouseLeave={(e) => e.target.style.background = "#F5F5F5"} onClick={scorerClick_LEAGUE}><img  src={leagueimg[80].flag} width="40px" />
                &nbsp;리그 1</div></li>
              </ul>
            </div>
          </div>
        </div>
      )}
      {/* {Object.keys(leagueimg).length !== 0 && (
        
          <div className="box1">
            <div>
            <Button className="bt1" variant="outline-dark" onClick={scorerClick_PL}><img src={leagueimg[71].flag} width="40px" />
              &nbsp;프리미어리그</Button>
            </div>
            <div>
            <Button className="bt1" variant="outline-dark" onClick={scorerClick_PD}><img  src={leagueimg[223].flag} width="40px" />
              &nbsp;라 리가</Button>
            </div>
            <div>
            <Button className="bt1" variant="outline-dark" onClick={scorerClick_SA}><img  src={leagueimg[113].flag} width="40px" />
              &nbsp;세리에 A</Button>
            </div>
            <div>
            <Button className="bt1" variant="outline-dark" onClick={scorerClick_BL}><img  src={leagueimg[87].flag} width="40px" />
              &nbsp;분데스리가</Button>
            </div>
            <div>
            <Button className="bt1" variant="outline-dark" onClick={scorerClick_LEAGUE}><img  src={leagueimg[80].flag} width="40px" />
              &nbsp;리그 1</Button>
            </div>
        </div>
      )} */}

      <LeagueStandings className="box2"
        leaguename={leaguename}
        APIKEY={footballAPIKEY}
        season={season}>
      </LeagueStandings>
      
      <ScorerList className="box3"
        leaguename={leaguename}
        APIKEY={footballAPIKEY}
        season={season}>
      </ScorerList>
      
      <CompetitionMatch className="box4"
        leaguename={leaguename}
        APIKEY={footballAPIKEY}
        season={season}>
      </CompetitionMatch>
    
    </CountryImage>
  ); 
}

export default Home;


const CountryImage = styled.div`
  display: grid;
  grid-template-columns: 250px 2fr 2fr;
  grid-auto-rows: minmax(20px, auto);

  .bt1{
    text-align: left;
    height: 40px;
    line-height: 40px;
  }
  .Navbar {
    grid-column-start: 1;
    grid-column-end: 4;
  }
  .sidebar {
    background-color: #F5F5F5;
  }
  .sidebarList {
    padding-top: 5%;
    margin-top: 40px;
  }
`