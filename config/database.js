const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_STRING,

        // New version of mongoose don't need these properties anymore
    //      {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   useFindAndModify: false,
    //   useCreateIndex: true
    // })

    console.log(`MongoDB Connected: ${conn.connection.host}`))
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

// exporting our function so we can call it on server.js and let it execute and establish the db connection
module.exports = connectDB