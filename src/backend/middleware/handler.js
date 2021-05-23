module.exports = {
    handler404: ((req, res) => {
        console.log(req)
        res.status(201).send('page not found');

        }
    )
}
