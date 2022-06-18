import React from 'react';
import ReactStars from 'react-stars/dist/react-stars';
import './style.css';
import '../../style/main.css';

const BookShelf = (props) => {
    const {
        author,
        name,
        topics,
        time,
        level,
        description,
        rating,
        img,
        price
    } = props;

    return <div className={'course-card'}>
        <div className={'course-card__left'}>
            <ReactStars
                edit={false}
                count={5}
                value={rating}
                color1={'black'}
                className={'stars'}
            />
            <img
                src={img}
                alt=""/>
            <span className={'important'}>{price} &#8381;</span>
        </div>
        <div className={'course-card__right'}>
            <p className={'important'}>{name}</p>
            <a className={'important link simple'} href={`/`}>{author}</a>
            <div className={'course-card__right__buttons'}>
                <button className={'button rounded small red'}>В корзину</button>
                <a href={'/courses'} className={'button rounded small green'}>Подробнее</a>
            </div>
            <div className={'course-card__right__topics'}>
                {topics.length <= 0
                    ? <div className={'button rounded small blue'}>Специальность не указана</div>
                    : topics.map((topic) => {
                        return <div className={'tag rounded small blue'}>{topic}</div>
                    })
                }
            </div>
            <div className={'course-card__right__params'}>
                <div className={'tag rounded small black'}>{time}</div>
                <div className={'tag rounded small black'}>{level} уровень</div>
            </div>
            <p className={'small course-card__right__description'}>{description}</p>
        </div>
    </div>;
};

export default BookShelf;
