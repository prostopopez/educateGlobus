import React from 'react';
import './style.css';
import '../../../../style/main.css';

class Reviews extends React.Component {
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
        return <div className={'bookReviews'}>
            <div className={'container'}>
                <h1>{`Отзыв`}</h1>
                <hr/>
            </div>
        </div>;
    }
}

export default Reviews;
