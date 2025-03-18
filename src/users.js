let users = [
  { id: 1, name: "user 1", email: "example@email.com" },
  { id: 2, name: "user 2", email: "example2@email.com" },
  { id: 3, name: "user 3", email: "example3@email.com" },
];

export const getAll = (req, res) => res.json(users);

export const getById = (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  return user
    ? res.json(user)
    : res.status(404).json({ message: "User not found" });
};

export const create = (req, res) => {
  const newUser = {
    id: users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1,
    ...req.body,
  };
  users.push(newUser);
  res.status(201).json(newUser);
};

export const update = (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });
  Object.assign(user, req.body);
  res.json(user);
};

export const remove = (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return res.status(404).json({ message: "User not found" });
  const [deletedUser] = users.splice(index, 1);
  res.json(deletedUser);
};
