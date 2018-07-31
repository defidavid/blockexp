// @flow

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { blocksFeeToValueRatio } from '../selectors/blocksSelectors';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import { withStyles, withTheme } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import compose from 'recompose/compose';
import { LineChart, CartesianGrid, XAxis, YAxis, Line, ResponsiveContainer } from 'recharts';

import type { FeeToValueRatioData } from '../selectors/blocksSelectors';

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
    data: FeeToValueRatioData
};

class FeeToValue extends PureComponent<Props> {

    render() {
        const { data, classes, theme } = this.props;

        return (
            <div className={classes.container}>
                <Paper className={classes.chartContainer}>
                    <Typography align='center' gutterBottom variant='title'>Percentage of Fees to Total Value</Typography>
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
                            />
                            <YAxis
                                tick={{
                                    fontFamily: theme.typography.fontFamily,
                                    fontSize: theme.typography.caption.fontSize
                                }}
                                domain={[0, 25]}
                                allowDataOverflow
                                ticks={[0, 5, 10, 15, 20, 25]}
                            />
                                <Line
                                    dot={false}
                                    dataKey='feesValuePercent'
                                    data={data.data}
                                    key='accountTxs'
                                    stroke='#673AB7'
                                    strokeWidth={2}
                                    isAnimationActive={false}
                                />
                            })}
                        </LineChart>
                    </ResponsiveContainer>
                </Paper>
                <Grid container>
                    <Grid className={classes.avgContainerLeft} item xs={6}>
                        <Paper className={classes.avgCard}>
                            <Typography variant='title' align='center'>
                                Average Fees<br />
                            </Typography>
                            <Typography variant='subheading' align='center'>
                                (eth per block)
                            </Typography>
                            <Typography variant='display3' align='center'>
                                {parseFloat(data.avgFeesPerBlock).toFixed(4)}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid className={classes.avgContainerRight} item xs={6}>
                        <Paper className={classes.avgCard}>
                            <Typography variant='title' align='center'>
                                Average Value Transfer
                            </Typography>
                            <Typography variant='subheading' align='center'>
                                (eth per block)
                            </Typography>
                            <Typography variant='display3' align='center'>
                                {parseFloat(data.avgValuePerBlock).toFixed(4)}
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
        data: blocksFeeToValueRatio(state)
    };
}

export default compose(
    withStyles(styles),
    withTheme(styles),
    connect(mapStateToProps)
)(FeeToValue);
