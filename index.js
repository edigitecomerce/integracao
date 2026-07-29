const { app } = require('./config');
const $ = require('jquery');

app.get('/api/payload', async (req, res, next) => {
    try {
        // Faz uma requisição para o seu servidor PHP rodando em outro endereço/porta
        const response = $.get('https://edigitecomerce.free.nf/encarte-modelo-estab-fisico/admin/model/api/api.php?pg=get_pagamento');

        // 2. Check if the HTTP status code is ok (200-299)
       

        res.status(200).json(response);
    } catch (erro) {
        res.status(500).json({ sucesso: false, erro: erro.message });
    }

});
/*
app.get('/get', async (req, res, next) => {

    try {
        const options = {
            method: 'GET',
            headers: { Authorization: 'Bearer b261e38c-4874-48ad-b20c-5d68baaaa3d6cfe4ea8d4ab1a67cf0c54c8e989f3e4232d0-66a8-4866-bda4-9bb8727221f0', accept: 'application/json' }
        };
        fetch('https://sandbox.api.pagseguro.com/checkouts/CHEC_884BC58A-C371-4715-9C92-66977AD0FC36', options)
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.error(err));
    } catch (err) {
        next(err);
    }
});*/

app.post('/api/paguebank/', async (req, res, next) => {
    try {
        // res.json(req.body)
        const options = {
            method: 'POST',
            mode: 'no-cors',
            origin: '*',
            headers: {

                accept: '*/*',
                Authorization: 'Bearer b261e38c-4874-48ad-b20c-5d68baaaa3d6cfe4ea8d4ab1a67cf0c54c8e989f3e4232d0-66a8-4866-bda4-9bb8727221f0',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(req.body)
        };
        //Produtção: https://api.pagseguro.com/ 
        fetch('https://sandbox.api.pagseguro.com/checkouts', options)
            .then(res => res.json())
            .then(json => {
                res.status(200).json(json)
            })
    } catch (err) {
        next(err)
    }
})
app.listen(8080, () => {

    console.log('Connectado 8080')

});