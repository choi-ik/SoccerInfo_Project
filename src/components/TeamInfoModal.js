import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';

function TeamInfoModal(props) {
    // const [TeaminfoModal, setTeamInfoModal] = useState();

    // const getTeaminfoAPI = async() => {
    //     try {
    //         const Teaminfo = await axios ({
    //             method: 'get',
    //             headers: {
    //               "Accept": "application/json",
    //               "Content-Type": "application/json",
    //               "X-Auth-Token": footballAPIKEY,
    //             },
    //             url: `v4/teams/${}`, //득점순위를 알 수 있는 API 주소
                
    //           })

    //           console.log(Teaminfo.data.squad);
    //           setTeamInfo(Teaminfo.data.squad);
    //     }catch(e) {
    //         alert(e);
    //     }
    // }
    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Using Grid in Modal
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="show-grid">
            <Container>
              <Row>
                <Col xs={12} md={8}>
                  .col-xs-12 .col-md-8
                </Col>
                <Col xs={6} md={4}>
                  .col-xs-6 .col-md-4
                </Col>
              </Row>
    
              <Row>
                <Col xs={6} md={4}>
                  .col-xs-6 .col-md-4
                </Col>
                <Col xs={6} md={4}>
                  .col-xs-6 .col-md-4
                </Col>
                <Col xs={6} md={4}>
                  .col-xs-6 .col-md-4
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
}

export default TeamInfoModal;