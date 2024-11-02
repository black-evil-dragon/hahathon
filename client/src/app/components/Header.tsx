import React from 'react';
import { useSelector } from "react-redux";

import { RootState } from "@stores";
import { Link, useLocation } from 'react-router-dom';

function Header(props: {
    parent: {
        className: string,
    }
}) {
    const location = useLocation();
    const userType = useSelector((state: RootState) => state.user.userType);
    const [view, setView] = React.useState('')

    // Криво
    React.useEffect(() => {
        if (location.pathname.includes('client')) {
            setView('client')
        } else if (location.pathname.includes('admin')) {
            setView('admin')
        }
    }, [location])


    
    return (
    <>
        <div className={`${props.parent.className}__content`}>
            <div className={`${props.parent.className}__item`}>
                <Link to={'/'}>Главная</Link>
            </div>
            {userType === 'client' || view === 'client' ? <>
                <div className={`${props.parent.className}__item`}>
                    <Link to={'/client/order/create'}>Создать заказ</Link>
                </div>
                <div className={`${props.parent.className}__item`}>
                    <Link to={'/client/order/list'}>Посмотреть список заказов</Link>
                </div>

                </> : (userType === 'admin' || view === 'admin') && <>
                    <div className={`${props.parent.className}__item`}>
                        <Link to={'/admin/'}>Панель администратора</Link>
                    </div>
                </>
            }
        </div>
    </>
    );
}

export default Header;