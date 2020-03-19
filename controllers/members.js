const fs = require('fs');
const data = require('../data.json');

exports.index = (req, res) => {
  let members = data.members;
  let newMembers;

  console.log(newMembers);

  return res.render('members/index', { members: members });
};

exports.show = (req, res) => {
  const { id } = req.params;

  const foundMember = data.members.find(member => {
    return member.id == id;
  });

  if (!foundMember) {
    return res.send('Member not found.');
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

  const member = {
    ...foundMember,
    age: age(foundMember.birth)
  };

  return res.render('members/show', { member });
};

exports.create = (req, res) => {
  return res.render('members/create');
};

// Post

exports.post = (req, res) => {
  const keys = Object.keys(req.body);

  for (key of keys) {
    if (req.body[key] == '') {
      return res.send(`Por favor, preencha o campo ${key}`);
    }
  }

  birth = Date.parse(req.body.birth);
  const lastMember = data.members[data.members.length - 1];
  let id = 1;

  if (lastMember) {
    id = lastMember.id + 1;
  }

  data.members.push({
    ...req.body,
    id,
    birth
  });

  fs.writeFile('data.json', JSON.stringify(data, null, 2), err => {
    if (err) {
      return res.send('Error while writing JSON file!');
    } else {
      return res.redirect('/members');
    }
  });
};

// Update

exports.edit = (req, res) => {
  const { id } = req.params;

  let foundMember = data.members.find(member => {
    return member.id == id;
  });

  if (!foundMember) return res.send('Member not found.');

  const member = {
    ...foundMember,
    birth: new Intl.DateTimeFormat('ko-KR', {
      timeZone: 'UTC',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
      .format(foundMember.birth)
      .split('. ')
      .join('-')
      .split('.')
      .join('')
  };

  return res.render('members/edit', { member });
};

// PUT

exports.put = (req, res) => {
  const { id } = req.body;
  let index = 0;

  let foundMember = data.members.find((member, foundIndex) => {
    if (member.id == id) {
      index = foundIndex;
      return true;
    }
  });

  if (!foundMember) return res.send('Member not found.');

  const member = {
    ...foundMember,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id: Number(req.body.id)
  };

  data.members[index] = member;

  fs.writeFile('data.json', JSON.stringify(data, null, 2), err => {
    if (err) return res.send('Write error!');

    return res.redirect(`/members/${id}`);
  });
};

// Delete

exports.delete = (req, res) => {
  const { id } = req.body;

  const filteredMembers = data.members.filter(member => {
    return member.id != id;
  });

  data.members = filteredMembers;

  fs.writeFile('data.json', JSON.stringify(data, null, 2), err => {
    if (err) return res.send('Write error!');

    return res.redirect(`/members/`);
  });
};
