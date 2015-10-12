import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
import Ember from 'ember';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  beforeModel: function(transition) {
    this._super(transition);

    // Check to see if the AuthenticatedRouteMixin kicked us back to the login.
    if (transition.isActive) {
      if (!(this.session.get('session.user.organization_id'))) {
        transition.abort();
        this.session.set('attemptedTransition', transition);
        transition.send('transitionToCreateOrganization');
      }
    }
  },
  model: function({org_id}, transition) {
    var intId = parseInt(org_id, 10);
    var currentOrg = this.session.get('content.session.organizations').
      find(({server_id}) => server_id === intId);

    if (!currentOrg) {
      // The URL didn't contain a target organization. Let's assume they need to select one.
      transition.abort();
      this.session.set('attemptedTransition', transition);
      transition.send('transitionToChooseOrganization');
    } else {
      var prevOrgId = this.session.get('content.session.organizationForRequest');
      if(prevOrgId !== intId) {
        this.tagRepository.reset();
      }

      this.session.set('organizationForRequest', intId);


      this.tagRepository.load();
      this.organizationRepository.load();

      // Return an object representation of the organization
      return Ember.Object.create({
        organizations: this.session.get('content.session.organizations'),
        currentOrganization: currentOrg,
        currentOrgId: intId
      });
    }
  },
  serialize: function(model) {
    this.session.set('organizationForRequest', model.get('currentOrgId'));
    /* Return the URL slug that should be interpolated based on this model */
    return {org_id: model.get('currentOrgId')};
  },
  activate: function() {
    Ember.$('body').addClass('authenticated');
  },
  deactivate: function() {
    Ember.$('body').removeClass('authenticated');
  }
});