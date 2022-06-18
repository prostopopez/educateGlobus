import React from 'react';
import './style.css';
import '../../../../style/main.css';
import BookShelf from "../../../../components/BookShelf";

class AuthorName extends React.Component {
    constructor() {
        super();

        this.state = {
            dataBooks: [],
            dataAuthors: [],
            bookName: null,
            bookPrice: null,
            bookGenre: null,
            bookAuthor: null,
            bookCollection: null,
            bookPublisher: null,
            bookPubDate: null,
            bookRating: null,
            bookImg: null,
            bookDescription: null,
            intervalIsSet: false,
            idToDelete: null,
            idToUpdate: null,
            objectToUpdate: null,
        };
    }

    componentDidMount() {
        this.getDataFromDb();
        if (!this.state.intervalIsSet) {
            let interval = setInterval(this.getDataFromDb, 1000);
            this.setState({ intervalIsSet: interval });
        }
    }

    componentWillUnmount() {
        if (this.state.intervalIsSet) {
            clearInterval(this.state.intervalIsSet);
            this.setState({ intervalIsSet: null });
        }
    }

    getDataFromDb = () => {
        fetch('http://localhost:3001/api/getSomeData')
            .then((data) => data.json())
            .then((res) => this.setState({data: res.data}));
    };

    render() {
        const {data } = this.state;

        return <div className={'aboutAuthor'}>
            <div className={'container'}>
                {console.log(data)}
            </div>
        </div>;
    }
}

export default AuthorName;
