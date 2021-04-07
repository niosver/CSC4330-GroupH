import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from '@material-ui/core';
import React from 'react';

type Props = {
    isOpen: boolean;
    handleClose: () => void;
    handleSubmit: () => void;
};
export const RentDialog: React.FC<Props> = (props) => {
    const { isOpen, handleClose, handleSubmit } = props;
    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{'Bike Rental Agreement'}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Rental Cost and fees
                    <ul>
                        <li>$5 per half hour</li>
                        <li>$9 per hour</li>
                        <li>
                            portion of hour used charged full price of hour $25 if returned to
                            different dock
                        </li>
                        <li>$500 if bike is not returned </li>
                        <li>$200 if bike is damaged depending on damage</li>
                    </ul>
                    1. Assumption of Risk. Renter acknowledges that the activities for which the
                    bicycle is designed include inherent dangers, including the risk of bodily
                    injury and/or death. Renter assumes and accepts all risks associated with the
                    use of the bicycle.
                    <br></br>
                    <br></br>
                    2. If at any time THE BICYCLE SELLER determines that Renter has engaged in an
                    unsafe or hazardous use of the bicycle, THE BICYCLE SELLER may immediately
                    terminate the rental. Upon notification of termination, Renter must return the
                    bicycle to the designated return area immediately. If the rental is terminated
                    for unsafe or hazardous use, Renter will not be refunded his/her security
                    deposit. THE BICYCLE SELLER shall determine, in its sole discretion, whether any
                    behavior or activity is “unsafe or hazardous.”
                    <br></br>
                    <br></br>
                    3. Condition of Bicycle upon Return. The Renter shall return the bicycle to the
                    designated return area clean and in the same condition as it was in when given
                    to Renter, excepting ordinary wear and tear. Renter shall be responsible for any
                    damage caused to the bicycle during the rental period.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Disagree
                </Button>
                <Button onClick={handleSubmit} color="primary" autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    );
};
