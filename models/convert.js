import {Schema, model} from 'mongoose';

const convertSchema = Schema({
    file_name: {
        type: String,
        required: true
    },
    file_content: {
        type: Array,
        required: true
    }, 
    convert_date : {
        type: Date,
        default: Date.now()
    },
    creator : {
        type:Schema.Types.ObjectId,
        ref: 'auth'
    },
});

export default model('convert', convertSchema);