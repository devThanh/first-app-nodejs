const Course = require('../models/Course');
const {mongooseToObject} = require('../../util/mongoose');

class CourseController{

//[GET] /courses/slug
    async show(req, res, next){
        
        await Course.findOne( {slug: req.params.slug })
            .then(course => {
                res.render('courses/show', {course: mongooseToObject(course)})
            })
            .catch(next)

    }

//[GET] /courses/create
    create(req, res, next){
        
       res.render('courses/create')
    }
    

    //[POST] /courses/store
    store(req, res, next){
        const formData =  req.body;
        formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const course = new Course(formData);
        course.save()
            .then(() =>res.redirect('/'))
            .catch(error=>{

            })

     }


     //[GET]/courses/:id/edit
     edit(req, res, next){
        Course.findById(req.params.id)
            .then(courses =>res.render('courses/edit', {
                courses: mongooseToObject(courses)
            }))
            .catch(next)
        
     }


     //[PUT]/courses/:id
     update(req, res, next){
        Course.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)
     }



     //[DELETE]/courses/:id
     delete(req, res, next){
        Course.delete({_id: req.params.id})
            .then(() =>res.redirect('back'))
            .catch(next)
     }


     //[PATCH]/courses/:id/restore
     restore(req, res, next){
        Course.restore({_id: req.params.id})
            .then(() =>res.redirect('back'))
            .catch(next)
     }


     //[PATCH]/courses/:id/force
     forceDelete(req, res, next){
        Course.deleteOne({_id: req.params.id})
            .then(() =>res.redirect('back'))
            .catch(next)
     }






}

module.exports = new CourseController();