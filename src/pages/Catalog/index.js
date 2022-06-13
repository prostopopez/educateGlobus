import React from 'react';
import BookShelf from '../../components/BookShelf';
import './style.css';
import '../../style/main.css';

class CatalogPage extends React.Component {
    constructor() {
        super();

        this.state = {
            dataBooks: [],
            dataAuthors: [],
            dataGenres: [],
            dataCollections: [],
            intervalIsSet: false,
        };
    }

    componentDidMount() {
        let datas = [
            this.getDataFromDbBooks,
            this.getDataFromDbAuthors,
            this.getDataFromDbGenres,
            this.getDataFromDbCollections
        ];

        for (let i = 0; i < datas.length; i++) {
            datas[i]();

            if (!this.state.intervalIsSet) {
                let interval = setInterval(datas[i](), 1000);
                this.setState({intervalIsSet: interval});
            }
        }
    }

    componentWillUnmount() {
        if (this.state.intervalIsSet) {
            clearInterval(this.state.intervalIsSet);
            this.setState({ intervalIsSet: null });
        }
    }

    getDataFromDbBooks = () => {
        fetch('http://localhost:3001/api/getBooksData')
            .then((data) => data.json())
            .then((res) => this.setState({ dataBooks: res.data }));
    };

    getDataFromDbAuthors = () => {
        fetch('http://localhost:3001/api/getAuthorsData')
            .then((data) => data.json())
            .then((res) => this.setState({ dataAuthors: res.data }));
    };

    getDataFromDbGenres = () => {
        fetch('http://localhost:3001/api/getGenresData')
            .then((data) => data.json())
            .then((res) => this.setState({ dataGenres: res.data }));
    };

    getDataFromDbCollections = () => {
        fetch('http://localhost:3001/api/getCollectionsData')
            .then((data) => data.json())
            .then((res) => this.setState({ dataCollections: res.data }));
    };

    render() {
        const { dataBooks, dataAuthors, dataGenres, dataCollections } = this.state;

        return <div className={'catalog'}>
            <div className={'container'}>
                <h1>{`Каталог`}</h1>
                <hr/>
                {dataBooks.length <= 0
                    ? 'Нет данных'
                    : dataBooks.map((dataBook) => {
                        const bookAuthor = dataAuthors.map((dataAuthor) => {
                            if (dataAuthor.books_id.includes(dataBook._id)){
                                return dataAuthor.authorName;
                            }
                        });

                        const bookCollection = dataCollections.map((dataCollection) => {
                            if (dataCollection.books_id.includes(dataBook._id)){
                                return dataCollection.collectionName;
                            }
                        });

                        const bookGenre = (dataGenres.map((dataGenre) => {
                            if (dataGenre.books_id.includes(dataBook._id)){
                                return dataGenre.genreName;
                            }
                        }));

                        return <BookShelf
                            name={dataBook.bookName}
                            price={dataBook.bookPrice}
                            genres={bookGenre}
                            author={bookAuthor}
                            collection={bookCollection}
                            publisher={dataBook.bookPublisher}
                            date={dataBook.bookPubDate}
                            rank={dataBook.bookRating}
                            img={dataBook.bookImg}
                            description={dataBook.bookDescription}
                        />;
                    })
                }
            </div>
        </div>

    }
}

export default CatalogPage;
