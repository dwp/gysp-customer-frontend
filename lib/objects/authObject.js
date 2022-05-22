const removeSpacesRegEx = / +/g;

function cleanInviteKey(inviteKey) {
  let cleanedKey = inviteKey.replace(removeSpacesRegEx, '');
  cleanedKey = cleanedKey.toUpperCase();
  return encodeURIComponent(cleanedKey);
}

module.exports = {
  authFormToObject(details) {
    const json = { inviteKey: cleanInviteKey(details.inviteKey) };
    return json;
  },
};
