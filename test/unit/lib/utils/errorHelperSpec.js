const { assert } = require('chai');
const errorHelper = require('../../../../lib/utils/errorHelper');

describe('Error Helper ', () => {
  it('generateGlobalError - should return array with correct settings when details provided', () => {
    const array = errorHelper.generateGlobalError('error-type', 'field-name', 'error text');
    assert.equal(array.href, '#field-name');
    assert.equal(array.text, 'error-type:fields.field-name.label-display - error text');
  });
  it('generateGlobalErrorNoFieldLabel - should return array with correct settings when details provided', () => {
    const array = errorHelper.generateGlobalErrorNoFieldLabel('error-type', 'error-field', 'error text');
    assert.equal(array.link, 'error-field');
    assert.equal(array.text, 'error text');
  });
  it('generateGlobalErrorSuppliedLabel - should return array with correct settings when details provided', () => {
    const array = errorHelper.generateGlobalErrorSuppliedLabel('field-name', 'error-field', 'error text');
    assert.equal(array.href, '#field-name');
    assert.equal(array.text, 'error-field - error text');
  });
  it('generateGlobalErrorGenericField - should return array with correct settings when details provided', () => {
    const array = errorHelper.generateGlobalErrorGenericField('error', 'error-field', 'error text');
    assert.equal(array.href, '#error-field');
    assert.equal(array.text, 'error:fields.error-field.label - error text');
  });
  it('generateGlobalErrorGenericFieldLink - should return array with correct settings when details provided', () => {
    const array = errorHelper.generateGlobalErrorGenericFieldLink('error', 'error-type', 'field-name', 'error text');
    assert.equal(array.href, '#error');
    assert.equal(array.text, 'error-type:fields.field-name.label - error text');
  });
});
