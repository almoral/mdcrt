Services = new Meteor.Collection2('services',{
  schema: {
    category:{
      type: String,
      label: 'Category',
      max: 200
    },
    /*
    subCategory:{
      type: String,
      label: 'subCategory',
      max: 200
    },
    targetedArea:{
      type: String,
      label: 'targetedArea',
      max: 200
    },
    specialty:{
      type: String,
      label: 'specialty',
      max: 200
    },
    */
    title: {
      type: String,
      label: 'Title',
      max: 200
    },
    subTitle: {
      type: String,
      label: 'Sub Title',
      max: 200
    },
    personas: {
      type: String,
      label: 'Persona'
    },
    Description: {
      type: String ,
      label: 'Description'
    },
    address: {
      type: String,
      label: 'Address',
      max: 200
    },
    phoneNumber: {
      type: String,
      label: 'Phone Number',
      max: 200
    },
    website: {
      type: String,
      label: 'Website',
      max: 200
    },
    contactPerson: {
      type: String,
      label: 'Contact Person',
      max: 200
    },
    active:{
      type: Boolean
    }
  }
});

if(Meteor.isServer){

Services.allow({
  insert: function(){return true;},
  update: function(){return true;}
})

Meteor.startup(function(){

if(Services.find().count() > 0){

  //Services.remove({});

}

/*
  collectionApi = new CollectionAPI({
    authToken: undefined,
    apiPath: 'get'
  });

  collectionApi.addCollection(Services, 'services', {
    methods: ['GET']
  });
  collectionApi.start();
*/


});
};


//Users collection
/*
Users = new Meteor.SmartCollection('users');
if(Meteor.isServer && Users.find().count() == 0){
  
}
*/

Meteor.methods({
  deleteRecord: function(id){
    Services.update(id, {$set: {active: false}});
  },
  restoreRecord: function(id){
    Services.update(id, {$set: {active: true}});
  }
})

//This feeds the Personas select
Personas = new Meteor.Collection2('personas', {
  schema:{
    name: {
      type: [String],
      label: 'Personas',
      optional: true
    }
  }
});


if(Meteor.isServer && Personas.find().count() === 0){
  var personas = 
  {
    "name": ["Seniors", "Teens", "Children", "Veterans", "Students"]
  };

  _.each(personas, function(persona){
    Personas.insert(persona);
  });
}



//This feeds the Categories dropdown
ServiceCategories = new Meteor.Collection('serviceCategories');


if(Meteor.isServer && ServiceCategories.find().count() === 0){
	var serviceCategories = [
	{"name": "Wellness and Social Services","value": 0},
	{"name":"Monetary Information and Assistance","value":1},
	{"name": "Recreation and the Arts", "value": 2},
	{"name": "Education", "value": 3}
	];

	_.each(serviceCategories, function(serviceCategory){
        ServiceCategories.insert(serviceCategory);
    });
}


if(Meteor.isServer && Services.find().count() === 0){

    var services = [
    {
      "category": 'Wellness and Social Services', "title": "Placeholder", "subTitle": "subTitle goes here","Description": "Description goes here.", "address": "address info.", "phoneNumber": "phone number should go here.", "website": "site URL here.", "contactPerson": "Contact person\'s name here.", "active": true, "personas":['Children', 'Seniors']},

		{"category": 'Wellness and Social Services', "title": "Placeholder", "subTitle": "subTitle goes here", "Description": "Description goes here.", "address": "address info.", "phoneNumber": "phone number should go here.", "website": "site URL here.", "contactPerson": "Contact person\'s name here.", "active": true, "personas":['Teens']
    },
    {   "category": 'Monetary Information and Assistance', "title": "Placeholder", "subTitle": "subTitle goes here","Description": "Description goes here.", "address": "address info.", "phoneNumber": "phone number should go here.", "website": "site URL here.", "contactPerson": "Contact person\'s name here.", "active": true, "personas":['Teens']},

		{"category": 'Monetary Information and Assistance',"title": "Placeholder", "subTitle": "subTitle goes here", "Description": "Description goes here.", "address": "address info.", "phoneNumber": "phone number should go here.", "website": "site URL here.", "contactPerson": "Contact person\'s name here.", "active": true, "personas":['Teens']
    },
    {
      "category": 'Recreation and the Arts', "title": "Placeholder", "subTitle": "subTitle goes here","Description": "Description goes here.", "address": "address info.", "phoneNumber": "phone number should go here.", "website": "site URL here.", "contactPerson": "Contact person\'s name here.", "active": true, "personas":['Teens']},

		{"category": "Recreation and the Arts", "title": "Placeholder", "subTitle": "subTitle goes here", "Description": "Description goes here.", "address": "address info.", "phoneNumber": "phone number should go here.", "website": "site URL here.", "contactPerson": "Contact person\'s name here.", "active": true, "personas":['Teens']},
    {
      "category": "Education",
      "title": "Placeholder", "subTitle": "subTitle goes here","Description": "Description goes here.", "address": "address info.", "phoneNumber": "phone number should go here.", "website": "site URL here.", "contactPerson": "Contact person\'s name here.", "active": true, "personas":['Teens']},

	{"category" : "Education", "title": "Placeholder", "subTitle": "subTitle goes here", "Description": "Description goes here.", "address": "address info.", "phoneNumber": "phone number should go here.", "website": "site URL here.", "contactPerson": "Contact person\'s name here.", "active": true, "personas":['Teens']}
    ];

    _.each(services, function(service){
        Services.insert(service);

    });

}