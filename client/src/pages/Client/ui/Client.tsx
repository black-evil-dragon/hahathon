import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from '@stores';
import Button from '@shared/ui/Button';
import '../styles/Client.scss'



interface ClientProps {
    
}


const Client: React.FunctionComponent<ClientProps> = () => {
    const navigate = useNavigate();
    
    return (<>
        <div className="home client-page">
            <div className="home__wrapper client-page__wrapper">
                <div className="home__title client-page__title">
                    Доставка воды по Инноватинску 🚰
                </div>

                <div className="client-page__text">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni debitis repudiandae cumque quae. Vitae, perferendis quia dolore sequi temporibus sit ut nihil minima, provident omnis ullam modi quidem? Repudiandae, facilis.
                </div>

                <Button {...{
                    className: "--dark",
                    callback: () => navigate('/client/order/create')
                }}>Заказать</Button>
            </div>
        </div>
    </>);
}
 
export default Client;