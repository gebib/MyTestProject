import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/TableView.css';
import {
    ButtonToolbar, Table, Button
} from 'react-bootstrap';

class TableView extends Component {
    rowNrID = 0;
    isUpdating = false; // flag to prevent rapid update requests.
    // JSON files from fetch
    stationListJSON = null;
    stationStatusListJSON = null;
    state = {
        // combined informations ready to view
        listOfTableDataConstructedFromJSON: []
    }

    // lifecycle hook that will run everytime this component is reloaded/starts
    componentDidMount = () => {
        this.getDataFromAPI();
    }

    //fetchs data from two API requestes
    getDataFromAPI = () => {
        if (this.isUpdating) {
            return;
        } else {
            this.isUpdating = true; //update start
        }
        //fetch station property data needed from the API
        let fetchStationsInfo = () => {
            return new Promise((resolve, reject) => {
                fetch('https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json', {
                    header: { "Client-Identifier": "private-monitorapp" }
                }).then(response => {
                    return response.json();
                }).then(JSONdata => {
                    this.stationListJSON = JSONdata;
                    resolve();
                }).catch(error => {
                    reject('Stasjonenes informasjon er ikke tilgjengelig for øyebliket! \n Vennligst prøv igjen senere', '\n\n', error);
                });
            });
        }
        //then fetch station status data needed from the API
        let fetchStationsCurrentStatus = () => {
            return new Promise((resolve, reject) => {
                fetch('https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json', {
                    header: { "Client-Identifier": "private-monitorapp" }
                }).then(response => {
                    return response.json();
                }).then(JSONdata => {
                    this.stationStatusListJSON = JSONdata;
                    resolve();
                }).catch(error => {
                    alert('Stasjonenes status informasjon er ikke tilgjengelig for øyebliket! \n Vennligst prøv igjen senere', '\n\n', error);
                    reject();
                });
            });
        }
        //actions are then guaranteed to go asynchronously!
        fetchStationsInfo().then(() => {
            return fetchStationsCurrentStatus();
        }).then(() => {
            this.extractViewDataFromJSON();
        });
    }

    //extracts the relevant data to be viewd inside the table.
    extractViewDataFromJSON = () => {
        const listOfStationsProperty = this.stationListJSON.data.stations;
        const listOfStationsStatus = this.stationStatusListJSON.data.stations;
        let iterationLength = 0;
        let isStationsListAPIactive = false;
        let isStationsStatusListAPIactive = false;
        if (listOfStationsProperty != null) {
            iterationLength = listOfStationsProperty.length;
            isStationsListAPIactive = true;
        }
        if (listOfStationsStatus != null) {
            iterationLength = listOfStationsStatus.length;
            isStationsStatusListAPIactive = true;
        }
        if ((listOfStationsProperty == null) && (listOfStationsStatus == null)) {
            alert('Informasjonene er ikke tilgjengelige for øyebliket!\n Vennligst prøv igjen senere.');
            return; // terminate
        }
        let tempArrayForTableData = [];
        for (let i = 0; i < iterationLength; i++) {
            let nameOfStation = (isStationsListAPIactive) ? listOfStationsProperty[i].name : 'Ikke tilgjengelig';
            let availableDocks = 'Ikke tilgjengelig';
            let availableBikes = 'Ikke tilgjengelig';
            if (isStationsStatusListAPIactive) {
                availableDocks = listOfStationsStatus[i].num_docks_available;
                availableBikes = listOfStationsStatus[i].num_bikes_available;
            }
            tempArrayForTableData.push(
                {
                    stationName: nameOfStation,
                    numberOfBikesAvailable: availableBikes,
                    numberOfDocksAvailable: availableDocks
                }
            );
        }
        //updates view data on reaload
        this.setState({
            listOfTableDataConstructedFromJSON: tempArrayForTableData
        });
        this.isUpdating = false; //update done
        console.log('////updated////');
    }

    ///render view
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
                        <Button variant="secondary" block onClick={this.getDataFromAPI}> Oppdater </Button>
                    </ButtonToolbar>
                </div>
                <Table striped bordered hover >
                    <thead>
                        <tr>
                            <th>Stasjon</th>
                            <th>Tilgjengelige låser</th>
                            <th>Ledige sykler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.listOfTableDataConstructedFromJSON.map(row => (
                            <tr key={this.rowNrID++} >
                                <td>{row.stationName}</td>
                                <td>{row.numberOfDocksAvailable}</td>
                                <td>{row.numberOfBikesAvailable}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        );
    }
}
export default TableView;