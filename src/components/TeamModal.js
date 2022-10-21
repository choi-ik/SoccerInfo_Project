import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import styled from "styled-components";
import Match from "./Match"

function TeamModal (props) {
    const [teamInfo, setTeamInfo] = useState([]);
    const [teamName, setTeamName] = useState("");
    const [teamImg, setTeamImg] = useState("");
    const footballAPIKEY = "ce521915bf894d9c9877901ca93d0d47";

        const getTeaminfoAPI = async() => {
            try {
                const Teaminfo = await axios ({
                    method: 'get',
                    headers: {
                      "Accept": "application/json",
                      "Content-Type": "application/json",
                      "X-Auth-Token": footballAPIKEY,
                    },
                    url: `v4/teams/${props.id}`, //득점순위를 알 수 있는 API 주소
                    
                  })
    
                  console.log(Teaminfo.data.squad);
                  //console.log(Teaminfo.data,"팀 이름을 알기 위함");
                  setTeamInfo(Teaminfo.data.squad);
                  setTeamName(Teaminfo.data.name);
                  setTeamImg(Teaminfo.data.crest);
            }catch(e) {
                alert(e);
            }
        }

    useEffect(() => {
        if(props.id !== 0) getTeaminfoAPI();
    }, [props.id])

    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            <img src={teamImg} width="40"></img>
              {teamName}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
            <TmModal>
                <TeamList className="box1">
                    {Object.keys(teamInfo).length !== 0 && (
                        <table class="tg">
                            <caption>팀 정보</caption>
                            <thead>
                            <tr>
                                <th class="tg-c3ow">List</th>
                                <th class="tg-c3ow">Name</th>
                                <th class="tg-c3ow">Position</th>
                            </tr>
                            </thead>
                            <tbody>
                            {teamInfo.map((e) => (
                            <tr class="tr-list">
                                {teamInfo.indexOf(e)+1}
                                <td class="tg-0lax">{e.name}</td>
                                <td class="tg-0lax">{e.position}</td>
                            </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
                </TeamList>
                <Match 
                    className="box2"
                    id={props.id}>
                </Match>
            </TmModal>
       
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
}

export default TeamModal;

const TmModal = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr 1fr;
  grid-template-rows: 250px 1fr 1fr;
  grid-gap: 10px;

  .box1{
    grid-columns: 1/3;
    grid-row: 1;
  }
  
  .box2{
    grid-columns: 2/3;
    grid-row: 1;
  }

`

const TeamList = styled.div`
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