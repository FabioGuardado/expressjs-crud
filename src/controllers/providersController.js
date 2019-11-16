const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM providers', (err, rows) => {
            if(err){res.json(err);}
            res.render('providers', {
                data: rows
            });
        });
    });
};
controller.save = (req, res) => {
    var provider_name = req.body.name;
    var phone = req.body.phone;
    var email = req.body.email;
    var location = req.body.location;

    var data = {
        provider_name: provider_name,
        provider_phone: phone,
        provider_email: email,
        provider_location: location
    };
    console.log(data);
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO providers SET ?', data, (err, result) => {
            if(err){console.log('Error en la consulta INSERT');}
            res.redirect('/providers');
        });
    });
};

controller.edit = (req, res) => {
    const id = req.params.id;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM providers WHERE id = ?', [id], (err, provider) => {
            console.log(provider);
            res.render('providers_edit', {
                data: provider[0]
            });
        });
    });
};

controller.update = (req, res) => {
    const id = req.params.id;
    var provider_name = req.body.name;
    var phone = req.body.phone;
    var email = req.body.email;
    var location = req.body.location;

    var data = {
        provider_name: provider_name,
        provider_phone: phone,
        provider_email: email,
        provider_location: location
    };
    req.getConnection((err, conn) => {
        conn.query('UPDATE providers set ? WHERE id = ?', [data, id], (err, result) =>{
            res.redirect('/providers');
        });
    });
};

controller.delete = (req, res) => {
    const id = req.params.id;
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM providers WHERE id = ?', [id], (err, rows) => {
            if(err){
                console.log(err);
            }
            res.redirect('/providers');
        });
    });
};

module.exports = controller;