'use strict'

const { MongoClient } = require('mongodb');

const API = {
    db: {
        db_url: 'mongodb://127.0.0.1:27017',
        db_name: 'test'
    }
};

class Db {
    dbClient = null;
    dbUrl;
    dbName;
    static getInstance(dbUrl, dbName) {
        if (!Db.instance) {
            Db.instance = new Db(dbUrl, dbName);
        }
        return Db.instance;
    }

    constructor(dbUrl, dbName) {
        this.dbUrl = dbUrl;
        this.dbName = dbName;
        this.connect();
    }

    connect() {
        return new Promise((resolve, reject) => {
            if (this.dbClient) {
                resolve(this.dbClient);
                return;
            }
            MongoClient.connect(this.dbUrl, {useUnifiedTopology: true}, (err, connectedClient) => {
                if (err) {
                    reject(err);
                    return;
                }
                this.dbClient = connectedClient.db(this.dbName);
                resolve(this.dbClient);
                return;
            });
        });
    }

    find(tablename, json) {
        return new Promise((resolve, reject) => {
            this.connect()
                .then(db => {
                    const result = db.collection(tablename).find(json);
                    result.toArray((err, data) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve(data);
                        return;
                    });
                })
                .catch(err => {
                    reject(err);
                    return;
                });
        });
    }

    findOne(tablename, json) {
        return new Promise((resolve, reject) => {
            this.connect()
                .then(db => {
                    db.collection(tablename).findOne(json, (err, data) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve(data);
                        return;
                    });
                })
                .catch(err => {
                    reject(err);
                    return;
                });
        });
    }

    deleteOne(tablename, json) {
        return new Promise((resolve, reject) => {
            this.connect()
                .then(db => {
                    db.collection(tablename).deleteOne(json, (err, data) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve(data);
                        return;
                    });
                })
                .catch(err => {
                    reject(err);
                    return;
                });
        });
    }

    insertOne(tablename, json) {
        return new Promise((resolve, reject) => {
            this.connect()
                .then(db => {
                    db.collection(tablename).insertOne(json, (err, data) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve(data);
                        return;
                    });
                })
                .catch(err => {
                    reject(err);
                    return;
                });
        });
    }

    updateOne(tablename, qjson, json) {
        return new Promise((resolve, reject) => {
            this.connect()
                .then(db => {
                    db.collection(tablename).updateOne(qjson, json, (err, data) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve(data);
                        return;
                    });
                })
                .catch(err => {
                    reject(err);
                    return;
                });
        });
    }
}

module.exports = Db.getInstance(API.db.db_url, API.db.db_name);
