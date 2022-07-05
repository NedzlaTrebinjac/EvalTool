const { request, response} = require('express');
const { db } = require('../utils/admin');

exports.getAllTodos = (request, response) => {
	db
        .collection('try')
		.get()
		.then((data) => {
			let todos = [];
			data.forEach((doc) => {
				todos.push({
                    tryId: doc.id,
                    description: doc.data().description,
					level: doc.data().level,
				});
			});
			return response.json(todos);
		})
		.catch((err) => {
			console.error(err);
			return response.status(500).json({ error: err.code});
		});
};

// create knowledge feedback
exports.postKnowledgeEval = (request, response) => {
    if (request.body.knowledge.trim() === '') {
        return response.status(400).json({ knowledge: 'Must not be empty'});
    }

    const newKnowledgeEval = {
        knowledge: request.body.knowledge
    }
    db 
       .collection('Evaluation')
       .add(newKnowledgeEval)
       .then((doc) => {
        const responseKnowledgeEval = newKnowledgeEval;
        responseKnowledgeEval.id = doc.id;
        return response.json(responseKnowledgeEval);
       })
       .catch((err) => {
        console.error(err);
        return response.status(500).json({ error: 'Something went wrong' });
       });
};

// create entrepreneurship feedback
exports.postEntreEval = (request, response) => {
    if(request.body.entrepreneurship.trim() === ''){
        return response.status(400).json({ entrepreneurship: 'Must not be emtpy' });
    }

    const newEntreEval = {
        entrepreneurship: request.body.entrepreneurship
    }
    db
       .collection('Evaluation')
       .add(newEntreEval)
       .then((doc) => {
        const responseEntreEval = newEntreEval;
        responseEntreEval.id = doc.id;
        return response.json(responseEntreEval);
       })
       .catch((err) => {
        console.error(err);
        return response.status(500).json({ error: 'Something went wrong'});
       });
};

// create business sense feedback
exports.postBSEval = (request,response) => {
    if(request.body.businessSense.trim() === '') {
        return response.status(400).json({ businessSense: 'Must not be empty'});
    }

    const newBSEval = {
        businessSense: request.body.businessSense
    }
    db
      .collection('Evaluation')
      .add(newBSEval)
      .then((doc) => {
        const responseBSEval = newBSEval;
        responseBSEval.id = doc.id;
        return response.json(responseBSEval);
      })
      .catch((err) => {
        console.error(err);
        return response.status(500).json({ error: 'Something went wrong'});
      });
};

/*
exports.postOneTodo = (request, response) => {
    if (request.body.description.trim() === '') {
        return response.status(400).json({ description: 'Must not be empty' });
    }

    if(request.body.level.trim() === '') {
        return response.status(400).json({ level: 'Must not be empty' });
    }

    const newTodoItem = {
        level: request.body.level,
        description: request.body.description
    }
    db
        .collection('try')
        .add(newTodoItem)
        .then((doc) => {
            const responseTodoItem = newTodoItem;
            responseTodoItem.id = doc.id;
            return response.json(responseTodoItem);
        })
        .catch((err) => {
            response.status(500).json({error: 'Something went wrong' });
            console.error(err);
        });
};

exports.deleteTodo = (request, response) => {
    const document = db.doc(`/try/${request.params.todoId}`);
    document
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return response.status(404).json({ 
                    error: 'Todo not found' 
            })}
            return document.delete();
        })
        .then(() => {
            response.json({ message: 'Delete successfull' });
        })
        .catch((err) => {
            console.error(err);
            return response.status(500).json({ 
                error: err.code 
            });
        });
};

exports.editTodo = (request, response) => {
    if(request.body.todoId) {
        response.status(403).json({ message: 'Not allowed to edit'});
    }
    let document = db.collection('try').doc(`${request.params.todoId}`);
    document.update(request.body)
    .then(() => {
        response.json({message: 'Updated successfully'});
    })
    .catch((err) => {
        console.error(err);
        return response.status(500).json({error: err.code});
    });
}; */