const {app} = require('./server');
const {mongoose} = require('./server');
app.listen(5000 || process.env.PORT,()=> console.log(`app running on http://localhost:${process.env.PORT}`));
mongoose.connect('mongodb://localhost:27017/clicFlayer', {useNewUrlParser: true})
.then(console.log('connected to db')).catch(console.log());