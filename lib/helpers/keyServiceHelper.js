const got = require('got');

const requestHelper = require('./requestHelper');

module.exports = {
  getInviteKeyRequest(res, inviteKey) {
    return new Promise((resolve, reject) => {
      const { keyServiceApiGateway } = res.locals;
      const keyServiceCall = requestHelper.generateGetCall(`${keyServiceApiGateway}/key/${inviteKey}`);
      got(keyServiceCall).then((response) => {
        if (response.body && response.body.status === 'USED') {
          const error = { message: 'Invite key used', response };
          reject(error);
        } else {
          resolve(true);
        }
      }).catch((err) => {
        reject(err);
      });
    });
  },
};
