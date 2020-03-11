// Create

exports.post = (req, res) => {
  const keys = Object.keys(req.body);

  for (key of keys) {
    if (req.body[key] == '') {
      return res.send(`Por favor, preencha o campo ${key}`);
    }
  }
  return res.send(req.body);
};

// Update

// Delete
