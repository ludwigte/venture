import Ember from 'ember';

import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  actions: {
    closeModal: function() {
      this.disconnectOutlet({
        parentView: 'application',
        outlet: 'modal'
      });
    },
    showModal: function(params) {
      this.render(params.template, {
        into: 'application',
        outlet: 'modal',
        model: params
      });
    }
  }
});
