const Stats = () => {
    return (
        <div className="stats-container">
            <h2>Statistics</h2>
            <div className="iframe-container">
                <iframe
                    title="MongoDB Charts"
                    width="1240"
                    height="680"
                    src="https://charts.mongodb.com/charts-project-0-hkdfn/embed/charts?id=65b6a882-6c68-4dfd-8999-d4afc9b6084e&maxDataAge=300&theme=light&autoRefresh=true"
                    style={{
                        background: '#FFFFFF',
                        border: 'none',
                        borderRadius: '2px',
                        boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
                    }}
                    frameBorder="0"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
};

export default Stats;
