import xml2js from 'xml2js';


class ConvertController {
    static  uploadFile(req, res, next){

        const {file} = req;

        xml2js.parseString(file.buffer, {explicitArray: true, mergeAttrs: true}, (err, result)=> {
            if(err){
                throw err
            }
            const writejsn = JSON.stringify(result);
            const data = writejsn.replace(/<[^><]*>/g, '')
            const x = JSON.parse(data);
            const dj =  x.question_categories_customized.question_category[5].questions[0].question

            return res.send(dj.map( (item, index) => (index+1+ ' ' + item.questiontext_noun_customized + 'Answer: '+ item.plugin_qtype_shortanswer_question[0].answers[0].answer[0].answertext  ) ))

            // try {
            //     const writeJson = fs.writeFileSync('xml.json', data);
            //     const writeTxt = fs.writeFileSync('xml.txt',jsn.question_categories_customized.question_category[5].questions[0].question.map( (item, index) => (index+1+ ' ' +item.questiontext_noun_customized+'\n' + 'Answer: '+ item.plugin_qtype_shortanswer_question[0].answers[0].answer[0].answertext + '\n') ))

            //     return res.json({
            //         data: jsn.question_categories_customized.question_category[5].questions[0].question
            //     })

            // } catch (err) {
            //     throw err
            // }
        
            // fs.writeFile('xml.json', data, (err, result) => {
            //     if(err){
            //         throw err
            //     }
                                
            //     fs.writeFile('xml.txt',jsn.question_categories_customized.question_category[5].questions.map( (item, index) => (index+1 +' Role: '+item+'\n') ), (err, result) => {
            //         if(err){
            //             throw err;
            //         }
            //         return res.json({
            //             data: jsn
            //         })
            //     })
            //     console.log('Good')

                // return res.json({
                //     data: result
                // })

               //const jsn = require('../xml.json')
             
           // })
//  jsn.question_categories_customized.question_category
        })
        

        //console.log(x);

       // console.log(file.buffer)

    }
}

export default ConvertController;

