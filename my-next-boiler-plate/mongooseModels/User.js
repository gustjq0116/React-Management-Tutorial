import mongoose from 'mongoose'

/* PetSchema will correspond to a collection in your MongoDB database. */
const UserSchema = new mongoose.Schema({
  name: {
    /* The name of this pet */

    type: String,
    maxlength: [20, 'Name cannot be more than 60 characters'],
  },
  email: {
    /* The owner of this pet */

    type: String,
    required: [true, "Please provide the pet owner's name"],
    maxlength: [40, "Owner's Name cannot be more than 60 characters"],
  },
  password: {
      type: String,
      required: [true, "Please provide the pet owner's name"],
  }
})

export default mongoose.models.User || mongoose.model('User', UserSchema)