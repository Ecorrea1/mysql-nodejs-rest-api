const ServerError = (res, error) => {
    return res.status(500).json({ ok: false, msg: 'Error de servidor - Comunicarse con soporte', error });
}

const NewData = (res, msg, data ) => {
    return res.status(201).json({ ok: true, msg: msg, data: data ?? [] });
}

const ResultwithData = (res, msg = '', data) => {
    return res.status(200).json({ ok: true, msg: msg, data: data ?? [] });
}

const ResultwithDataPagination = (res, msg = '', data, page, total, next, prev) => {
    return res.status(200).json({ ok: true, msg, data, page, total, next, prev});
}

const ResultOnly = (res, msg = '') => {
    return res.status(200).json({ ok: true, msg: msg });
}

const DataError = (res, msg) => {
    return res.status(400).json({ ok: false, msg: msg });
}

module.exports = {
    ServerError,
    NewData,
    DataError,
    ResultwithData,
    ResultwithDataPagination,
    ResultOnly
}