import {
    Button,
    Container,
    Divider,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from '@material-ui/core';
import { ContentSpinner } from 'components/ContentSpinner';
import Title from 'components/Title';
import { useDashStyles } from 'context/styles';
import React, { useCallback, useRef, useState } from 'react';
import { Report } from 'types/Report';
import { FetchConfig, useFetch, UseFetchLifecycle, UseFetchResponse } from 'UseFetch';

const useStyles = makeStyles((theme) => ({
    title: {
        display: 'flex',
        flexGrow: 1,
    },
    titleContainer: {
        display: 'flex',
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        margin: '0px 0px 16px 16px',
    },
}));

export const Reports: React.FC = () => {
    /* Combine local and dashboard styling */
    const dashStyles = useDashStyles();
    const reportStyles = useStyles();
    const classes = { ...dashStyles, ...reportStyles };

    /* Fetch Request for report */
    const [reportConfig, setReportConfig] = useState<FetchConfig>({
        url: '/api/reports/get_report',
        method: 'GET',
    });
    const reportRes = useFetch<Report>(reportConfig, UseFetchLifecycle.MountAndUpdate); // fetch when config initializes and updates

    /* Fetch Request for regenerating report */
    const [genReportConfig, setGenReportConfig] = useState<FetchConfig>({
        url: '/api/reports/regenerate_report',
        method: 'GET',
    });
    const genReportRes = useFetch<Report>(genReportConfig, UseFetchLifecycle.Update); // only fetch when config updates

    /* Handler function for refresh button */
    const handleRefresh = () => {
        setGenReportConfig((prevState) => ({ ...prevState })); // config update triggers fetch
    };

    /* Callback ref for reloading report after fetching regenerate report */
    const ref = useCallback((node: HTMLDivElement) => {
        /* Trigger report fetch after regenerate report fetch finishes loading */
        if (node === null) {
            setReportConfig((prevState) => ({ ...prevState })); // config update triggers fetch
        }
    }, []);
    return (
        <>
            {genReportRes.isLoading && (
                /*Trigger ref callback when container unmounts*/
                <Container ref={ref}>
                    {process.env.NODE_ENV === 'development' && (
                        <span>
                            <Typography>
                                <em>(DEV):</em> <strong>Gen Report</strong>
                            </Typography>
                        </span>
                    )}
                    <ContentSpinner />
                </Container>
            )}
            {reportRes.isLoading && (
                <Container>
                    {process.env.NODE_ENV === 'development' && (
                        <span>
                            <Typography>
                                <em>(DEV):</em> <strong>Get Report</strong>
                            </Typography>
                        </span>
                    )}
                    <ContentSpinner />
                </Container>
            )}
            {reportRes.error && (
                <Container>
                    <Typography>{`${reportRes.error.response?.data}`}</Typography>
                </Container>
            )}
            {reportRes.response && !genReportRes.isLoading && (
                /* Only display when report fetch is done and regenerate report fetch is not loading */
                <Paper className={classes.paper}>
                    <Container className={classes.container}>
                        <div className={classes.titleContainer}>
                            <Typography
                                component="h2"
                                variant="h6"
                                color="primary"
                                gutterBottom
                                style={{ paddingLeft: 16, paddingBottom: 16 }} // temp styling adjustment
                                className={classes.title}
                            >
                                Report
                            </Typography>
                            <Button className={classes.button} onClick={handleRefresh}>
                                Refresh
                            </Button>
                        </div>

                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Dock</TableCell>
                                    <TableCell>Location</TableCell>
                                    <TableCell>Revenue</TableCell>
                                    <TableCell>Rentals</TableCell>
                                    <TableCell>Bikes Returned Here</TableCell>
                                    <TableCell>Bikes Returned Elsewhere</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {reportRes.response.data.docks.map((dock, idx) => (
                                    <TableRow key={idx}>
                                        <TableCell>{dock.bike_dock_number}</TableCell>
                                        <TableCell>{dock.location}</TableCell>
                                        <TableCell>{dock.revenue}</TableCell>
                                        <TableCell>{dock.number_of_rentals}</TableCell>
                                        <TableCell>{dock.other_rentals_returned_here}</TableCell>
                                        <TableCell>{dock.bikes_returned_other_dock}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Container>
                    <Container className={classes.container}>
                        <Typography variant="h5">{`Total Rentals: ${reportRes.response.data.total_rentals}`}</Typography>
                        <Typography variant="h5">{`Total Revenue: $${reportRes.response.data.total_revenue}`}</Typography>
                    </Container>
                </Paper>
            )}
        </>
    );
};
