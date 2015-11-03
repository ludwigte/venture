import DeviseAuthenticator from 'ember-simple-auth/authenticators/devise';
import ENV from '../config/environment';

export default DeviseAuthenticator.extend({
 serverTokenEndpoint: ENV['ember-simple-auth'].serverTokenEndpoint,
 tokenAttributeName: ENV['ember-simple-auth'].tokenAttributeName,
 identificationAttributeName: ENV['ember-simple-auth'].identificationAttributeName
});