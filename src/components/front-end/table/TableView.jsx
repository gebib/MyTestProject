import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/TableView.css';
import {
    Row, Col, Table, Button, Tooltip, FormGroup,
    InputGroup, FormControl, OverlayTrigger, ButtonGroup, ProgressBar, TableRow
} from 'react-bootstrap';

class TableView extends Component {
    state = {}
    render() {
        return (
            <div className="gridprimaryContainer container">
                <Row>
                    <Col xs={12} md={12}>
                    ////////////++ oversikt: knapp? auto reload?
                    </Col>
                </Row>
                <Table striped bordered  hover>
                    <thead>
                        <tr>
                            <th>Stasjon</th>
                            <th>Tilgjengelige låser</th>
                            <th>Ledige sykler</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Oslo s nord</td>
                            <td>23</td>
                            <td>12</td>
                        </tr>
                        <tr>
                            <td>Forskningsparken</td>
                            <td>0</td>
                            <td>25</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default TableView;