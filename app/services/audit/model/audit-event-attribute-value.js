class AuditEventAttributeValue {
  constructor(type, value) {
    this.type = type;
    this.value = value;
  }

  setType(type) {
    this.type = type;
  }

  getType() {
    return this.type;
  }

  setValue(value) {
    this.value = value;
  }

  getValue() {
    return this.value;
  }
}
module.exports = AuditEventAttributeValue;
