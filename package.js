Package.describe({
  name: 'payments',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');

  api.use(['mongo', 'accounts-password', 'templating', 'random', 'mquandalle:jade@0.4.3', 'grigio:babel', 'aslagle:reactive-table@0.7.8']);

  api.addFiles('payments.js');
  api.addFiles(['_paymentStatus.tpl.jade', '_paymentStatus.es6'], 'client');

  api.export(['Payments', 'PaymentErrors']);
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('payments');
  api.addFiles('payments-tests.js');
});
