import xml2js from 'xml2js';
import Utility from '../utility/Utility';
import Convert from '../models/convert';


class ConvertController {
    static  uploadFile(req, res, next){

        const {file} = req;

        if(!file){
            const err = {
                statusCode: 400,
                message: 'Please Select a file'
            }
            return Utility.appError(err, next);
        }else{
            xml2js.parseString(file.buffer, {explicitArray: true, mergeAttrs: true}, (err, result)=> {
                if(err){
                    return Utility.appError(err);
                }
                const writejsn = JSON.stringify(result);
                const data = writejsn.replace(/<[^><]*>/g, '')
                const x = JSON.parse(data);
                
                try {
                    const dj =  x.question_categories_customized.question_category[5].questions[0].question;

                    try {
                        const file_Content_testA = dj.map( (item, index) => (  index+1+ ' ' + item.questiontext_noun_customized + ' ' + 'Answer: '+ item.plugin_qtype_shortanswer_question[0].answers[0].answer[0].answertext  ) ) ;

                        const saveNewFile = new Convert({
                            file_name: 'ped',
                            creator: req.userId,
                            file_content: [...file_Content_testA]
                        })
            
                        return saveNewFile.save().then( result => {
                            return res.status(200).json(result)
                        }).catch( err => {
                            return Utility.appError(err, next)
                        })

                        
                    } catch (error) {
                        const file_Content_testAB= dj.map( (item, index) => (  index+1+ ' ' + item.questiontext_noun_customized + 'Answer: '+ item.plugin_qtype_multichoice_question[0].answers[0].answer[0].answertext  ) ) ;

                        const saveNewFile = new Convert({
                            file_name: 'ped',
                            creator: req.userId,
                            file_content: [...file_Content_testAB]
                        })
            
                        return saveNewFile.save().then( result => {
                            return res.status(200).json(result)
                        }).catch( err => {
                            return Utility.appError(err, next)
                        })
                    }

                    // const file_Content_testA = dj.map( (item, index) => (  index+1+ ' ' + item.questiontext_noun_customized + 'Answer: '+ item.plugin_qtype_shortanswer_question[0].answers[0].answer[0].answertext  ) ) || null;

                    // const file_Content_testAB= dj.map( (item, index) => (  index+1+ ' ' + item.questiontext_noun_customized + 'Answer: '+ item.plugin_qtype_multichoice_question[0].answers[0].answer[0].answertext  ) ) || null;

                    // let originalFileCOntent;

                    // console.log(originalFileCOntent)
                    // if (file_Content_testA) {
                    //     //console.log(file_Content_testA)
                    //     originalFileCOntent = file_Content_testA
                    // }else {
                    //     originalFileCOntent = file_Content_testAB
                    // }
    
                    // const saveNewFile = new Convert({
                    //     file_name: 'ped',
                    //     creator: req.userId,
                    //     file_content: [...originalFileCOntent]
                    // })
        
                    // return saveNewFile.save().then( result => {
                    //     return res.status(200).json(result)
                    // }).catch( err => {
                    //     return Utility.appError(err, next)
                    // })


                 } catch (error) {
                     //console.log(error)
                    error.message = 'XML Trained Pattern Not Recognized'
                    return Utility.appError(error, next);
                    //return res.json( x.question_categories_customized.question_category[5].questions[0].question )
                }
                
            })
        }
        

        //console.log(x);

       // console.log(file.buffer)

    }

    static getContent(req, res, next){
        const {fileId} = req.params;

        Convert.findById(fileId).then( result => {
            return res.status(200).json({
                data: result.file_content
            })
        }).catch( err => {
            return Utility.appError(err, next)
        });

    }

    static listFiles(req, res, next){
        const {userId} = req;

        Convert.find({creator: userId}).select(['_id', 'file_name', 'convert_date']).then(result => {
            return res.status(200).json({
                data: result
            })
        }).catch(err => {
            return Utility.appError(err, next)
        })
    }
}

export default ConvertController;

