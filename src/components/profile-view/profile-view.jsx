import React from 'react';
import {Button} from 'react-bootstrap';

export default function ProfileView(props) {
    const {onBackClick} = props;

    return (
        <div className="Profile">
            <h1>Profile</h1>
            <Button block size="lg" variant="link" onClick={onBackClick}>Back</Button>
        </div>
    );
}