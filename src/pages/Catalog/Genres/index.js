import React from 'react';
import './style.css';
import '../../../style/main.css';
import GenreShelf from '../../../components/GenreShelf';

class Genres extends React.Component {
    constructor() {
        super();

        this.state = {
            dataGenres: [],
            intervalIsSet: false,
            idToDelete: null,
            idToUpdate: null,
            objectToUpdate: null,
        };
    }

    componentDidMount() {
        this.getDataFromDbGenres();
        if (!this.state.intervalIsSet) {
            let interval = setInterval(this.getDataFromDbGenres, 1000);
            this.setState({ intervalIsSet: interval });
        }
    }

    componentWillUnmount() {
        if (this.state.intervalIsSet) {
            clearInterval(this.state.intervalIsSet);
            this.setState({ intervalIsSet: null });
        }
    }

    getDataFromDbGenres = () => {
        fetch('http://localhost:3001/api/getGenresData')
            .then((data) => data.json())
            .then((res) => this.setState({ dataGenres: res.data }));
    };

    render() {
        const { dataGenres } = this.state;

        return <div className={'genres'}>
            <div className={'container'}>
                <h1>{`Жанры`}</h1>
                <hr/>
                {dataGenres.length <= 0
                    ? 'Нет данных'
                    : dataGenres.map((dat) => {

                        let bookGenre = [];
                        let mainGenre = [];
                        let miniGenre = [];

                        bookGenre.push(dataGenres.map(dataGenre => {
                            return dataGenre.genreName;
                        }));

                        for(let i = 0; i < dataGenres.length; i++) {
                            if(i === 0 || (i > 0 && bookGenre[0][i][0] !== bookGenre[0][i-1][0])) {
                                mainGenre.push(bookGenre[0][i][0]);
                            }
                        }

                        for(let i = 0; i < dataGenres.length; i++) {
                            miniGenre.push(bookGenre[0][i][1]);
                        }

                        console.log(mainGenre);

                        return <GenreShelf
                            id={dat._id}
                            mainGenre={mainGenre}
                            miniGenre={miniGenre}
                            description={dat.genreDescription}
                        />
                    })
                }
            </div>
        </div>;
    }
}

export default Genres;
