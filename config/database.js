module.exports = {
    database: 'mongodb://root:abcd1234@ds159293.mlab.com:59293/e-commerce',
    facebook: {
        clientId: '2183124928595833',
        clientSecret: '1411b82fd8a1546cbc76fcc0058c7d11',
        clientToken: 'fe70762d04e5663de4ae02c13645bff5',
        profileFields: ['emails', 'displayName'],
        callbackURL: 'http://localhost:3000/auth/facebook/callback'
    }
}