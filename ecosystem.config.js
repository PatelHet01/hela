module.exports = {
    apps: [
        {
            name: 'hela-api',
            script: 'src/server.js',
            instances: 'max', // Utilize all available CPU cores
            exec_mode: 'cluster', // Enables load balancing across instances
            env: {
                NODE_ENV: 'development',
            },
            env_production: {
                NODE_ENV: 'production',
                PORT: 3000
            },
            log_date_format: 'YYYY-MM-DD HH:mm Z',
            error_file: 'logs/err.log',
            out_file: 'logs/out.log',
            merge_logs: true,
            wait_ready: true,
            listen_timeout: 10000,
            kill_timeout: 5000
        }
    ]
};
