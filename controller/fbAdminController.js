const fbUser = require('../model/fbuserModel');

exports.getList = async (req, res) => {
  const snapshot = await fbUser.get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  res.send(list);
};

exports.addUser = async (req, res) => {
  const data = req.body;
  await fbUser.add({ data });
  res.send({ msg: "User Added" });
};

exports.updateUser = async (req, res) => {
  const id = req.body.id;
  delete req.body.id;
  const data = req.body;
  await fbUser.doc(id).update(data);
  res.send({ msg: "Updated" });
};

exports.deleteUser = async (req, res) => {
  const id = req.body.id;
  await fbUser.doc(id).delete();
  res.send({ msg: "Deleted" });
}