import React from 'react';
import './style.css';
import '../../../../style/main.css';

class GenreName extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            checked: false,
            item: {
                name: ``,
                email: ``,
                phoneNumber: ``,
                commentaries: ``
            },
            errors: {
                name: null,
                email: null,
                commentaries: null,
                checked: null
            }
        };
    }

    render() {
        return <div className={'about'}>
            <div className={'mainWrapper'}>
            </div>
        </div>;
    }
}

export default GenreName;
