import template from './planning.html';
/* @ngInject */
export default {
	template: template,
	controller: class Controller {
		/* @ngInject */
		constructor($log, DialogService, $timeout, $q, $state, $element, uiGridConstants) {
			Object.assign(this, {
				$log,
				DialogService,
				$timeout,
				$state,
				$q,
                $element,
                uiGridConstants
			})

		}

		$onInit() {
			this.data = [{
					id: 1,
					name: 'Scooby Doo',
					active: false
				},
				{
					id: 2,
					name: 'Shaggy Rodgers'
				},
				{
					id: 3,
					name: 'Fred Jones',
					active: false
				}


			];

			this.myData = [
				{
					firstName: "Cox",
					lastName: "Carney",
					company: "Enormo",
					employed: true
				},
				{
					firstName: "Lorraine",
					lastName: "Wise",
					company: "Comveyer",
					employed: false
				},
				{
					firstName: "Nancy",
					lastName: "Waters",
					company: "Fuelton",
					employed: false
				}
			  ];

			  let data = [];
			  for(let i = 0; i < 8; i++){
				  data.push({
					  actualId: 'asdf asdf',
					  status:'complete',
					  stringValueEng: Math.random().toString(36).substr(2, 16)
				  })
			  }
			let self = this;
			this.gridOptions = {
                appScopeProvider: this,
                data: data,
                maxRow: 10,
                enableSorting:true,
                cssClass: 'import-string-grid',
                enableRowSelection: true,
                onRowSelectionClick(row) {
                    
                }
            }

            let uiGridConstants = this.uiGridConstants;

            this.gridOptions.columnDefs = [{
                    field: 'actualId',
                    displayName: 'Actual ID'
                },
                {
                    field: 'stringValueEng',
                    displayName: 'English (US)',
                    sort: {
                        direction: uiGridConstants.DESC,
                        priority: 1
                      }
                },
                {
                    name: 'Status',
                    cellTemplate: `
                                <div class="ui-grid-cell-contents text-center">
                                    {{row.entity.status}}
                                </div>
                            `,
                    width: '80',
                    headerCellClass: 'text-center'
                },
                {
                    field: 'View',
                    width: '60',
                    cellTemplate: `
                        <div layout="row" layout-align="center center">
                            <md-button class="md-icon-button md-primary" ng-click="grid.appScope.detailView(row)" aria-label="Settings">
                            <ng-md-icon icon="visibility"></md-icon>
                            </md-button>
                        </div>
                    `,
                    headerCellClass: 'text-center'
                }

			];
			
	
            
		}
		addChip() {
			this.data.push({
				id: Math.floor(Math.random() * 1000),
				name: Math.random().toString(36).substr(2, 16),
				active: false
			})
		}

		toggleActive(item) {
			item.active = !item.active;
		}

		searchUsers(text) {

			let deferred = this.$q.defer();

			if (!this.users) {


				this.$timeout(() => {

					this.users = [{
							id: 1,
							name: 'Scooby Doo'
						},
						{
							id: 2,
							name: 'Shaggy Rodgers'
						},
						{
							id: 3,
							name: 'Fred Jones'
						},
						{
							id: 4,
							name: 'Daphne Blake'
						},
						{
							id: 5,
							name: 'Velma Dinkley'
						},
						{
							id: 6,
							name: 'Fred Jones'
						},
						{
							id: 7,
							name: 'Daphne Blake'
						},
						{
							id: 8,
							name: 'Velma Dinkley'
						}
					];
					if (!text) {
						deferred.resolve(this.users);
					} else {
						deferred.resolve(this.users.filter((u) => {
							return u.name.indexOf(text) !== -1;
						}));
					}


				}, 650);
			} else {
				if (!text) {
					deferred.resolve(this.users);
				} else {
					deferred.resolve(this.users.filter((u) => {
						return u.name.indexOf(text) !== -1;
					}));
				}
			}

			return deferred.promise;
		}

		changeState() {
			this.$state.go('app.overview')
		}

		loadUsers() {
			if (this.users) {
				return this.users
			}

			return this.$timeout(() => {

				this.users = [{
						id: 1,
						name: 'Scooby Doo'
					},
					{
						id: 2,
						name: 'Shaggy Rodgers'
					},
					{
						id: 3,
						name: 'Fred Jones'
					},
					{
						id: 4,
						name: 'Daphne Blake'
					},
					{
						id: 5,
						name: 'Velma Dinkley'
					}
				];

			}, 650);
		};

		showDialog() {
			this.DialogService.showComponent('<h3>Hello world</h3>', null, {})

		}

		showConfirm() {
			this.DialogService.confirm({
				title: 'Please confirm',
				message: `<p>Custom html content here <a href='#'>Link</a></p>`
			}).then(() => {
				alert('You;ve click OK');
			})
		}

		showAlert() {
			this.DialogService.alert({
				title: 'Alert',
				message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
			}).then(() => {
				alert('You;ve click OK');
			})
		}

	}
};
