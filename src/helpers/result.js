const ServerError = (res, error) =>  res.status(500).json({ ok: false, msg: 'Error de servidor - Comunicarse con soporte', error });

const NewData = (res, msg, data, token) => res.status(201).json({ ok: true, msg: msg, data, token });

const ResultwithData = (res, msg = '', data) =>  res.status(200).json({ ok: true, msg: msg, data: data });

const ResultOnly = (res, msg = '') => res.status(200).json({ ok: true, msg: msg });

const DataError = (res, msg) => res.status(400).json({ ok: false, msg: msg });

module.exports = {
    ServerError,
    NewData,
    DataError,
    ResultwithData,
    ResultOnly
}