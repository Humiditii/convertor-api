import xml2js from 'xml2js';
import Utility from '../utility/Utility';
import Convert from '../models/convert';


class ConvertController {
    static  uploadFile(req, res, next){

        const {file} = req;

        console.log(file)

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
    
                    const saveNewFile = new Convert({
                        file_name: 'PED',
                        creator: req.userId,
                        file_content: [...dj.map( (item, index) => (index+1+ ' ' + item.questiontext_noun_customized + 'Answer: '+ item.plugin_qtype_shortanswer_question[0].answers[0].answer[0].answertext  ) )]
                    })
        
                    return saveNewFile.save().then( result => {
                        return res.status(200).json(result)
                    }).catch( err => {
                        return Utility.appError(err, next)
                    })
                } catch (error) {
                    error.message = 'XML Trained Pattern Not Recognized'
                    return Utility.appError(error, next);
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

