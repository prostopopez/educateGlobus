import React from 'react';
import { getCoords } from '../../services/locationService';
import '../../style/main.css';
import './style.css';

class DeliveryPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            location: null
        };
    }

    async componentDidMount() {
        this.setState({
            location: await getCoords()
        });

        this.translit();
    }

    translit() {
        let str = document.getElementsByClassName('locationName')[0].innerHTML;
        let link = '';
        let transl = {
            'a': 'а', 'b': 'б', 'v': 'в', 'w': 'в', 'g': 'г', 'd': 'д', 'e': 'е',
            'z': 'з', 'i': 'и', 'j': 'й', 'k': 'к', 'l': 'л', 'm': 'м', 'n': 'н',
            'o': 'о', 'p': 'п', 'r': 'р','s': 'с', 't': 'т', 'u': 'у', 'f': 'ф', 'h': 'x',
            'c': 'к', '`': 'ь',
            'y': 'ы', ' ': ' '
        };

        if (str !== '') {
            str = str.toLowerCase();
        }

        for (let i = 0; i < str.length; i++){
            if (/[a-z]/.test(str.charAt(i))){
                switch (str.charAt(i)+str.charAt(i+1)) {
                    case('ya'):
                        link += 'я';
                        i = i + 1;
                        break;
                    case('yu'):
                        link += 'ю';
                        i = i + 1;
                        break;
                    case('sh'):
                        link += 'ш';
                        i = i + 1;
                        break;
                    case('ch'):
                        link += 'ч';
                        i = i + 1;
                        break;
                    case('zh'):
                        link += 'ж';
                        i = i + 1;
                        break;
                    case('st'):
                        link += 'санкт';
                        i = i + 1;
                        break;
                    case('rs'):
                        link += 'р';
                        i = i + 1;
                        break;
                    default:
                        link += transl[str.charAt(i)];
                        break;
                }

                if (str.charAt(i)+str.charAt(i+1)+str.charAt(i+2)+str.charAt(i+3) === 'scow') {
                        link += 'ква';
                        i = i + 3;
                }
            } else if (/[а-яё0-9\s]/.test(str.charAt(i))){
                link += str.charAt(i);
            }
        }
        document.getElementsByClassName('locationName')[0].innerHTML = link;
    }

    convertDate(date, delay) {
        let dd = date.getDate() + delay;
        if (dd < 10) dd = '0' + dd;

        let mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;

        let yy = date.getFullYear() % 100;
        if (yy < 10) yy = '0' + yy;

        return dd + '.' + mm + '.' + yy;
    }

    render() {
        const { location } = this.state;

        return <div className={'delivery'}>
            <div className={'container'}>
                <h1>{`Доставка`}</h1>
                <hr/>
                <div className={'deliveryWrapper'}>
                    <div className={'deliveryRules'}>
                        <p>Доставка осуществляется только на территории РФ.</p>
                        <p>Ваш населённый пункт - г.
                            <strong className={'locationName'}>
                                {location === null
                                    ? null
                                    : location.city
                                }
                            </strong>.
                        </p>
                        <p>Если стоимость заказа превышает <strong>1200 рублей</strong>, доставка
                            - <strong>бесплатно.</strong></p>
                        <div className={'deliveryTable'}>
                            <table>
                                <thead>
                                <tr>
                                    <th>Тип доставки</th>
                                    <th>Стоимость</th>
                                    <th>Дата доставки</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Курьерская служба "Labrioteka"</td>
                                    <td>350 руб.</td>
                                    <td>{
                                        this.convertDate(new Date(), 1)
                                    }</td>
                                </tr>
                                <tr>
                                    <td>Курьерская служба "Boxberry"</td>
                                    <td>215 руб.</td>
                                    <td>{
                                        this.convertDate(new Date(), 6)
                                    }</td>
                                </tr>
                                <tr>
                                    <td>Курьерская служба "Dimex"</td>
                                    <td>300 руб.</td>
                                    <td>{
                                        this.convertDate(new Date(), 3)
                                    }</td>
                                </tr>
                                <tr>
                                    <td>Курьерская служба "DHL"</td>
                                    <td>295 руб.</td>
                                    <td>{
                                        this.convertDate(new Date(), 3)
                                    }</td>
                                </tr>
                                <tr>
                                    <td>Почта России</td>
                                    <td>200 руб.</td>
                                    <td>{
                                        this.convertDate(new Date(), 10)
                                    }</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className={'selfDelivery'}>
                        { location === null
                            ? null
                            : <iframe
                                title={'seldDeliveryMap'}
                                src={`https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d38231.252215262844!2d${location.longitude}!3d${location.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1z0L_Rg9C90LrRgtGLINCy0YvQtNCw0YfQuCDQv9C-0YHRi9C70L7Qug!5e0!3m2!1sru!2sru!4v1591533615804!5m2!1sru!2sru`}
                                width={'600'}
                                height={'450'}
                                frameBorder={'0'}
                                allowFullScreen={''}
                                aria-hidden={'false'}
                                tabIndex={'0'}
                            />
                        }
                    </div>
                </div>
            </div>
        </div>;
    }
}

export default DeliveryPage;
