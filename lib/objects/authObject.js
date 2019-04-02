const removeSpaces = new RegExp(/ +/g);

function cleanInviteKey(inviteKey) {
  let cleanedKey = inviteKey.replace(removeSpaces, '');
  cleanedKey = cleanedKey.toUpperCase();
  return encodeURIComponent(cleanedKey);
}

module.exports = {
  authFormToObject(details) {
    const json = { inviteKey: cleanInviteKey(details.inviteKey) };
    return json;
  },
};
