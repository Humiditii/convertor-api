import {Schema, model} from 'mongoose';

const convertSchema = Schema({
    file_name: {
        type: String,
        required: true
    },
    file_dir: {
        type: String,
        required: true
    }, 
    convert_date : {
        type: Date,
        default: Date.now()
    }
});

export default model('convert', convertSchema);