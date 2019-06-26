module.exports = (error, result, res, logger) => {
    if (error) {
        logger.error(error);
        console.log(error);
        res.status(500).send('Sorry, but something happend on our server!');
    } else {
        res.setHeader('Content-Type', 'application/json');
        res.send(result);
        logger.info('Succesfully sent', result);
    }
};