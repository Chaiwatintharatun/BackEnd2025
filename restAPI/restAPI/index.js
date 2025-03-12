const express = require("express");
const Sequelize = require("sequelize");
const cors = require('cors')
const app = express();

// parse incoming requests
app.use(express.json());
app.use(cors())

// create a connection to the database
const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "sqlite",
  storage: "./Database/SQBooks.sqlite",
});

// define the Table model table
const User = sequelize.define("User", {
  user_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const product = sequelize.define("product", {
  product_ID: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  product_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  quantity_available: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

const order_detail = sequelize.define("order_detail", {
  Order_dID: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_ID: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  product_ID: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  Order_ID: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

const Order = sequelize.define("Order", {
  Order_ID: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Order_dID: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  
});
Order.hasMany(order_detail, {foreignKey: 'Order_ID'})
order_detail.belongsTo(Order, {foreignKey: 'Order_ID'})

// create the tables if they don't exist
sequelize.sync();

// route to get all users
app.get("/User", (req, res) => {
  User.findAll().then((User) => {
    res.json(User);
  }).catch((err) => {
    res.status(500).send(err);
  });
});

// route to get a user by id
app.get("/User/:id", (req, res) => {
  User.findByPk(req.params.id).then((User) => {
    if (!User) {
      res.status(404).send("User not found");
    } else {
      res.json(User);
    }
  }).catch((err) => {
    res.status(500).send(err);
  });
});

// route to create a new user
app.post("/User", (req, res) => {
  User.create(req.body).then((User) => {
    res.send(User);
  }).catch((err) => {
    res.status(500).send(err);
  });
});

// route to update a user
app.put("/User/:id", (req, res) => {
  User.findByPk(req.params.id).then((User) => {
    if (!User) {
      res.status(404).send("User not found");
    } else {
      User.update(req.body).then(() => {
        res.send(User);
      }).catch((err) => {
        res.status(500).send(err);
      });
    }
  }).catch((err) => {
    res.status(500).send(err);
  });
});

// route to delete a user
app.delete("/User/:id", (req, res) => {
  User.findByPk(req.params.id).then((User) => {
    if (!User) {
      res.status(404).send("User not found");
    } else {
      User.destroy().then(() => {
        res.send({});
      }).catch((err) => {
        res.status(500).send(err);
      });
    }
  }).catch((err) => {
    res.status(500).send(err);
  });
});

// route to get all products
app.get("/product", (req, res) => {
  product.findAll().then((product) => {
    res.status(200).json(product.map((product) => product.toJSON()));
  }).catch((err) => {
    res.status(500).send(err);
  });
});

// route to get a product by id
app.get("/product/:id", (req, res) => {
  product.findByPk(req.params.id).then((product) => {
    if (!product) {
      res.status(404).send("product not found");
    } else {
      res.json(product);
    }
  }).catch((err) => {
    res.status(500).send(err);
  });
});

app.post("/product", (req, res) => {
  product.create(req.body).then((product) => {
    res.send(product);
  }).catch((err) => {
    res.status(500).send(err);
  });
});

// route to update a product
app.put("/product/:id", (req, res) => {
  product.findByPk(req.params.id).then((product) => {
    if (!product) {
      res.status(404).send("product not found");
    } else {
      product.update(req.body).then(() => {
        res.send(product);
      }).catch((err) => {
        res.status(500).send(err);
      });
    }
  }).catch((err) => {
    res.status(500).send(err);
  });
});

// route to delete a product
app.delete("/product/:id", (req, res) => {
  product.findByPk(req.params.id).then((product) => {
    if (!product) {
      res.status(404).send("Product not found");
    } else {
      product.destroy().then(() => {
        res.send({});
      }).catch((err) => {
        res.status(500).send(err);
      });
    }
  }).catch((err) => {
    res.status(500).send(err);
  });
});

// route to get all order_details
app.get("/order_detail", (req, res) => {
  order_detail.findAll().then((order_detail) => {
    res.json(order_detail);
  }).catch((err) => {
    res.status(500).send(err);
  });
});

// route to get an order_detail by id
app.get("/order_detail/:id", (req, res) => {
  order_detail.findByPk(req.params.id).then((order_detail) => {
    if (!order_detail) {
      res.status(404).send("Order Detail not found");
    } else {
      res.json(order_detail);
    }
  }).catch((err) => {
    res.status(500).send(err);
  });
});

// route to create a new order_detail
app.post("/order_detail", (req, res) => {
  order_detail.create(req.body).then((order_detail) => {
    res.send(order_detail);
  }).catch((err) => {
    res.status(500).send(err);
  });
});

// route to update an order_detail
app.put("/order_detail/:id", (req, res) => {
  order_detail.findByPk(req.params.id).then((order_detail) => {
    if (!order_detail) {
      res.status(404).send("Order Detail not found");
    } else {
      order_detail.update(req.body).then(() => {
        res.send(order_detail);
      }).catch((err) => {
        res.status(500).send(err);
      });
    }
  }).catch((err) => {
    res.status(500).send(err);
  });
});

// route to delete an order_detail
app.delete("/order_detail/:id", (req, res) => {
  order_detail.findByPk(req.params.id).then((order_detail) => {
    if (!order_detail) {
      res.status(404).send("Order Detail not found");
    } else {
      order_detail.destroy().then(() => {
        res.send({});
      }).catch((err) => {
        res.status(500).send(err);
      });
    }
  }).catch((err) => {
    res.status(500).send(err);
  });
});

// route to get all orders
app.get("/order", (req, res) => {
  Order.findAll({include:[{
    model: order_detail ,
  
  }]}).then((order) => {
    res.json(order);
  }).catch((err) => {
    res.status(500).send(err);
  });
});

// route to get an order by id
app.get("/order/:id", (req, res) => {
  Order.findByPk(req.params.id).then((order) => {
    if (order) {
      res.status(404).send("Order not found");
    } else {
      res.json(order);
    }
  }).catch((err) => {
    res.status(500).send(err);
  });
});

// route to create a new order
app.post("/order", (req, res) => {
  Order.create(req.body).then((order) => {
    res.send(order);
  }).catch((err) => {
    res.status(500).send(err);
  });
});

// route to update an order
app.put("/order/:id", (req, res) => {
  Order.findByPk(req.params.id).then((order) => {
    if (!order) {
      res.status(404).send("Order not found");
    } else {
      order.update(req.body).then(() => {
        res.send(order);
      }).catch((err) => {
        res.status(500).send(err);
      });
    }
  }).catch((err) => {
    res.status(500).send(err);
  });
});

// route to delete an order
app.delete("/order/:id", (req, res) => {
  Order.findByPk(req.params.id).then((order) => {
    if (!order) {
      res.status(404).send("Order not found");
    } else {
      order.destroy().then(() => {
        res.send({});
      }).catch((err) => {
        res.status(500).send(err);
      });
    }
  }).catch((err) => {
    res.status(500).send(err);
  });
});

// start the server
const port = process.env.PORT || 5110;
app.listen(port, () => console.log(`Listening on port ${port}...`));
