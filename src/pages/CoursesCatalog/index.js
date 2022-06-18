import React from 'react';
import './style.css';
import '../../style/main.css';
import CourseItem from "../../components/CourseItem";

class CoursesCatalog extends React.Component {
    constructor() {
        super();

        this.state = {
            courses: [],
            intervalIsSet: false,
        };
    }

    componentDidMount() {
        let datas = [
            this.getDataFromDbCourses
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

    getDataFromDbCourses = () => {
        fetch('http://localhost:3001/api/getCoursesData')
            .then((data) => data.json())
            .then((res) => this.setState({courses: res.data}));
    };

    render() {
        const {courses} = this.state;

        const {
            currentUser
        } = this.props;

        return <div className={'courses-catalog'}>
            <div className={'container'}>
                <h1>Каталог курсов</h1>
                <hr/>
                <div className="courses-catalog__grid">
                    {courses.length <= 0
                        ? 'Нет данных'
                        : courses.map((item) =>
                            <CourseItem
                                id={item._id}
                                author={item.author}
                                name={item.name}
                                topics={item.topics}
                                time={item.time}
                                level={item.level}
                                description={item.description}
                                rating={item.rating}
                                img={item.img}
                                price={item.price}
                                currentUser={currentUser}
                            />
                        )
                    }
                </div>
            </div>
        </div>

    }
}

export default CoursesCatalog;
