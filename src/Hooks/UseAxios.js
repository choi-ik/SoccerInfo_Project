import { useState, useEffect} from 'react';
import axios from 'axios';

const useAxios = (url, jsonCode, sessionName, sessionCount) => {
    const [apiData, setApiData] = useState([]);
    const [loading, setLoading] = useState(false);

    const sessionStorage = window.sessionStorage; // 세션스토리지 변수

    useEffect(() => {
      let i = 0;
      /* 세션 스토리지안에 데이터가 있으면 아래 코드 진행 */
      if(sessionStorage.length > 0){
        for(i; i<sessionCount; i++){
          /* 세션스토리지에서 key에 맞는 item이 있는지 확인  */
          if(JSON.parse(sessionStorage.getItem(`${sessionName}${i}`)) !== null){
            /* 위 조건이 만족하면 세션스토리지에 저장된 Code 가 props로 받아온 Code와 맞는지 조건 확인 */
            if(JSON.parse(sessionStorage.getItem(`${sessionName}${i}`)).data.Code === jsonCode){
              /* 조건이 모두 맞다면 세션스토리지에 들어있는 leagueRanking을 state에 파싱해서 저장 */
              setApiData(JSON.parse(sessionStorage.getItem(`${sessionName}${i}`)).data.axiosData);
              setLoading(true);
              break;
            }
          }
        }
        /* i가 count가 될때까지 세션스토리지에서 key를 못찾으면 API요청 함수 실행 */
        if(i === sessionCount) getApi();
      }else{
        /* 첫 렌더링시 세션스토리지가 비어있으니 세션스토리지의 길이가 0 이하면 API 요청 함수 실행 */
        getApi();
      }
    }, [url]);

    const getApi = async () => { //리그를 포함하는 나라 API 가져옴
        try {
          const getApiData = await axios ({
            method: 'get',
            headers: {
              "Accept": "application/json", 
              "Content-Type": "application/json",
              "X-Auth-Token": "ce521915bf894d9c9877901ca93d0d47",
            },
            url: `https://soccerinfo-project-test.herokuapp.com/https://api.football-data.org/v4${url}`,
          })

          let sessionData = {
            data : { Code: jsonCode, axiosData: getApiData }
          };
          
          setApiData(getApiData); // 받아온 데이터 set 해줌
          setLoading(true);

          sessionStorage.setItem(`${sessionName}${sessionCount}`, JSON.stringify(sessionData));
        }
        catch (err){
          alert(err+"\n"+"1분 뒤 다시 시도해 주십시오.");
        }
    };

    return [apiData, loading];
};

export default useAxios;
