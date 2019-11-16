const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM products', (err, rows) => {
            if(err){res.json(err);}
            res.render('products', {
                data: rows
            });
        });
    });
};
controller.save = (req, res) => {
    var username = req.body.name;
    var category = parseInt(req.body.Category);
    var provider = parseInt(req.body.Provider);
    var price = parseFloat(req.body.price);
    var stock = parseInt(req.body.stock);

    var data = {
        name: username,
        category_id: category,
        provider_id: provider,
        price: price,
        stock: stock
    };
    console.log(data);
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO products SET ?', data, (err, result) => {
            if(err){console.log('Error en la consulta INSERT');}
            res.redirect('/products');
        });
    });
};

controller.edit = (req, res) => {
    const id = req.params.id;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM products WHERE id = ?', [id], (err, product) => {
            console.log(product);
            res.render('products_edit', {
                data: product[0]
            });
        });
    });
};

controller.update = (req, res) => {
    const id = req.params.id;
    var username = req.body.name;
    var category = parseInt(req.body.Category);
    var provider = parseInt(req.body.Provider);
    var price = parseFloat(req.body.price);
    var stock = parseInt(req.body.stock);

    var data = {
        name: username,
        category_id: category,
        provider_id: provider,
        price: price,
        stock: stock
    };
    req.getConnection((err, conn) => {
        conn.query('UPDATE products set ? WHERE id = ?', [data, id], (err, result) =>{
            res.redirect('/products');
        });
    });
};

controller.delete = (req, res) => {
    const id = req.params.id;
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM products WHERE id = ?', [id], (err, rows) => {
            if(err){
                console.log(err);
            }
            res.redirect('/products');
        });
    });
};

module.exports = controller;