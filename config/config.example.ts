const config = {
    api: {
        name: process.env.API_NAME ?? 'Template',
        port: Number(process.env.API_PORT) ?? 3000,
        version: Number(process.env.API_VERSION) ?? 1.0
    },
    database: {
        host: process.env.MYSQL_HOST ?? 'value',
        user: process.env.MYSQL_USER ?? 'value',
        password: process.env.MYSQL_PASS ?? 'value',
        name: process.env.MYSQL_DB ?? 'value',
    }
}

export default config;