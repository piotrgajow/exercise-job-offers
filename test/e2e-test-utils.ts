import * as mysql from 'mysql';

const connectionConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'job_offers',
    dateStrings: true,
};

export async function executeSql(sql: string): Promise<void> {
    const connection = await mysql.createConnection(connectionConfig);
    connection.query(sql);
}
