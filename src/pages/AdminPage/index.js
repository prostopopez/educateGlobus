import React from 'react';
import './style.css';
import '../../style/main.css';
import axios from 'axios';
import mongoose from 'mongoose';
import srs from 'secure-random-string';
import classnames from 'classnames/bind';
import style from "../../components/Header/style.css";
import styleMain from "../../style/main.css";

const cn = classnames.bind(style, styleMain);

class AdminPage extends React.Component {
    constructor() {
        super();

        this.state = {
            dataBooks: [],
            dataAuthors: [],
            dataGenres: [],
            dataCollections: [],
            book_id: null,
            bookName: null,
            bookPrice: null,
            authorName: null,
            genreName: null,
            collectionName: null,
            bookPublisher: null,
            bookPubDate: null,
            bookImg: null,
            bookDescription: null,
            intervalIsSet: false,
            isAddingBook: false,
            isEditingBook: false,
            isDeletingBook: false
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

    putDataToDbBooks = (
        book_id,
        bookName,
        bookPrice,
        authorName,
        genreName,
        collectionName,
        bookPublisher,
        bookPubDate,
        bookImg,
        bookDescription
    ) => {

        axios.post('http://localhost:3001/api/putBooksData', {
            _id: book_id,
            bookName: bookName,
            bookPrice: bookPrice,
            bookPublisher: bookPublisher,
            bookPubDate:  bookPubDate,
            bookImg: bookImg,
            bookDescription: bookDescription
        });
    };

    updateDbAuthor = (book_id, authorName) => {
        let objIdToUpdate = null;
        parseInt(authorName);
        this.state.dataAuthors.forEach((dat) => {
            if (dat.authorName == authorName) {
                objIdToUpdate = dat._id;
            }
        });

        axios.post('http://localhost:3001/api/updateAuthorsData', {
            _id: objIdToUpdate,
            update: { books_id: [book_id] },
        });
    };

    render() {
        const {
            dataAuthors,
            dataGenres,
            dataCollections,
            isAddingBook,
            isEditingBook,
            isDeletingBook
        } = this.state;

        return <div className={'admin'}>
            <div className={'container'}>
                <h1>{`Админ Панель`}</h1>
                <hr/>
                <div className={cn('bookBlock', { isAddingBook, isEditingBook, isDeletingBook })}>
                    <form>
                        <input type={'text'} onChange={(e) => this.setState({ book_id: new mongoose.Types.ObjectId(), bookName: e.target.value })} placeholder={'Название:'} required={true}/>
                        <input type={'number'} onChange={(e) => this.setState({ bookPrice: e.target.value })} placeholder={'Цена:'} required={true}/>
                        {console.log(this.state.book_id)}
                        <label>
                            Автор:
                            <select value={this.state.value} onChange={(e) => this.setState({ genreName: e.target.value })}>
                                {dataAuthors.map(author => {
                                        return <option value={author.authorName}>{author.authorName}</option>
                                    }
                                )}
                            </select>
                        </label>
                        <label>
                            Жанр:
                            <select value={this.state.value} onChange={(e) => this.setState({ genreName: e.target.value })}>
                                {dataGenres.map(genre => {
                                        return <option value={genre.genreName}>{genre.genreName}</option>
                                    }
                                )}
                            </select>
                        </label>
                        <label>
                            Коллекция:
                            <select value={this.state.value} onChange={(e) => this.setState({ genreName: e.target.value })}>
                                {dataCollections.map(collection => {
                                        return <option value={collection.collectionName}>{collection.collectionName}</option>
                                    }
                                )}
                            </select>
                        </label>
                        <input type={'text'} onChange={(e) => this.setState({ bookPublisher: e.target.value })} placeholder={'Издательство:'} required={true}/>
                        <input type={'number'} onChange={(e) => this.setState({ bookPubDate: e.target.value })} placeholder={'Год издания:'} required={true}/>
                        <input type={'text'} onChange={(e) => this.setState({ bookImg: e.target.value })} placeholder={'Обложка:'} required={true}/>
                        <input type={'text'} onChange={(e) => this.setState({ bookDescription: e.target.value })} placeholder={'Описание:'} required={true}/>
                        <button onClick={() => {
                            this.putDataToDbBooks(
                                this.state.book_id,
                                this.state.bookName,
                                this.state.bookPrice,
                                this.state.authorName,
                                this.state.genreName,
                                this.state.collectionName,
                                this.state.bookPublisher,
                                this.state.bookPubDate,
                                this.state.bookImg,
                                this.state.bookDescription
                            ); this.updateDbAuthor (
                                this.state.book_id,
                                this.state.authorName
                            )
                        }}>Добавить книгу</button>
                    </form>
                    <button>Вернуться к выбору</button>
                </div>
            </div>
        </div>

    }
}

export default AdminPage;
