import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

function TeamInformation(teamid) {
    console.log(teamid);
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
                url: `v4/teams`, //득점순위를 알 수 있는 API 주소
                
              })
        }catch(e) {
            alert(e);
        }
            
    }
            
    return (
        <div>

        </div>
    );
}

TeamInformation.propTypes = {
    teamid: PropTypes.number,
}

export default TeamInformation;
