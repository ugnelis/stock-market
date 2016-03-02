'use strict';

describe('principal', function () {
    beforeEach(module('app'));

    it('can get an instance of principal factory', inject(function (principal) {
        expect(principal).toBeDefined();
    }));

    it('checks if user is authenticated ', inject(function (principal) {
        principal.authenticate({
            name: 'Test User',
            roles: ['user']
        });
        expect(principal.isAuthenticated()).toEqual(true);
    }));

    it('checks if after authentication identity cookie equals to test json', inject(function (principal, store) {
        var data = {
            name: 'Test User',
            roles: ['user']
        };
        principal.authenticate(data);
        expect(store.get('identity')).toEqual(angular.toJson(data));
    }));

    it('checks if user has a user role', inject(function (principal) {
        principal.authenticate({
            name: 'Test User',
            roles: ['user']
        });
        expect(principal.isInRole('user')).toEqual(true);
    }));

    it('checks if user does not have an admin role', inject(function (principal) {
        principal.authenticate({
            name: 'Test User',
            roles: ['user']
        });
        expect(principal.isInRole('admin')).toEqual(false);
    }));

    it('checks if user is in any role ', inject(function (principal) {
        principal.authenticate({
            name: 'Test User',
            roles: ['user']
        });
        expect(principal.isInAnyRole(['admin', 'user'])).toEqual(true);
        expect(principal.isInAnyRole(['admin', 'moderator'])).toEqual(false);
    }));

    it('checks if user signed out ', inject(function (principal) {
        principal.authenticate({
            name: 'Test User',
            roles: ['user']
        });
        principal.authenticate(null);
        expect(principal.isAuthenticated()).toEqual(false);
    }));
});
