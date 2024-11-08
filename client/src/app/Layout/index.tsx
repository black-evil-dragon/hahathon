
import { Outlet } from 'react-router-dom';

import Header from '@app/components/Header';

function Layout() {
    return (
        <>
            {/* App header component */}
            <header className="app-header">
                <Header
                    parent={{
                        className:'app-header'
                    }}
                />
            </header>

            {/* App content */}
            <main className="app-body">
                <Outlet />
            </main>

            {/* App footer component */}
            <footer className="app-footer">

            </footer>
        </>
    );
}


export default Layout;