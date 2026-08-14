const { app } = require('./config');

app.post('/api/paguebank/consultar/', (req, res, next) => {

    try {
        var data = req.body;
        const { id_checkout, token } = data;
        const options = {
            method: 'GET',
            origin: '*',

            headers: { Authorization: `Bearer ${token}`, 'Content-type': 'application/json' }
        };

        fetch(`https://sandbox.api.pagseguro.com/checkouts/${id_checkout}`, options)
        .then(res => res.json())
        .then(json => {
            res.json(json);

        })
        .catch(err => console.error(err));

    } catch (err) {
        next(err);
    }

})

app.post('/api/paguebank/', (req, res, next) => {
    try {
        var data = req.body;

        const options = {
            method: 'POST',
            mode: 'no-cors',
            origin: '*',
            headers: {

                accept: '*/*',
                Authorization: `Bearer ${data.token}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
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
});

app.post('/api/paguebank/inativar/', (req, res, next) => {

    const data = req.body;
    var link_inativar = data.link;
    var token = data.token;

    try {
        const options = {
            method: 'POST',
            headers: {

                accept: '*/*',
                Authorization: `Bearer ${data.token}`,
                'Content-type': 'application/json'
            }
        };

        fetch(link_inativar, options)
            .then(res => res.json())
            .then(element =>
                res.json(element)
            )
            .catch(err => res.json(err));

    } catch (err) {
        next(err)
    }
})


app.listen(8080, () => {

    console.log('Connectado 8080')

});