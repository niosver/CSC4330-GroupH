import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import React, { useRef, useState } from 'react';
import { DockRes } from 'types/Transactions';
import { UseFetchResponse } from 'hooks/UseFetch';
import { ContentSpinner } from './ContentSpinner';

type Props = {
    classes: Record<'paper', string>;
    dockRes: UseFetchResponse<DockRes>;
    isOpen: boolean;
    handleCancel: () => void;
    handleSubmit: (dock: number) => () => void;
    keepMounted: boolean;
    value: number;
};

export const ReturnDialog: React.FC<Props> = (props) => {
    const { isOpen, handleCancel, handleSubmit, dockRes, value: initValue, ...rest } = props;
    const [value, setValue] = useState(initValue);
    const radioGroupRef = useRef<HTMLElement>(null);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(Number(event.target.value));
    };
    return (
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            open={isOpen}
            onClose={handleCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            {...rest}
        >
            {dockRes.isLoading && (
                <>
                    {process.env.NODE_ENV === 'development' && (
                        <span>
                            <Typography>
                                <em>(DEV):</em> <strong>Docks</strong>
                            </Typography>
                        </span>
                    )}

                    <ContentSpinner />
                </>
            )}
            {dockRes.error && (
                <DialogTitle id="alert-dialog-title-error">{'Error retrieving docks'}</DialogTitle>
            )}
            {dockRes.response && (
                <>
                    <DialogTitle id="alert-dialog-title">{'Bike Return Agreement'}</DialogTitle>
                    <DialogContent>
                        <RadioGroup
                            ref={radioGroupRef}
                            aria-label="ringtone"
                            name="ringtone"
                            value={value}
                            onChange={handleChange}
                        >
                            {dockRes.response.data.bike_docks.map((dock, idx) => (
                                <FormControlLabel
                                    key={idx}
                                    label={`Dock ${dock.bikedock_number}: ${dock.location}`}
                                    value={dock.bikedock_number}
                                    control={<Radio />}
                                />
                            ))}
                        </RadioGroup>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCancel} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit(value)} color="primary" autoFocus>
                            Confirm
                        </Button>
                    </DialogActions>
                </>
            )}
        </Dialog>
    );
};
