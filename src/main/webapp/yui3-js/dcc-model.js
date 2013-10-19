YUI.add('dcc-model', function(Y) {
	/**
	 * Model USER with the attributes
	 */
	Y.User = Y.Base.create('user', Y.Model, [Y.ModelSync.REST], {
		root: '/dcc-project/people',
		
		loadContacts: function(callback) {
			Y.io(this.root + '/' + this.get('id') + '/contacts',{
				on: {
					success: callback,
					failure: callback
				}
			});
		}
	  }, {
		ATTRS: {
			firstName: {value: ''},
			lastName: {value: ''},
			contacts: {value:undefined}
		}
	});

	/**
	 * ModelList USERS with the attributes
	 */
	Y.Users = Y.Base.create('users', Y.ModelList, [Y.ModelSync.REST],{
		model: Y.User
	});
	
	/**
	 * Model CONTACT with the attributes
	 */
	Y.Contact = Y.Base.create('contact', Y.Model, [Y.ModelSync.REST], {
		  root: '/dcc-project/contacts'
		},{
		  ATTRS: {
			type: {value: ''},
			contact: {value: ''}
		}
	});

	/**
	 * ModelList CONTACTS with the attributes
	 */
	Y.Contacts = Y.Base.create('contacts', Y.ModelList, [Y.ModelSync.REST], {
		model: Y.Contact
	});
	
}, '1.0', {requires: ['model', 'model-list', 'model-sync-rest', 'io']});