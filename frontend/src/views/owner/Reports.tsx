import {
    Container,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from '@material-ui/core';
import { ContentSpinner } from 'components/ContentSpinner';
import Title from 'components/Title';
import React, { useState } from 'react';
import { Report } from 'types/Report';
import { FetchConfig, useFetch, UseFetchLifecycle } from 'UseFetch';
export const Reports: React.FC = () => {
    const [reportConfig, setReportConfig] = useState<FetchConfig>({
        url: '/api/reports/get_report',
        method: 'GET',
    });
    const reportRes = useFetch<Report>(reportConfig, UseFetchLifecycle.Mount);
    const [genReportConfig, setGenReportConfig] = useState<FetchConfig>({
        url: '/api/reports/gen_report',
        method: 'GET',
    });
    const genReportRes = useFetch<Report>(genReportConfig, UseFetchLifecycle.Update);
    return (
        <>
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
                /*Trigger ref callback if Container is rendered*/
                <Container>
                    <Typography>{`${reportRes.error.response?.data}`}</Typography>
                </Container>
            )}
            {reportRes.response && (
                /*Trigger ref callback if Container is rendered*/
                <Container>
                    <Container>
                        <Title>Report</Title>
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
                    <Divider />
                    <Container>
                        <Typography variant="h5">{`Total Rentals: ${reportRes.response.data.total_rentals}`}</Typography>
                        <Typography variant="h5">{`Total Revenue: $${reportRes.response.data.total_revenue}`}</Typography>
                    </Container>
                </Container>
            )}
        </>
    );
};
