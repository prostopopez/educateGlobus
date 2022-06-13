import React from 'react';
import classnames from 'classnames';
import ReactStars from 'react-stars/dist/react-stars';
import style from './style.css';
import '../../style/main.css';

const cn = classnames.bind(style);

const WatchesItem = (props) => {
    const {
        name,
        brand,
        material,
        glass,
        mechanism,
        coating,
        price,
        rating,
        img,
    } = props;

    const isOverName = name.length >= 30;
    const isOverBrand = brand.length >= 18;
    const isOverMaterial = material.length >= 18;
    const isOverGlass = glass.length >= 18;
    const isOverMechanism = mechanism.length >= 18;
    const isOverCoating = coating.length >= 18;

    return <div className={'watchesItem'}>
        <div className="imgWatch">
            <img src={img} alt="" />
        </div>
        <div className="textWatch">
            <ReactStars
                edit={false}
                size={46}
                count={5}
                value={rating}
                color1={'black'}
                className={'stars'}
            />
            <span className={'nameWatch'}>
                    {isOverName
                        ? `${name.substring(0, 30)}...`
                        : name
                    }
            </span>
            <div className={'elementWatch'}>
                <span>
                    Бренд
                </span>
                <span>
                     {isOverBrand
                         ? `${brand.substring(0, 18)}...`
                         : brand
                     }
                </span>
            </div>
            <div className={'elementWatch'}>
                <span>
                    Материал
                </span>
                <span>
                   {isOverMaterial
                       ? `${material.substring(0, 18)}...`
                       : material
                   }
                </span>
            </div>
            <div className={'elementWatch'}>
                <span>
                    Стекло
                </span>
                <span>
                   {isOverGlass
                       ? `${glass.substring(0, 18)}...`
                       : glass
                   }
                </span>
            </div>
            <div className={'elementWatch'}>
                <span>
                    Механизм
                </span>
                <span>
                    {isOverMechanism
                        ? `${mechanism.substring(0, 18)}...`
                        : mechanism
                    }
                </span>
            </div>
            <div className={'elementWatch'}>
                <span>
                    Покрытие
                </span>
                <span>
                    {isOverCoating
                        ? `${coating.substring(0, 18)}...`
                        : coating
                    }
                </span>
            </div>
            <div className={cn('link', 'redLink', 'priceWatch')}>
                <a>{price} &#8381;</a>
            </div>
        </div>
    </div>;
};

export default WatchesItem;
