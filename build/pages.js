module.exports = {
    pages: [
        {
            name: 'index',
            entry: './src/library.js',
            filename: 'index.html',
            template: 'index.html',            
            chunks: ['vendor','app'],      
        }

    ]    
}