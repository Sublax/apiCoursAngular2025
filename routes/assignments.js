let Assignment = require('../model/assignment');

// Récupérer tous les assignments (GET)
function getAssignments(req, res){
    var aggregateQuery = Assignment.aggregate()
    Assignment.aggregatePaginate(
        aggregateQuery,
        {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 10,
        },
        (err,assigments) => {
            if(err){
                res.send(err);
            }
            res.send(assigments)
        }
    );
}

// Récupérer un assignment par son id (GET)
function getAssignment(req, res){
    let assignmentId = req.params.id;

    Assignment.findOne({id: assignmentId}, (err, assignment) =>{
        if(err){res.send(err)}
        res.json(assignment);
    })
}

// Ajout d'un assignment (POST)
function postAssignment(req, res){
    let assignment = new Assignment();
    assignment.id = req.body.id;
    assignment.nom = req.body.nom;
    assignment.dateDeRendu = req.body.dateDeRendu;
    assignment.rendu = req.body.rendu;

    console.log("POST assignment reçu :");
    console.log(assignment)

    assignment.save( (err) => {
        if(err){
            res.send('cant post assignment ', err);
        }
        res.json({ message: `${assignment.nom} saved!`})
    })
}

// Update d'un assignment (PUT)
function updateAssignment(req, res) {
    console.log("UPDATE reçu pour l'assignment ID : ", req.body.id);

    // REMPLACEMENT : on utilise findOneAndUpdate avec { id: ... }
    // req.body contient tout l'objet (nom, date, rendu: true, id: 3...)
    Assignment.findOneAndUpdate(
        { id: req.body.id }, // On cherche par l'ID personnalisé
        req.body,            // On remplace par les nouvelles données
        { new: true },       // On veut récupérer l'objet mis à jour
        (err, assignment) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }
            if (!assignment) {
                return res.status(404).send({message: "Assignment non trouvé"});
            }
            res.json({message: 'updated'});
        }
    );
}

// suppression d'un assignment (DELETE)
function deleteAssignment(req, res) {
    // au lieu de findByIdAndRemove(...) on utilise findOneAndDelete({ id: ... })  pour éviter le _id de Mongo
    Assignment.findOneAndDelete({ id: req.params.id }, (err, assignment) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (!assignment) {
            return res.status(404).send({ message: "Assignment introuvable" });
        }
        res.json({ message: `${assignment.nom} deleted` });
    });
}



module.exports = { getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment };
