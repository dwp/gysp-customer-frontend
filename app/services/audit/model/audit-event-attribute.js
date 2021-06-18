class AuditEventAttribute {
  constructor(name, values) {
    this.name = name;
    if (values) {
      this.values = values;
    } else {
      this.values = [];
    }
  }

  setName(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  setValues(values) {
    this.values = values;
  }

  getValues() {
    return this.values;
  }
}
module.exports = AuditEventAttribute;
