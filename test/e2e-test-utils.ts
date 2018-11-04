import * as mysql from 'mysql';

const connectionConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'job_offers',
    dateStrings: true,
};

export function executeSql(sql: string): Promise<any> {
    return new Promise((resolve, reject) => {
        const queryCallback = (err, res) => err ? reject(err) : resolve(res);
        const connection = mysql.createConnection(connectionConfig);
        connection.query(sql, queryCallback);
    });
}
