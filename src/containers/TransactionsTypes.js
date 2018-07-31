// @flow

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { blockTransactionsTypeData } from '../selectors/blocksSelectors';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import { withStyles, withTheme } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import compose from 'recompose/compose';
import { LineChart, CartesianGrid, XAxis, YAxis, Legend, Line, ResponsiveContainer } from 'recharts';

import type { TransactionsTypeData } from '../selectors/blocksSelectors';

const styles = (theme) => ({
    container: {
        padding: '0 100px'
    },
    chartContainer: {
        padding: '20px 30px 20px 0',
        marginBottom: theme.spacing.unit * 7
    },
    [`@media screen and (max-width: ${theme.breakpoints.values.md}px)`]: {
        container: {
            padding: '0 20px'
        },
    },
    avgCard: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    avgContainerLeft: {
        padding: `0 ${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 14}px`
    },
    avgContainerRight: {
        padding: `0 ${theme.spacing.unit * 14}px 0 ${theme.spacing.unit * 8}px`
    }
});

type Props = {
    classes: Object;
    theme: Object;
    data: TransactionsTypeData
};

class TransactionTypes extends PureComponent<Props> {

    render() {
        const { data, classes, theme } = this.props;

        return (
            <div className={classes.container}>
                <Paper className={classes.chartContainer}>
                    <Typography align='center' gutterBottom variant='title'>Transaction Types</Typography>
                    <ResponsiveContainer width='100%' height={300}>
                        <LineChart>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey='blockNumber'
                                tickMargin={8}
                                height={50}
                                tick={{
                                    fontFamily: theme.typography.fontFamily,
                                    fontSize: theme.typography.caption.fontSize
                                }}
                                allowDuplicatedCategory={false}
                                tickCount={5}
                            />
                            <YAxis
                                tick={{
                                    fontFamily: theme.typography.fontFamily,
                                    fontSize: theme.typography.caption.fontSize
                                }}
                                domain={[0, 200]}
                                allowDataOverflow
                            />
                                <Line
                                    dot={false}
                                    dataKey='accountTxs'
                                    data={data.data}
                                    name='Transactions to Accounts'
                                    key='accountTxs'
                                    stroke='#673AB7'
                                    strokeWidth={2}
                                    isAnimationActive={false}
                                />,
                                <Line
                                    dot={false}
                                    dataKey='contractTxs'
                                    data={data.data}
                                    name='Transactions to Contracts'
                                    key='contractTxs'
                                    stroke='#4CAF50'
                                    strokeWidth={2}
                                    isAnimationActive={false}
                                />
                            })}
                            <Legend wrapperStyle={{
                                fontFamily: theme.typography.fontFamily,
                                fontSize: theme.typography.body1.fontSize,
                            }} />
                        </LineChart>
                    </ResponsiveContainer>
                </Paper>
                <Grid container>
                    <Grid className={classes.avgContainerLeft} item xs={6}>
                        <Paper className={classes.avgCard}>
                            <Typography variant='title' align='center'>
                                Average Account Transactions<br />
                            </Typography>
                            <Typography variant='subheading' align='center'>
                                (per block)
                            </Typography>
                            <Typography variant='display3' align='center'>
                                {data.avgAccountTxsPerBlock}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid className={classes.avgContainerRight} item xs={6}>
                        <Paper className={classes.avgCard}>
                            <Typography variant='title' align='center'>
                                Average Contract Transactions
                            </Typography>
                            <Typography variant='subheading' align='center'>
                                (per block)
                            </Typography>
                            <Typography variant='display3' align='center'>
                                {data.avgContractTxsPerBlock}
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        data: blockTransactionsTypeData(state)
    };
}

export default compose(
    withStyles(styles),
    withTheme(styles),
    connect(mapStateToProps)
)(TransactionTypes);
