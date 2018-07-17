import React from "react";
import TransactionsTypes from "./containers/TransactionsTypes";
import FeeToValue from "./containers/FeeToValue";
import { Route, Redirect, Switch } from "react-router-dom";

export default function () {
    return (
        <Switch>
            <Route path="/tx-type" render={props => {
                return <TransactionsTypes />
            }} />
            <Route path="/fee-value-ratio" render={props => {
                return <FeeToValue />
            }} />
            <Redirect from="/" to="/tx-type" />
        </Switch>
    );
};
