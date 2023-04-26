import React, { Component } from 'react';
import {Line, Bar, Doughnut, Pie, Scatter} from 'react-chartjs-2';

export class ChartJs extends Component {
    render() {
        return (
            <div>
                <div className="page-header">
                    <h3 className="page-title">
                        My Groups
                    </h3>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>My Page</a></li>
                        <li className="breadcrumb-item active" aria-current="page">My Groups</li>
                        </ol>
                    </nav>
                </div>
                <div className="row">
                    <div className="col-md-6 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">I'm in</h4>
                                <p className="card-description">My group list</p>
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                        <tr>
                                            <th>Index</th>
                                            <th>Group Name</th>
                                            <th>Edit</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>밴드동아리</td>
                                            <td>
                                                <button type="button" className="btn btn-primary btn-sm">Go</button>
                                                <button type="button" className="btn btn-secondary btn-sm">Leave</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>박근영과 누나들</td>
                                            <td>
                                                <button type="button" className="btn btn-primary btn-sm">Go</button>
                                                <button type="button" className="btn btn-secondary btn-sm">Leave</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>캡스톤 B조</td>
                                            <td>
                                                <button type="button" className="btn btn-primary btn-sm">Go</button>
                                                <button type="button" className="btn btn-secondary btn-sm">Leave</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>4</td>
                                            <td>SKKU</td>
                                            <td>
                                                <button type="button" className="btn btn-primary btn-sm">Go</button>
                                                <button type="button" className="btn btn-secondary btn-sm">Leave</button>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                            <h4 className="card-title">Invited</h4>
                                <p className="card-description">Click the group name and see the details.</p>
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                        <tr>
                                            <th>Index</th>
                                            <th>Group Name</th>
                                            <th>Accept/Decline</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>밴드동아리</td>
                                            <td>
                                                <button type="button" className="btn btn-primary btn-sm">Accept</button>
                                                <button type="button" className="btn btn-secondary btn-sm">Decline</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Flash</td>
                                            <td>
                                                <button type="button" className="btn btn-primary btn-sm">Accept</button>
                                                <button type="button" className="btn btn-secondary btn-sm">Decline</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Premier</td>
                                            <td>
                                                <button type="button" className="btn btn-primary btn-sm">Accept</button>
                                                <button type="button" className="btn btn-secondary btn-sm">Decline</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>4</td>
                                            <td>After effects</td>
                                            <td>
                                                <button type="button" className="btn btn-primary btn-sm">Accept</button>
                                                <button type="button" className="btn btn-secondary btn-sm">Decline</button>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>                
            </div>
        )
    }
}

export default ChartJs
