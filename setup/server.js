const app = require('./app.js');
const PORT = process.env.PORT || 9000;

module.exports = app.listen(PORT, async () => console.log(`Server is live at localhost:  ${process.pid}`, `${PORT}`));
