import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentBlock } from './actions/blockActions';
import Nav from './components/Nav';
import { withStyles } from 'material-ui/styles';
import CssBaseline from 'material-ui/CssBaseline';
import Routes from './routes';
import compose from 'recompose/compose';
import { getCompletedBlocks } from './reducers/index';
import { LinearProgress } from 'material-ui/Progress';
import Typography from 'material-ui/Typography';

const GET_CURRENT_BLOCK_POLL_INTERVAL = 2500;
const MIN_NUM_BLOCKS = 7;

const styles = () => ({
    loading: {
        marginTop: 50
    },
    progress: {
        margin: '40px auto',
        width: 500
    },
    appContainer: {
        paddingTop: 80
    }
});

class App extends Component {

    state = {
        ready: false
    };

    componentDidMount() {
        const { getCurrentBlock } = this.props;
        getCurrentBlock();
        this.poller = setInterval(() => {
            getCurrentBlock();
        }, GET_CURRENT_BLOCK_POLL_INTERVAL);
    }

    componentWillUnmount() {
        clearInterval(this.poller);
    }

    render() {
        const { classes, completedBlocks } = this.props;
        const { ready } = this.state;

        if (completedBlocks.size === MIN_NUM_BLOCKS && !ready) {
            setTimeout(() => {
                this.setState({ ready: true });
            }, 200)
        }

        return (
            <Fragment>
                <CssBaseline />
                <Router>
                    <div className={classes.appContainer}>
                        <Nav />
                        {ready && <Routes /> }
                    </div>
                </Router>

                {!ready && <Typography
                    className={classes.loading}
                    variant='display1'
                    align='center'
                >
                    Loading...
                </Typography>}

                {!ready && <LinearProgress
                    variant='determinate'
                    value={completedBlocks.size / MIN_NUM_BLOCKS * 100}
                    className={classes.progress}
                />}
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        completedBlocks: getCompletedBlocks(state)
    };
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps, { getCurrentBlock })
)(App);
