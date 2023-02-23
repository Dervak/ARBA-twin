const apiAuth = (handler) => {
    return (req, res) => {
        const apiKey = req.headers['x-api-key'];

        if (apiKey !== process.env.API_KEY) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        return handler(req, res);
    };
}

export default apiAuth