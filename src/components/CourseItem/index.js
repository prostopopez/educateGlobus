import React from 'react';
import ReactStars from 'react-stars/dist/react-stars';
import './style.css';
import '../../style/main.css';
import axios from "axios";

class CourseItem extends React.Component {
    constructor() {
        super();

        this.state = {
            users: [],
            intervalIsSet: false
        };
    }

    componentDidMount() {
        let datas = [
            this.getDataFromDbUsers
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

    getDataFromDbUsers = () => {
        fetch('http://localhost:3001/api/getUserData')
            .then((data) => data.json())
            .then((res) => this.setState({users: res.data}));
    };

    addCourseToUsers = (course_id, currentUser) => {
        let objIdToUpdate = null;
        parseInt(currentUser);
        this.state.users.forEach((dat) => {
            if (dat.username == currentUser) {
                objIdToUpdate = dat._id;
            }
        });

        axios.post('http://localhost:3001/api/updateUserData', {
            _id: objIdToUpdate,
            update: {$push: {courses_id: [course_id]}},
        });

        window.location.reload();
    };

    render() {
        const {
            id,
            author,
            name,
            topics,
            time,
            level,
            description,
            rating,
            img,
            price,
            currentUser
        } = this.props;

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
                    <button className={'button rounded small red'} onClick={() => {
                        this.addCourseToUsers(
                            id,
                            currentUser
                        )
                    }}>В корзину
                    </button>
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
}

export default CourseItem;
