import fs from 'fs';
import xml2js from 'xml2js';
import jsn from '../xml.json';


class ConvertController {
    static  uploadFile(req, res, next){

        const {file} = req;

        xml2js.parseString(file.buffer, (err, result)=> {
            if(err){
                throw err
            }
            const writejsn = JSON.stringify(result);
        
            fs.writeFileSync('xml.json', writejsn, (err, result) => {
                if(err){
                    throw err
                }
                console.log('Good')

               //const jsn = require('../xml.json')
             
            })

               
            fs.writeFile('xml.txt',jsn.user.roles[0].role.map( (item, index) => (index+1 +' Role: '+item+'\n' +' name: '+jsn.user.name+'\n') ), (err, result) => {
                if(err){
                    throw err;
                }
                console.log('good')
            })
        })
        

        //console.log(x);

       // console.log(file.buffer)

    }
}

export default ConvertController;

