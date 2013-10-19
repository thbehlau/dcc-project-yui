YUI.add('dcc-view', function(Y) {
	var _self, 
		userTable = undefined, userDetail = undefined;
	
	Y.UserWidget = Y.Base.create('dcc-widget', Y.View, [], {	
		initializer: function(config) {
			_self = this;
			if (!userTable) {
				this._createUserTable(config);
				
				userTable.delegate('click', function(event) {
					var tr = event.currentTarget;
					var record = this.getRecord(tr.get('id'));
					record.loadContacts(function(txId,response){
						var contacts = Y.JSON.parse(response.responseText);
						userDetail.setAttrs({
					        data: contacts
					    });
						userDetail.render();
					});
				},'tr', userTable);
			};
			
			if (!userDetail) {
				this._createUserDetailTable(config);
			};
		},
		
		destructor: function() {
		},
		
		render: function() {
			userTable.data.load(function (e,b){
				userTable.render();				
			});
		},
		_contactsFormatter: function(o) {
			o.cell.setContent("<button type='button' name='contacts'>Contacts</button>");
		},
		
		_createUserTable: function(config) {
			// A table from data with keys that work fine as column names
			userTable = new Y.DataTable({
				srcNode: config.userSrcNode,
				columns : [ 
				    {key: "id", label: "ID"},
				    {key: "firstName", label: "First Name"},
				    {key: "lastName", label: "Last Name"},
				    {key: "contacts", label: "Contacts", nodeFormatter: _self._contactsFormatter} 
				    ],
				caption : "User table",
				data: new Y.Users()
			});
		},
		
		_createUserDetailTable: function(config) {
			userDetail = new Y.DataTable({
				srcNode: config.contactSrcNode,
			    columns : [
			        { key:'type', label:'Type'},
			        { key:'contactValue', label:'Contact' }
			     ],
				recordType: Y.Contact,
			    caption: 'Contacts for user:'
			});			
		}
		
	});
		
}, '1.0', {requires: ['datatable', 'dcc-model', 'json-parse']});			
			
