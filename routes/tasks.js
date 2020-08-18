const express = require('express');
const Task = require('../models/tasks');
const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        let obj = {};
        key = Object.keys(req.body);
        value = Object.values(req.body);
        obj.key = key[0]; obj.value = value[0];
        req.body.timestamp == "" ? obj.timestamp = undefined : obj.timestamp = 1597699017;
        const task = new Task(obj);
        await task.save();
        res.status(200).json(task);
    } catch (e) {
        next(e);
    }
}
);

router.get('/:key', (req, res, next) => {
    try {
        Task.find({ key: req.params.key }, (err, data) => {
            if (err) return next(err);
            let result = data.filter(elem => elem.timestamp !== undefined);
            console.log(result)
            if (req.query.timestamp) {
                result = data.filter(elem => elem.timestamp === parseInt(req.query.timestamp))
                if (result.length === 0) {
                    result = data.filter(elem => elem.timestamp === undefined)
                }
                res.status(200).send({ value: result[0].value });
            } else {
                res.status(200).send({ value: result[0].value });
            }
        })
    } catch (error) {
        next(error)
    }
})

router.delete('/', (req, res, next) => {
    try {
        Task.remove(() => res.send("all data removed"))
    } catch (error) {
        next(error)
    }
})

module.exports = router;