import React from 'react';
import AuthorShelf from '../../../components/AuthorShelf';
import './style.css';
import '../../../style/main.css';

class Authors extends React.Component {
    constructor() {
        super();

        this.state = {
            dataAuthors: [],
            intervalIsSet: false,
            idToDelete: null,
            idToUpdate: null,
            objectToUpdate: null,
        };
    }

    componentDidMount() {
        this.getDataFromDbAuthors();
        if (!this.state.intervalIsSet) {
            let interval = setInterval(this.getDataFromDbAuthors, 1000);
            this.setState({ intervalIsSet: interval });
        }
    }

    componentWillUnmount() {
        if (this.state.intervalIsSet) {
            clearInterval(this.state.intervalIsSet);
            this.setState({ intervalIsSet: null });
        }
    }

    getDataFromDbAuthors = () => {
        fetch('http://localhost:3001/api/getAuthorsData')
            .then((data) => data.json())
            .then((res) => this.setState({ dataAuthors: res.data }));
    };

    render() {
        const { dataAuthors } = this.state;
        return <div className={'authors'}>
            <div className={'container'}>
                <h1>{`Авторы`}</h1>
                <hr/>
                {dataAuthors.length <= 0
                    ? 'Нет данных'
                    : dataAuthors.map((dat) => (
                        <AuthorShelf
                            id={dat._id}
                            name={dat.authorName}
                            birthYear={dat.authorBirthYear}
                            deathYear={dat.authorDeathYear}
                            img={dat.authorImg}
                            resume={dat.authorResume}
                        />
                    ))
                }
            </div>
        </div>;
    }
}

export default Authors;
