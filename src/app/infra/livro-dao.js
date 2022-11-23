class LivroDao {

    constructor(db) {
        this._db = db;
    }

    adiciona(livro) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                INSERT INTO LIVROS (
                    titulo,
                    preco,
                    descricao
                ) values (?, ?, ?)
                `, 
                [
                    livro.titulo,
                    livro.preco,
                    livro.descricao
                ],
                function (err) {
                    if (err) {
                        console.log(err);
                        return reject('Não foi possível adicionar o livro!');
                    }
    
                    resolve();
                } 
            )
        });
    }

    atualiza(livro) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                UPDATE LIVROS SET                 
                titulo = ?,
                preco = ?,
                descricao = ?
                WHERE id = ?
                `, 
                [
                    livro.titulo,
                    livro.preco,
                    livro.descricao,
                    livro.id
                ],
                function (err) {
                    if (err) {
                        console.log(err);
                        return reject('Não foi possível atualizar o livro!');
                    }
    
                    resolve();
                } 
            )
        });
    }

    remove(id) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                DELETE FROM LIVROS
                WHERE id = ?
                `, 
                [id],
                function (err) {
                    if (err) {
                        console.log(err);
                        return reject('Não foi possível deletar o livro!');
                    }
    
                    resolve();
                } 
            )
        });
    }

    lista() {
        return new Promise((resolve, reject) => {
            this._db.all(
                'SELECT * FROM livros',
                (erro, resultados) => {
                    if (erro) return reject('Não foi possível listar os livros!');

                    return resolve(resultados);
                }
            );
        });

    }

    buscaPorId(id) {
        return new Promise((resolve, reject) => {
            this._db.get(
                'SELECT * FROM livros WHERE id = ?',
                [id],
                (erro, livro) => {
                    if (erro) return reject('Não foi possível buscar o livro!');

                    return resolve(livro);
                }
            );
        });

    }
}

module.exports = LivroDao;