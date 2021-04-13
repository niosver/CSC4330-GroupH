import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import React, { useRef, useState } from 'react';

type Props = {
    classes: Record<'paper', string>;
    isOpen: boolean;
    handleCancel: () => void;
    handleSubmit: (fee: number) => () => void;
    keepMounted: boolean;
    value: number;
};

export const FeeDialog: React.FC<Props> = (props) => {
    const { isOpen, handleCancel, handleSubmit, value: initValue, ...rest } = props;
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
            <DialogTitle id="alert-dialog-title">{'Bike Return Agreement'}</DialogTitle>
            <DialogContent>
                <RadioGroup
                    ref={radioGroupRef}
                    aria-label="ringtone"
                    name="ringtone"
                    value={value}
                    onChange={handleChange}
                >
                    {[10, 50, 100, 150, 199].map((num, idx) => (
                        <FormControlLabel
                            key={idx}
                            label={`$${num}`}
                            value={num}
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
        </Dialog>
    );
};
