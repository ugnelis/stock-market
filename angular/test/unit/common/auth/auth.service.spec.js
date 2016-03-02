'use strict';

describe('auth', function () {
    beforeEach(module('app'));

    it('can get an instance of auth factory', inject(function(auth) {
        expect(auth).toBeDefined();
    }));
});
