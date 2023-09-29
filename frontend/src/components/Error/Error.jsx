import './Error.scss'

const Error = () => {
    return (
        <section className='error'>
            <div className="container">
                <div className="error__content">
                    <h1 className='error__title'>Lost your way?</h1>
                    <p className='error__descr'>Sorry, we can't find that page. You'll find lots to explore on the home page.</p>
                    <a href="/" className='error__btn'>Home</a>
                </div>
            </div>
        </section>
    );
};

export default Error;