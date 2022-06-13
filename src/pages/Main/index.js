import React from 'react';
import classnames from 'classnames';
import WatchesItem from '../../components/WatchesItem';
import GalleryItem from '../../components/GalleryItem';
import '../../style/main.css';
import style from './style.css';
import {ReactSVG} from "react-svg";

const cn = classnames.bind(style);

class MainPage extends React.Component {
    constructor() {
        super();

        this.state = {
            watches: [],
            courses: [],
            tests: [],
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
            this.setState({intervalIsSet: null});
        }
    }

    getDataFromDbBooks = () => {
        fetch('http://localhost:3001/api/getBooksData')
            .then((data) => data.json())
            .then((res) => this.setState({dataBooks: res.data}));
    };

    getDataFromDbAuthors = () => {
        fetch('http://localhost:3001/api/getAuthorsData')
            .then((data) => data.json())
            .then((res) => this.setState({dataAuthors: res.data}));
    };

    getDataFromDbGenres = () => {
        fetch('http://localhost:3001/api/getGenresData')
            .then((data) => data.json())
            .then((res) => this.setState({dataGenres: res.data}));
    };

    getDataFromDbCollections = () => {
        fetch('http://localhost:3001/api/getCollectionsData')
            .then((data) => data.json())
            .then((res) => this.setState({dataCollections: res.data}));
    };

    render() {
        const {watches} = this.state;

        return <div className={'mainPage'}>
            <div className={cn('cont', 'aboutUs')}>
                <h1>keepTime</h1>
                <p>С часами мы сталкиваемся практически везде: на улице, на работе, дома.</p>
                <p>Сложно представить нашу жизнь, если бы не были придуманы, часы.</p>
                <blockquote>“Ни твоя одежда, ни твой почерк, ни твое любимое телешоу не скажут о тебе так много, как
                    твои часы”
                </blockquote>
                <div className={'forButtons'}>
                    <div className={cn('link', 'whiteLink')}>
                        <a>Узнать больше</a>
                    </div>
                    <div className={cn('link', 'redLink')}>
                        <a>Посмотреть коллекцию</a>
                    </div>
                </div>
            </div>
            <div className={'watchesBack'}>
                <img src="../img/watchesBack.png" alt=""/>
            </div>
            <div className={cn('cont', 'hits')}>
                <h2>Лучшее</h2>
                <p className={'subHeading'}>Товары с наивысшим рейтингом за 2020 год</p>
                <hr/>
                <div className="hitGrid">
                    {watches.length <= 0
                        ? 'Нет данных'
                        : watches.map((item) => {
                            if (item.rating >= 4.9) {
                                return <WatchesItem
                                    name={item.name}
                                    brand={item.brand}
                                    material={item.material}
                                    glass={item.glass}
                                    mechanism={item.mechanism}
                                    coating={item.coating}
                                    price={item.price}
                                    rating={item.rating}
                                    img={item.img}
                                />;
                            }
                        })
                    }
                </div>
            </div>
            <div className={cn('cont', 'gallery')}>
                <h2>Галерея</h2>
                <p className={'subHeading'}>Практичность, стиль, качество</p>
                <hr/>
                <div className="galleryGrid">
                    {watches.length <= 0
                        ? 'Нет данных'
                        : watches.map((item) => <GalleryItem
                                name={item.name}
                                brand={item.brand}
                                material={item.material}
                                glass={item.glass}
                                mechanism={item.mechanism}
                                coating={item.coating}
                                price={item.price}
                                rating={item.rating}
                                img={item.img}
                            />
                        )}
                </div>
                <div className={cn('link', 'blackLink')}>
                    <a>Хочу больше</a>
                </div>
            </div>
            <div className={cn('cont', 'contacts')}>
                <h2>Контакты</h2>
                <div className="soc">
                    <ReactSVG
                        src="../img/ContactsLogos/tgLogo.svg"
                        className={cn('socLogo', 'tgLogo')}
                    />
                    <ReactSVG
                        src="../img/ContactsLogos/vkLogo.svg"
                        className={cn('socLogo', 'vkLogo')}
                    />
                    <ReactSVG
                        src="../img/ContactsLogos/ytLogo.svg"
                        className={cn('socLogo', 'ytLogo')}
                    />
                </div>
            </div>
        </div>;
    }
}

export default MainPage;

