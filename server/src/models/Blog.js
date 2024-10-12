module.exports = (sequelize, DataTypes) => {
    const Blog = sequelize.define('Blog', {
        name: DataTypes.TEXT,
        thumbnail: DataTypes.TEXT,
        pictures: DataTypes.TEXT,
        sip: DataTypes.TEXT,
        sensor: DataTypes.TEXT,
        price: DataTypes.TEXT,
        
        
    })
    return Blog
}