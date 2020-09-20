const users = {};

const respondJSON = (req, res, content, statusCode) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  res.writeHead(statusCode, headers);
  res.write(JSON.stringify(content));
  res.end();
};

const respondJSONMeta = (req, res, statusCode) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  res.writeHead(statusCode, headers);
  res.end();
};

const getUsers = (req, res) => {
  const responseJSON = {
    users,
  };
  return respondJSON(req, res, responseJSON, 200);
};

const getUsersMeta = (req, res) => respondJSONMeta(req, res, 200);

const notReal = (req, res) => {
  const responseJSON = {
    message: 'The page you are looking for was not able to be found',
    id: 'notFound',
  };
  return respondJSON(req, res, responseJSON, 404);
};

const notRealMeta = (req, res) => respondJSONMeta(req, res, 404);

const updateUsers = (req, res, body) => {
  const responseJSON = {
    message: 'Name and age are both required.',
  };
  let responseCode = 201;

  if (!body.name || !body.age) {
    responseJSON.id = 'missingParams';
    return respondJSON(req, res, responseJSON, 400);
  }

  if (users[body.name]) {
    responseCode = 204;
  } else {
    users[body.name] = {};
  }

  users[body.name].name = body.name;
  users[body.name].age = body.age;

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJSON(req, res, responseJSON, responseCode);
  }

  return respondJSONMeta(req, res, responseCode);
};
// exports
module.exports = {
  getUsers,
  getUsersMeta,
  notReal,
  notRealMeta,
  updateUsers,
};
