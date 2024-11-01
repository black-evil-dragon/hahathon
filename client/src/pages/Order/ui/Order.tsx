import React from "react";
import { useParams } from "react-router-dom";

import { NoPage } from "@pages/404";
import { OrderCreate } from "@widgets/OrderCreate";
import { OrderList } from "@widgets/OrderList";


interface OrderProps {

}

const Order: React.FunctionComponent<OrderProps> = () => {
    let { orderAction } = useParams();

    const [orderView, setOrderView] = React.useState('')


    React.useEffect(() => {
        orderAction && setOrderView(orderAction)
    }, [orderAction])

    
    return (
        orderView === 'create' ? <OrderCreate /> :
        orderView === 'list' ? <OrderList /> :
        <NoPage />
        
    );
}

export default Order;