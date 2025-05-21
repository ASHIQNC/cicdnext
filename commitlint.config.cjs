module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [0], // allow any type
    'type-empty': [0], // allow type to be empty
    'subject-empty': [0], // allow subject to be empty
  },
};

// What this does:
// -----------------

// 'type-enum': disables the rule that restricts the type to a specific set of values.

// Now, any word before the colon is accepted as the type.

// Example
// With this config, all of these will be valid:

// nextcicd: first commit

// hello: initial setup

// anything: whatever you want
