const fs = require('fs');
const data = require('./data.json');

// Show

exports.show = (req, res) => {
  const { id } = req.params;

  const foundInstructor = data.instructors.find(instructor => {
    return instructor.id == id;
  });

  if (!foundInstructor) {
    return res.send('Instructor not found.');
  }

  function age(timestamp) {
    const today = new Date();
    const birthDate = new Date(timestamp);

    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month == 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

  const instructor = {
    ...foundInstructor,
    age: age(foundInstructor.birth),
    services: foundInstructor.services.split(','),
    created_at: ''
  };

  return res.render('instructors/show', { instructor });
};

// Create

exports.post = (req, res) => {
  const keys = Object.keys(req.body);

  for (key of keys) {
    if (req.body[key] == '') {
      return res.send(`Por favor, preencha o campo ${key}`);
    }
  }

  let { avatar_url, name, birth, gender, services } = req.body;

  birth = Date.parse(birth);
  const created_at = Date.now();
  const id = Number(data.instructors.length + 1);

  data.instructors.push({
    id,
    avatar_url,
    name,
    birth,
    gender,
    services,
    created_at
  });

  fs.writeFile('data.json', JSON.stringify(data, null, 2), err => {
    if (err) {
      return res.send('Error while writing JSON file!');
    } else {
      return res.redirect('/instructors');
    }
  });
};

// Update

// Delete
