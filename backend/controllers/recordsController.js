const { Records } = require('../models/models')

const create = async (req, res, next) => {
    try {
        let { status, record_when, description } = req.body

        if (!record_when || !description) {
            return res.json({ message: 'Заповніть обов`язкові поля' })
        }

        const record = await Records.create({ status, record_when, description, userId: req.userId })
        const user = req.userId

        return res.json({ record, user })

    } catch (error) {
        return res.json({ message: 'Невідома помилка' })
    }
}

const getAll = async (req, res, next) => {
    try {
        let records;

        if (req.user.role === "ADMIN") {
            records = await Records.findAll();
        } else {
            records = await Records.findAll({ where: { userId: req.userId } });
        }

        if (!records) {
            return res.json({ message: 'Поки що немає записів' });
        }

        return res.json(records);
    } catch (error) {
        return res.json({ message: 'Невідома помилка' });
    }
}

const getOne = async (req, res, next) => {
    try {
        const { id } = req.params
        const record = await Records.findOne({ where: { id } })

        if (!record) {
            return res.json({ message: 'Такого запису немає' })
        }

        return res.json(record)

    } catch (error) {
        return res.json({ message: 'Невідома помилка' })
    }
}

const edit = async (req, res, next) => {
    try {
        const { status } = req.body;
        const { id } = req.params;
        const record = await Records.findByPk(id);

        if (!record) {
            return res.json({ message: 'Запись не найдена' });
        }

        if (status === "") {
            record.status = null;
        } else {
            record.status = status;
        }

        await record.save();

        return res.json(record);
    } catch (error) {
        return res.json({ message: 'Неведомая ошибка' });
    }
}


const remove = async (req, res, next) => {
    try {
        const { id } = req.params

        const record = await Records.findByPk(id)

        if (!record) {
            return res.json({ message: 'Запис не найден' })
        }

        await record.destroy()

        return res.json({ message: 'Запис успешно удален' })

    } catch (error) {
        return res.json({ message: 'Невідома помилка' })
    }
}

module.exports = {
    create,
    getAll,
    getOne,
    edit,
    remove
}