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
import useAxios from "./Hooks/UseAxios";

function Home() {
  const [leagueimg, setLeagueimg] = useState([]); // 받아온 api 객체 배열의 flag(이미지주소 값)
  const [leaguename, setLeagueName] = useState("PL"); // Props로 넘겨주기 위한 리그 코드값
  const [season, setSeason] = useState(2022); // 시즌 드롭다운 버튼 default = 2022 
  //const [loading, setLoading] = useState(false); // API를 받아오기 전 보여줄 상태 state

  const [axiosData,loading] = useAxios(`/areas`, null, "areas", 0 ); // useAxios 훅에서 API 데이터와 loading 상태 받아옴

  /* 하드코딩 했던 함수 부분  JSON 리팩토링*/
  const nationCode = {
    data: [{leagueCode: "PL", img: leagueimg[71], name: "프리미어리그"},
           {leagueCode: "PD", img: leagueimg[223], name: "프리메라리그"},
           {leagueCode: "SA", img: leagueimg[113], name: "세리에 A"},
           {leagueCode: "BL1", img: leagueimg[87], name: "분데스리가"},
           {leagueCode: "FL1", img: leagueimg[80], name: "리그 1"}] 
  };
  
  const footballAPIKEY = "ce521915bf894d9c9877901ca93d0d47"; //api키 코드상에 놓지 않기.

  // const getCountryApi = async () => { //리그를 포함하는 나라 API 가져옴
  //       try {
          
  //         const country = await axios ({
  //           method: 'get',
  //           headers: {
              
              
  //             "Accept": "application/json",
  //             "Content-Type": "application/json",
  //             "X-Auth-Token": footballAPIKEY,
  //           },
  //           url: `https://soccerinfo-project-test.herokuapp.com/https://api.football-data.org/v4/areas`,
            
  //         })
  //         console.log(country.data.areas,"나라 정보 API");
  //         setLeagueimg(country.data.areas); // 받아온 데이터 set 해줌
  //         setLoading(true); // API를 받아오고 난뒤 true set 해줌
  //       }
  //       catch (err){
  //         alert(err+"\n"+"1분 뒤 다시 시도해 주십시오.");
  //       }
  //   };
    
    /* 세션스토리지 정리를 위한 함수
       첫 렌더링이되고 1분뒤 세션스토리지를 정리하고, 이후로 1분마다 스토리지를 정리함 */
    // setTimeout(() => {
    //   setInterval(() => {
    //     window.sessionStorage.clear();
    //     console.log("세션스토리지 정리");
    //   }, 60000)
    // }, 60000);

    useEffect(() => { 
      //getCountryApi(); 
      if(axiosData.length !== 0) setLeagueimg(axiosData.data.areas)
    }, [axiosData]);

    /* 하드코딩 코드 윗부분에 리팩토링
    const scorerClick_PL = () => {
        setLeagueName("PL");
    };
    const scorerClick_PD = () => {
        setLeagueName("PD");
    };
    const scorerClick_SA = () => {
        setLeagueName("SA");
    };
    const scorerClick_BL = () => {
        setLeagueName("BL1");
    };
    const scorerClick_LEAGUE = () => {
      setLeagueName("FL1");
    }; */

  /* 드롭다운 함수 */
  const seasonBtn = () => {  
    let seasonList = [];
    for(let i=2022; i>=2020; i--){
      seasonList.push(<Dropdown.Item onClick={() => setSeason(i)}>{i}</Dropdown.Item>);
    }
    return seasonList;
  }

  return (
    <>
      {loading ? // loading이 API를 받아와 true가 될때까지 Loading 텍스트를 보여줌
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
                  {nationCode.data.map((e) => (
                    <li className="sidebarListItem">
                      <div className="bt1" 
                           variant="outline-dark" 
                           onMouseOver={(e) => e.target.style.background = "#C0C0C0"} 
                           onMouseLeave={(e) => e.target.style.background = "#F5F5F5"} 
                           onClick={() => setLeagueName(e.leagueCode)}>
                           <img src={e.img.flag} 
                                width="40px" />
                      &nbsp;{e.name}
                      </div>
                    </li>
                  ))}
                  
                  {/* <li className="sidebarListItem"><div className="bt1" variant="outline-dark" onMouseOver={(e) => e.target.style.background = "#C0C0C0"} onMouseLeave={(e) => e.target.style.background = "#F5F5F5"} onClick={scorerClick_PL}><img src={leagueimg[71].flag} width="40px" />
                  &nbsp;프리미어리그</div></li>
                  <li className="sidebarListItem"><div className="bt1" variant="outline-dark" onMouseOver={(e) => e.target.style.background = "#C0C0C0"} onMouseLeave={(e) => e.target.style.background = "#F5F5F5"} onClick={scorerClick_PD}><img  src={leagueimg[223].flag} width="40px" />
                  &nbsp;라 리가</div></li>
                  <li className="sidebarListItem"><div className="bt1" variant="outline-dark" onMouseOver={(e) => e.target.style.background = "#C0C0C0"} onMouseLeave={(e) => e.target.style.background = "#F5F5F5"} onClick={scorerClick_SA}><img  src={leagueimg[113].flag} width="40px" />
                  &nbsp;세리에 A</div></li>
                  <li className="sidebarListItem"><div className="bt1" variant="outline-dark" onMouseOver={(e) => e.target.style.background = "#C0C0C0"} onMouseLeave={(e) => e.target.style.background = "#F5F5F5"} onClick={scorerClick_BL}><img  src={leagueimg[87].flag} width="40px" />
                  &nbsp;분데스리가</div></li>
                  <li className="sidebarListItem"><div className="bt1" variant="outline-dark" onMouseOver={(e) => e.target.style.background = "#C0C0C0"} onMouseLeave={(e) => e.target.style.background = "#F5F5F5"} onClick={scorerClick_LEAGUE}><img  src={leagueimg[80].flag} width="40px" />
                  &nbsp;리그 1</div></li> */}
                </ul>
              </div>
            </div>
          </div>
        )}
        
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
      : <h1>Loading...</h1> 
      }
    </>
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
    padding-top: 10%;
    margin-top: 40px;
  }
  .sidebarListItem {
    cursor : pointer;
  }
`