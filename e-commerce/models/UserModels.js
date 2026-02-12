import{Schema,model} from 'mongoose';

// Cart item schema (embedded in user document)
const cartSchema = new Schema({
    product:{
        type:Schema.Types.ObjectId,
        ref:"product",
        required: true
    },
    quantity:{
        type:Number,
        default:1,
        min:1
    }
},
{ _id: false  // Cart items don't need their own _id
});

// User schema definition
const userSchema=new Schema({
    userName:{
        type:String,
        required:[true,"name is required"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    cart:{
        type:[cartSchema],
        default:[]  // Initialize with empty cart
    }
},
{
    timestamps: true,  // Adds createdAt and updatedAt
    versionKey: false
}
);

// Export User model
export const UserModel=model("user",userSchema);