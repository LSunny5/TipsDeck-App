import React from 'react';
import './NotFoundPage.css';

//Any urls that do not match the routes will be redirected to this component
class NotFoundPage extends React.Component {
    render() {
        return (
            <section className="notFound">
                <h1 className="notFoundTitle">Page Not Found!</h1>
                <p className="notFoundError">Sorry the page you are looking for is not here, please check the URL</p>
            </section>
        );
    }
}

export default NotFoundPage;
