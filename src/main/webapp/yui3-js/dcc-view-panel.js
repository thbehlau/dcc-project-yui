YUI.add('dcc-view-panel', function(Y) {
	var _userPanelHtml = 
		'<div id="user-panel">'+
		'   <div class="yui3-widget-hd">User</div>' +
		'	<div class="yui3-widget-bd">'+
		'		<form id="userForm" action="" onsubmit="return false;">'+
		'      		<div class="yui3-u-1">'+
		'		    	<div class="yui3-u-11-24">'+
		'			    	<span><label class="yui3-u-1" for="firstNameField">First Name</label></span>'+
		'				</div>'+
		'			    <div class="yui3-u-11-24">'+
		'			    	<input id="firstNameField" name="firstName"/>'+
		'       		</div>'+
		'           </div>' +
		'      		<div class="yui3-u-1">'+
		'		    	<div class="yui3-u-11-24">'+
		'			    	<span><label class="yui3-u-1" for="lastNameField">Last Name</label></span>'+
		'				</div>'+
		'			    <div class="yui3-u-11-24">'+
		'			    	<input id="lastNameField" name="lastName"/>'+
		'       		</div>'+
		'     		</div>'+
		'		</form>'+
		'	</div>'+
		'</div>';
	
	
	var _self, 
		userPanel = undefined,
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
		
		showUserPanel: function() {
			if (!userPanel) {
				_self._createUserPanel();
			}
			userPanel.show();
		},
		
		_contactsFormatter: function(o) {
			o.cell.setContent("<button type='button' name='contacts'>Contacts</button>");
		},
		
		_createUserTable: function(config) {
			// A table from data with keys that work fine as column names
			userTable = new Y.DataTable({
				srcNode: config.userSrcNode,
				columns : [ 
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
		},
		
		_createUserPanel: function() {
			var userNode = Y.Node.create(_userPanelHtml);
			Y.one('#main').append(userNode);
			userPanel = new Y.Panel({
	 			srcNode      : userNode,
	 		    width        : 400,
	 		    zIndex       : 5,
	 		    centered     : true,
	 		    modal        : true,
	 		    visible      : false,
	 		    render       : true,
	 		    buttons		 : [
	 		    	{
	 			    	value:  'Cancel',
	 			    	action: function(e) {
	 				    	e.preventDefault();
	 				    	userPanel.hide();
	 				    },
	 				    section: Y.WidgetStdMod.FOOTER
	 	    		},
	 		    	{
	 			    	value:  'Add',
	 			    	action: function(e) {
	 				    	e.preventDefault();
	 				    	var user = new Y.User({
	 				    		firstName: Y.one('#firstNameField').get('value'),
	 				    		lastName: Y.one('#lastNameField').get('value')
	 				    	});
		 			    	userTable.addRow(user, {sync: true});	 				    		
	 				    	userPanel.hide();
	 				    },
	 				    section: Y.WidgetStdMod.FOOTER
	 	    		}		 	    		
	 		    ]
 	   		});	
		}
		
	});
		
}, '1.0', {requires: ['datatable', 'dcc-model', 'json-parse', 'panel']});			
			
