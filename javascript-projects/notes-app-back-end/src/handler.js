const notes = require('./notes');
const {nanoid} = require('nanoid');

const addNoteHandler = (request, h) => {
    const {title, tags, body} = request.payload; 
    const id = nanoid(14);
    const createdAt = new Date().toISOString();
    const updateAt = createdAt;

    const newNote = {
        title, tags, body, id, createdAt, updateAt,
    }

    notes.push(newNote);

    const note = notes.filter((note)=> note.id === id)
    const isSuccess = note.length > 0;

    if (isSuccess) {
        const response = h.response({
            status : 'success',
            message : 'Catatan berhasil di tambahkan',
            data : {
                noteId : id
            }
        })
        response.code(201);
        return response;
    }

    const response = h.response({
        status : 'fail',
        message : 'Catatan gagal di tambahkan',
    })
    response.code(500);
    return response;
}

const getNoteHandler = () => ({
    status : 'success',
    data : {
        notes,
    }
})

const getNoteByIdHandler = (request, h) => {
    const {id} = request.params;

        const note = notes.filter((n) => n.id===id)[0]

        if (note !== undefined) {
            return {
                status : 'success',
                data : {
                    note
                }
            }
        }

        const response = h.response({
            status : 'fail',
            message : 'catatan tidak di temukan'
        })
        response.code(404)
        return response;
}

const editNoteByIdHandler = (request, h) => {
    const {id} = request.params;
    const {title, tag, body} = request.payload;
    const updateAt = new Date().toISOString();

    const index = notes.findIndex((note) => note.id === id);
    if (index !== -1){
        notes[index] = {
            ...notes[index],
            title,
            tag,
            body,
            updateAt,
        }
        const response = h.response({
            status : 'success',
            message : 'catatan berhasil diperbarui',
        })
        response.code(200)
        return response;
    }

    const response = h.response({
        status : 'fail',
        massage : 'gagal memperbarui catatan, id tidak di temukan',
    })
    response.code(400);
    return response;
}

const deleteNoteByIdHandler = (request, h) => {
    const {id} = request.params;

    const index = notes.findIndex((note) => note.id === id)
    
    if (index !== -1) {
        notes.splice(index, 1);

        const response = h.response({
            status : 'success',
            message : 'catatan berhasil di hapus',
        })
        response.code(200);
        return response;
    }

    const response = h.response({
        status : 'fail',
        message : 'catatan gagal dihapus, id tidak ditemukan',
    })
    response.code(404);
    return response;
}

module.exports = {addNoteHandler, getNoteHandler,  getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler};