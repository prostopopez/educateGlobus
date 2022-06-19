import React from 'react';
import ReactStars from 'react-stars/dist/react-stars';
import style from './style.css';
import '../../style/main.css';

const TestItem = (props) => {
    const {
        id,
        difficulty,
        name,
        questions,
        time,
        img
    } = props;

    return <div className={'test-item'}>
        <p className={'important small test-item__name'}>{name}</p>
        <div className="test-item__img">
            <img src={img} alt=""/>
        </div>
        <div className="test-item__text">
            <p className={'item'}>Сложность</p>
            <ReactStars
                edit={false}
                size={46}
                count={5}
                value={difficulty}
                color1={'black'}
                className={'stars'}
            />
            <div className={'test-item__text__element'}>
                <span className={'item'}>Вопросов</span>
                <span className={'item'}>{questions.length}</span>
            </div>
            <div className={'test-item__text__element'}>
                <span className={'item'}>Время</span>
                <span className={'item'}>{time}</span>
            </div>
            <a href={`/tests/test:${id}`} className={'button big red test-item__text__goTo'}>Пройти тест</a>
        </div>
    </div>;
};

export default TestItem;
