export const info = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Ecommerce Coderhouse',
            version: '1.0.0',
            description: 'Used technologies: Node, Express, MongoDB'
        },
        servers: [
            {
                url: 'http://localhost:8080'
            }
        ]
    },
    apis: ['./src/docs/*.yml']
}