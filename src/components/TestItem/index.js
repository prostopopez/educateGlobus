import React from 'react';
import classnames from 'classnames';
import ReactStars from 'react-stars/dist/react-stars';
import style from './style.css';
import '../../style/main.css';

const TestItem = (props) => {
    const {
        difficulty,
        name,
        questions,
        time,
        img
    } = props;

    return <div className={'test-item'}>
        <p className={'important small test-item__name'}>{name}</p>
        <div className="test-item__img">
            <img src={img} alt="" />
        </div>
        <div className="test-item__text">
            <ReactStars
                edit={false}
                size={46}
                count={5}
                value={difficulty}
                color1={'black'}
                className={'stars'}
            />
            <div className={'test-item__text__element'}>
                <span>Вопросов</span>
                <span>{questions.length}</span>
            </div>
            <div className={'test-item__text__element'}>
                <span>Время</span>
                <span>{time}</span>
            </div>
            <div className={'test-item__text__goTo'}>
                <a href={'/'}>Пройти тест</a>
            </div>
        </div>
    </div>;
};

export default TestItem;
