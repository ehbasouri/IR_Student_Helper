import mongoose from "mongoose";

interface Conn {
    client: any;
    db: any;
}

let conn: Conn = {
    client: null,
    db: null
}

function connect (url: string, done: any) {
    if (mongoose.connection.readyState > 0) return done('data base is working ...')
    if (conn.db) return done();

    mongoose.connection
        .on('error', function (err) {
            console.log(err.message, err.stack, 'can not connect to database server');
            process.exit(-1);
        })
        .on('disconnected', () => setTimeout(connect, 3000))
        .once('open', function () {
            conn.db = process.env.DB_NAME
            console.log('Successfully connected to mongoDB');
            done();
        });
    mongoose
        .connect(url)
}

function isConnect (url: string, done: any): boolean {
    return mongoose.connection.readyState > 0
}

function close (done: any) {
    if (conn.db) {
        mongoose.connection.close()
            .then(res => {
                conn.db = null
                done()
            }).catch(err => {
                done(err)
            })
    } else {
        done()
    }
}

const DB =  {
    connect,
    close,
    isConnect
}

export default DB;
