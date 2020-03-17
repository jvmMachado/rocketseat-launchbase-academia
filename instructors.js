const fs = require('fs');
const data = require('./data.json');

exports.index = (req, res) => {
  let instructors = data.instructors;
  let newInstructors;

  newInstructors = instructors.map(instructor => {
    instructor.services = instructor.services.toString().split(',');
  });

  console.log(newInstructors);

  return res.render('instructors/index', { instructors: instructors });
};

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
    services: foundInstructor.services.toString().split(','),
    created_at: new Intl.DateTimeFormat('pt-BR', {
      timeZone: 'UTC',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(foundInstructor.created_at)
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

exports.edit = (req, res) => {
  const { id } = req.params;

  let foundInstructor = data.instructors.find(instructor => {
    return instructor.id == id;
  });

  if (!foundInstructor) return res.send('Instructor not found.');

  const instructor = {
    ...foundInstructor,
    birth: new Intl.DateTimeFormat('ko-KR', {
      timeZone: 'UTC',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
      .format(foundInstructor.birth)
      .split('. ')
      .join('-')
      .split('.')
      .join('')
  };

  return res.render('instructors/edit', { instructor });
};

// PUT

exports.put = (req, res) => {
  const { id } = req.body;
  let index = 0;

  let foundInstructor = data.instructors.find((instructor, foundIndex) => {
    if (instructor.id == id) {
      index = foundIndex;
      return true;
    }
  });

  if (!foundInstructor) return res.send('Instructor not found.');

  const instructor = {
    ...foundInstructor,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id: Number(req.body.id)
  };

  data.instructors[index] = instructor;

  fs.writeFile('data.json', JSON.stringify(data, null, 2), err => {
    if (err) return res.send('Write error!');

    return res.redirect(`/instructors/${id}`);
  });
};

// Delete

exports.delete = (req, res) => {
  const { id } = req.body;

  const filteredInstructors = data.instructors.filter(instructor => {
    return instructor.id != id;
  });

  data.instructors = filteredInstructors;

  fs.writeFile('data.json', JSON.stringify(data, null, 2), err => {
    if (err) return res.send('Write error!');

    return res.redirect(`/instructors/`);
  });
};
