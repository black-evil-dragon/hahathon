import React from 'react';
import { useSelector } from "react-redux";

import { RootState } from "@stores";
import { Link } from 'react-router-dom';

function Header(props: {
    parent: {
        className: string,
    }
}) {

    const userType = useSelector((state: RootState) => state.user.userType);


    
    return (
    <>
        <div className={`${props.parent.className}__content`}>
            {userType === 'client' || true ? <>
                <div className={`${props.parent.className}__item`}>
                    <Link to={'/client/order/create'}>Создать заказ</Link>
                </div>
                <div className={`${props.parent.className}__item`}>
                    <Link to={'/client/order/list'}>Посмотреть список заказов</Link>
                </div>

            </> : <>
                
            </> }
        </div>
    </>
    );
}

export default Header;