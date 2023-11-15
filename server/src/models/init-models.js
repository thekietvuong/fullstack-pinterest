import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _comments from  "./comments.js";
import _images from  "./images.js";
import _save_image from  "./save_image.js";
import _users from  "./users.js";

export default function initModels(sequelize) {
  var comments = _comments.init(sequelize, DataTypes);
  var images = _images.init(sequelize, DataTypes);
  var save_image = _save_image.init(sequelize, DataTypes);
  var users = _users.init(sequelize, DataTypes);

  comments.belongsTo(users, { as: "users", foreignKey: "user_id"});
  users.hasMany(comments, { foreignKey: "user_id"});
  comments.belongsTo(images, { foreignKey: "image_id"});
  images.hasMany(comments, { foreignKey: "image_id"});
  images.belongsTo(users, { as: "users", foreignKey: "user_id"});
  users.hasMany(images, { foreignKey: "user_id"});
  save_image.belongsTo(users, { foreignKey: "user_id"});
  users.hasMany(save_image, { foreignKey: "user_id"});
  save_image.belongsTo(images, { as: "images", foreignKey: "image_id"});
  images.hasMany(save_image, { foreignKey: "image_id"});

  return {
    comments,
    images,
    save_image,
    users,
  };
}
