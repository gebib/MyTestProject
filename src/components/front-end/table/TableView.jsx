import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/TableView.css';
import {
    ButtonToolbar, Navbar, Row, Col, Table, Button, Tooltip, FormGroup,
    InputGroup, FormControl, OverlayTrigger, ButtonGroup, ProgressBar, TableRow
} from 'react-bootstrap';

class TableView extends Component {
    state = {}

    //reload the api to update current status
    updateStatus = () => {
        console.log('////update///');
    }
    render() {
        return (
            <div className="gridprimaryContainer container">
                <div className="bg-light py-1">
                    <ButtonToolbar>
                        <h4>Oversikt for Oslo Bysykkel</h4>
                    </ButtonToolbar>
                </div>
                <div className="bg-light py-1">
                    <ButtonToolbar>
                        <Button variant="secondary" block onClick={this.updateStatus}> Oppdater </Button>
                    </ButtonToolbar>
                </div>

                <Table striped bordered hover>
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