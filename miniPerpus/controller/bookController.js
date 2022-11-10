const { Book, Profile } = require('../models')
// console.log(User);
class Controller{
    static readBook(req, res){
        const filter = req.query.filter
        let option = {
            include: Profile
        }

        if (filter) {
            option.where = {level :Book.getBookbyLevel(filter)}
        }
        // Book.getBookbyLevel(filter)
        Book.findAll(option)
        .then((data) => {
            // res.send(data)
            res.render('book', { data })
        })
        .catch((err) => {
            res.send(err)
        })
    }
    static addBookGet(err, res){
        Profile.findAll()
        .then((data) => {
            res.render('addBook', { data })
        })
        .catch((err) => {
            res.send(err)
        })
    }
    static addBookPost(req, res){
        const{ title, level, description, code, publishYear, profileId } = req.body
        Book.create({ title, level, description, code, publishYear, profileId })
        .then((data) => {
            res.redirect('/book')
        })
        .catch((err) => {
            res.send(err)
            console.log(err);
        })
    }
    static detailBook(req, res){
        const id = req.params.id
        Book.findByPk(id, {
            attributes: ['title','description']
        })
        .then((data) => {
            res.render('detailBook', { data })
        })
        .catch((err) => {
            res.send(err)
            console.log(err);
        })
    }
    static renderEditBook(req, res){
        let id = +req.params.id
        Book.findOne({where: {id: id}, include: Profile})
        .then((data) => {
            // res.send(data)
            res.render('editBook', {data})
        })
        .catch((err) => {
            res.send(err)
        })
    }
    static handleEditBook(req, res){
        let id = +req.params.id
        // console.log(req.body)
        let {title, level, publishYear, description} = req.body
        Book.update({title, level, publishYear, description}, {where: {id: id}})
        .then((data) => {
            res.redirect('/book')
        })
        .catch((err) => {
            res.send(err)
        })
    }
    static deleteBook(req, res){
        const id = req.params.id
        Book.destroy({
            where: {id: id}
        })
        .then((_) => {
            res.redirect('/book')
        })
        .catch((err) => {
            res.send(err)
        })
    }
}

module.exports = Controller