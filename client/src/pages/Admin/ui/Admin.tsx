import { Map } from "@widgets/Map";
import { OrderList } from "@widgets/OrderList";

interface AdminProps {

}

const Admin: React.FunctionComponent<AdminProps> = () => {
    return (
        <>
            <div className="admin-page">

                <div className="admin-page__wrapper">
                    <div className="admin-page__element">
                        <OrderList />
                    </div>

                    <div className="admin-page__element">
                        <Map />
                    </div>
                </div>
            </div>
        
        </>
    );
}

export default Admin;