const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM categories', (err, rows) => {
            if(err){res.json(err);}
            res.render('categories', {
                data: rows
            });
        });
    });
};
controller.save = (req, res) => {
    var category_name = req.body.name;

    var data = {
        category_name: category_name
    };
    console.log(data);
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO categories SET ?', data, (err, result) => {
            if(err){console.log('Error en la consulta INSERT');}
            res.redirect('/categories');
        });
    });
};

controller.edit = (req, res) => {
    const id = req.params.id;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM categories WHERE id = ?', [id], (err, category) => {
            console.log(category);
            res.render('categories_edit', {
                data: category[0]
            });
        });
    });
};

controller.update = (req, res) => {
    const id = req.params.id;
    var category_name = req.body.name;

    var data = {
        category_name: category_name
    };
    req.getConnection((err, conn) => {
        conn.query('UPDATE categories set ? WHERE id = ?', [data, id], (err, result) =>{
            res.redirect('/categories');
        });
    });
};

controller.delete = (req, res) => {
    const id = req.params.id;
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM categories WHERE id = ?', [id], (err, rows) => {
            if(err){
                console.log(err);
            }
            res.redirect('/categories');
        });
    });
};

module.exports = controller;